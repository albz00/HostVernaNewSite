/**
 * Cloudflare Pages Function: POST /api/contact
 * Env (dashboard): resend_api_key, turnstile_secret_key
 * Optional: resend_from (verified sender, e.g. "HostVerna <noreply@yourdomain.com>"), contact_to (default info@hostverna.com)
 */

type Env = {
  resend_api_key: string;
  turnstile_secret_key: string;
  resend_from?: string;
  contact_to?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const MAX = {
  name: 200,
  email: 320,
  phone: 80,
  org: 200,
  role: 120,
  need: 200,
  timeline: 200,
  budget: 200,
  details: 8000,
} as const;

function trimStr(v: unknown, max: number): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function emailOk(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function buildFullEmailBody(fields: {
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  need: string;
  timeline: string;
  budget: string;
  advertiseOnSite: boolean;
  details: string;
}): string {
  const lines = [
    'HostVerna contact request',
    '***',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || '(not provided)'}`,
    `Organization: ${fields.organization}`,
    `Role: ${fields.role || '(not provided)'}`,
    `Need: ${fields.need}`,
    `Timeline: ${fields.timeline}`,
    `Budget: ${fields.budget}`,
    `Interested in a site listing or ad: ${fields.advertiseOnSite ? 'Yes' : 'No'}`,
    '***',
    'Details:',
    fields.details || '(none)',
  ];
  return lines.join('\n');
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  const missing: string[] = [];
  if (!env.resend_api_key) missing.push('resend_api_key');
  if (!env.turnstile_secret_key) missing.push('turnstile_secret_key');
  if (missing.length > 0) {
    return json(
      {
        ok: false,
        error: `Server not configured for contact delivery. Missing: ${missing.join(', ')}`,
      },
      503,
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Invalid JSON body.' }, 400);
  }

  const turnstileToken = trimStr(payload.turnstileToken, 4096);
  if (!turnstileToken) {
    return json({ ok: false, error: 'Missing verification.' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP');
  const turnstileOk = await verifyTurnstile(env.turnstile_secret_key, turnstileToken, ip);
  if (!turnstileOk) {
    return json({ ok: false, error: 'Verification failed. Refresh and try again.' }, 400);
  }

  const kind = trimStr(payload.kind, 20);
  const to = (env.contact_to?.trim() || 'info@hostverna.co').slice(0, 320);
  const from = (env.resend_from?.trim() || 'HostVerna <info@hostverna.co>').slice(0, 320);

  if (kind === 'quick') {
    const name = trimStr(payload.name, MAX.name);
    const email = trimStr(payload.email, MAX.email);
    const phone = trimStr(payload.phone, MAX.phone);
    if (!name || !email || !emailOk(email)) {
      return json({ ok: false, error: 'Name and a valid email are required.' }, 400);
    }
    const text = [
      'HostVerna quick contact',
      '***',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || '(not provided)'}`,
    ].join('\n');
    const subject = `Quick contact: ${name}`;
    return await sendResend(env.resend_api_key, { from, to, reply_to: email, subject, text });
  }

  if (kind === 'full') {
    const name = trimStr(payload.name, MAX.name);
    const email = trimStr(payload.email, MAX.email);
    const phone = trimStr(payload.phone, MAX.phone);
    const organization = trimStr(payload.organization, MAX.org);
    const role = trimStr(payload.role, MAX.role);
    const need = trimStr(payload.need, MAX.need);
    const timeline = trimStr(payload.timeline, MAX.timeline);
    const budget = trimStr(payload.budget, MAX.budget);
    const details = trimStr(payload.details, MAX.details);
    const advertiseOnSite = payload.advertiseOnSite === true;

    if (!name || !email || !emailOk(email) || !organization) {
      return json({ ok: false, error: 'Missing required fields.' }, 400);
    }

    const text = buildFullEmailBody({
      name,
      email,
      phone,
      organization,
      role,
      need,
      timeline,
      budget,
      advertiseOnSite,
      details,
    });
    const subject = `Contact request: ${organization || name}`;
    return await sendResend(env.resend_api_key, { from, to, reply_to: email, subject, text });
  }

  return json({ ok: false, error: 'Unknown request type.' }, 400);
}

async function sendResend(
  apiKey: string,
  args: { from: string; to: string; reply_to: string; subject: string; text: string },
): Promise<Response> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: args.from,
      to: [args.to],
      reply_to: args.reply_to,
      subject: args.subject.slice(0, 900),
      text: args.text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('Resend error', res.status, errText);
    return json({ ok: false, error: 'Could not send message. Try again later or call us.' }, 502);
  }

  return json({ ok: true });
}

/** Non-POST requests (POST is handled by `onRequestPost`). */
export async function onRequest(): Promise<Response> {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
