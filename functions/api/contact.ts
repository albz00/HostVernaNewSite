/**
 * Cloudflare Pages Function: POST /api/contact
 * Env (dashboard): resend_api_key, turnstile_secret_key
 * Optional: resend_from (verified sender, e.g. "HostVerna <noreply@yourdomain.com>"), contact_to (default alex@hostverna.com)
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
  metaUrl: 2000,
  metaLang: 40,
  metaUtmVal: 200,
} as const;

/** Max plausible session length for client-reported timings (7 days). */
const MAX_CLIENT_MS = 7 * 24 * 60 * 60 * 1000;

type CfRequestProps = {
  colo?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  timezone?: string;
  latitude?: number | string;
  longitude?: number | string;
};

function trimStr(v: unknown, max: number): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function clampIntMs(v: unknown): number | undefined {
  if (typeof v !== 'number' || !Number.isFinite(v)) return undefined;
  const n = Math.round(v);
  if (n < 0 || n > MAX_CLIENT_MS) return undefined;
  return n;
}

function formatDurationMs(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  const remS = s % 60;
  if (m < 60) return remS ? `${m} min ${remS} s` : `${m} min`;
  const h = Math.floor(m / 60);
  const remM = m % 60;
  return remM ? `${h} h ${remM} min` : `${h} h`;
}

function cfFromRequest(request: Request): CfRequestProps | undefined {
  const raw = (request as Request & { cf?: CfRequestProps }).cf;
  return raw && typeof raw === 'object' ? raw : undefined;
}

function buildEdgeLocationLine(cf: CfRequestProps | undefined): string {
  if (!cf) return '(edge geo unavailable — not on Cloudflare edge or headers stripped)';
  const locality = [cf.city, cf.region, cf.country].filter((x) => typeof x === 'string' && x.trim()).join(', ');
  const tz = typeof cf.timezone === 'string' && cf.timezone.trim() ? cf.timezone.trim() : '';
  const lat = cf.latitude;
  const lon = cf.longitude;
  let coords = '';
  if (lat !== undefined && lat !== '' && lon !== undefined && lon !== '') {
    coords = ` (~${String(lat)}, ${String(lon)})`;
  }
  const base = locality || '(no city/region in edge data)';
  return `${base}${tz ? ` · TZ ${tz}` : ''}${coords}`;
}

function parseClientMeta(payload: Record<string, unknown>): {
  pageUrl: string;
  referrer: string;
  timeOnPageMs?: number;
  formFilledMs?: number;
  userLang: string;
  utmLine: string;
} {
  const raw = payload.clientMeta;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { pageUrl: '', referrer: '', utmLine: '', userLang: '' };
  }
  const o = raw as Record<string, unknown>;
  const pageUrl = trimStr(o.pageUrl, MAX.metaUrl);
  const referrer = trimStr(o.referrer, MAX.metaUrl);
  const userLang = trimStr(o.userLang, MAX.metaLang);
  const timeOnPageMs = clampIntMs(o.timeOnPageMs);
  const formFilledMs = clampIntMs(o.formFilledMs);
  let utmLine = '';
  const utm = o.utm;
  if (utm && typeof utm === 'object' && !Array.isArray(utm)) {
    const pairs: string[] = [];
    for (const [k, val] of Object.entries(utm)) {
      if (!/^utm_[a-z]+$/.test(k)) continue;
      const s = trimStr(val, MAX.metaUtmVal);
      if (s) pairs.push(`${k}=${s}`);
    }
    if (pairs.length) utmLine = pairs.join(' · ');
  }
  return { pageUrl, referrer, timeOnPageMs, formFilledMs, userLang, utmLine };
}

function buildPrivateLeadBlock(args: {
  ip: string;
  userAgent: string;
  cf: CfRequestProps | undefined;
  client: ReturnType<typeof parseClientMeta>;
}): string {
  const lines: string[] = [
    '---',
    'Internal context (not sent to submitter)',
    `IP: ${args.ip || '(unknown)'}`,
    `Approximate location (edge/IP intelligence): ${buildEdgeLocationLine(args.cf)}`,
  ];
  if (args.cf?.country && typeof args.cf.country === 'string') {
    lines.push(`Country code: ${args.cf.country.trim()}`);
  }
  if (args.cf?.postalCode && typeof args.cf.postalCode === 'string') {
    lines.push(`Postal (edge): ${args.cf.postalCode.trim().slice(0, 24)}`);
  }
  if (args.cf?.colo) {
    lines.push(`CF colo: ${String(args.cf.colo)}`);
  }
  lines.push(`User-Agent: ${args.userAgent || '(none)'}`);
  if (args.client.referrer) {
    lines.push(`Referrer / prior URL: ${args.client.referrer}`);
  } else {
    lines.push('Referrer / prior URL: (empty — direct, HTTPS, or privacy settings)');
  }
  if (args.client.pageUrl) {
    lines.push(`Submitted from (full link): ${args.client.pageUrl}`);
  }
  if (args.client.utmLine) {
    lines.push(`UTM / campaign tags: ${args.client.utmLine}`);
  }
  if (args.client.userLang) {
    lines.push(`Browser language: ${args.client.userLang}`);
  }
  if (args.client.timeOnPageMs !== undefined) {
    lines.push(`Time since this page load (tab): ${formatDurationMs(args.client.timeOnPageMs)}`);
  }
  if (args.client.formFilledMs !== undefined) {
    lines.push(`Time in guided form (client): ${formatDurationMs(args.client.formFilledMs)}`);
  }
  return lines.join('\n');
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

function firstNameFrom(fullName: string): string {
  const cleaned = fullName.trim().split(/\s+/)[0] || '';
  return cleaned.replace(/[^\p{L}\p{M}'\-]/gu, '');
}

const CONFIRM_FOOTER_EMAIL = 'info@hostverna.com';

type ConfirmationSummary =
  | { kind: 'quick'; name: string; email: string; phone: string }
  | {
      kind: 'full';
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
    };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '<br />');
}

const DETAILS_PREVIEW_MAX = 2500;

function truncatePreview(s: string, max: number): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
}

function dashOr(v: string, empty: string): string {
  const t = v.trim();
  return t || empty;
}

function buildConfirmationReviewLines(summary: ConfirmationSummary): string[] {
  if (summary.kind === 'quick') {
    return [
      'Your message (for your records)',
      '────────────────────────────',
      `Name: ${summary.name}`,
      `Email: ${summary.email}`,
      `Phone: ${dashOr(summary.phone, '(not provided)')}`,
    ];
  }
  const d = truncatePreview(summary.details, DETAILS_PREVIEW_MAX);
  const truncated = summary.details.length > DETAILS_PREVIEW_MAX;
  const lines = [
    'Your message (for your records)',
    '────────────────────────────',
    `Name: ${summary.name}`,
    `Email: ${summary.email}`,
    `Phone: ${dashOr(summary.phone, '(not provided)')}`,
    `Organization: ${summary.organization}`,
    `Role: ${dashOr(summary.role, '(not provided)')}`,
    `Need: ${dashOr(summary.need, '(not provided)')}`,
    `Timeline: ${dashOr(summary.timeline, '(not provided)')}`,
    `Budget: ${dashOr(summary.budget, '(not provided)')}`,
    `Interested in a site listing or ad: ${summary.advertiseOnSite ? 'Yes' : 'No'}`,
    '',
    'Details:',
    d || '(none)',
  ];
  if (truncated) {
    lines.push('', '(Details above are shortened in this email; your full message was delivered to our team.)');
  }
  return lines;
}

function buildConfirmationReviewRowsHtml(summary: ConfirmationSummary): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top;width:140px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${value}</td>
    </tr>`;

  if (summary.kind === 'quick') {
    return [
      row('Name', escapeHtml(summary.name)),
      row('Email', escapeHtml(summary.email)),
      row('Phone', escapeHtml(dashOr(summary.phone, '(not provided)'))),
    ].join('');
  }
  const d = truncatePreview(summary.details, DETAILS_PREVIEW_MAX);
  const truncated = summary.details.length > DETAILS_PREVIEW_MAX;
  const detailsBlock = d
    ? `${nl2br(d)}${truncated ? `<p style="margin:12px 0 0;font-size:12px;color:#64748b;line-height:1.5;">Details above are shortened in this email; your full message was delivered to our team.</p>` : ''}`
    : '<span style="color:#94a3b8;">(none)</span>';
  return [
    row('Name', escapeHtml(summary.name)),
    row('Email', escapeHtml(summary.email)),
    row('Phone', escapeHtml(dashOr(summary.phone, '(not provided)'))),
    row('Organization', escapeHtml(summary.organization)),
    row('Role', escapeHtml(dashOr(summary.role, '(not provided)'))),
    row('Need', escapeHtml(dashOr(summary.need, '(not provided)'))),
    row('Timeline', escapeHtml(dashOr(summary.timeline, '(not provided)'))),
    row('Budget', escapeHtml(dashOr(summary.budget, '(not provided)'))),
    row('Site listing / ad', summary.advertiseOnSite ? 'Yes' : 'No'),
    `<tr><td colspan="2" style="padding:16px 0 8px;color:#64748b;font-size:13px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Details</td></tr>
     <tr><td colspan="2" style="padding:14px 16px;color:#0f172a;font-size:14px;line-height:1.55;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">${detailsBlock}</td></tr>`,
  ].join('');
}

function buildConfirmationBody(name: string, summary: ConfirmationSummary): string {
  const first = firstNameFrom(name);
  const greeting = first ? `Hi ${first},` : 'Hi there,';
  const review = buildConfirmationReviewLines(summary);
  return [
    greeting,
    '',
    'Thanks for reaching out to HostVerna. We have your message and a real person will reply, usually within one business day (often faster).',
    '',
    ...review,
    '',
    'If anything is urgent, feel free to call us at 304-992-6568.',
    '',
    '— The HostVerna team',
    CONFIRM_FOOTER_EMAIL,
  ].join('\n');
}

function buildConfirmationHtml(name: string, summary: ConfirmationSummary): string {
  const first = firstNameFrom(name);
  const greeting = first ? `Hi ${escapeHtml(first)},` : 'Hi there,';
  const rows = buildConfirmationReviewRowsHtml(summary);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Thanks — HostVerna</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#0369a1 0%,#0d9488 100%);padding:24px 28px;">
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">HostVerna</div>
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.88);margin-top:6px;">We received your message</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#0f172a;">${greeting}</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;">Thanks for reaching out. We have your message and a real person will reply, usually within <strong style="color:#0f172a;font-weight:600;">one business day</strong> (often faster).</p>
              <div style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#0369a1;">Your message</div>
              <p style="margin:0 0 16px;font-size:13px;line-height:1.5;color:#64748b;">A copy of what you sent us, for your records.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:8px;">${rows}</table>
              <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#475569;">If anything is urgent, call us at <a href="tel:+13049926568" style="color:#0369a1;text-decoration:none;font-weight:600;">304-992-6568</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid #f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0;font-size:14px;color:#0f172a;font-weight:500;">The HostVerna team</p>
              <p style="margin:8px 0 0;font-size:14px;"><a href="mailto:${escapeHtml(CONFIRM_FOOTER_EMAIL)}" style="color:#0d9488;text-decoration:none;">${escapeHtml(CONFIRM_FOOTER_EMAIL)}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  if (!env.resend_api_key || !env.turnstile_secret_key) {
    return json({ ok: false, error: 'Server not configured for contact delivery.' }, 503);
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

  const userAgent = trimStr(request.headers.get('User-Agent'), 500);
  const cf = cfFromRequest(request);
  const clientMeta = parseClientMeta(payload);
  const privateBlock = buildPrivateLeadBlock({
    ip: ip || '',
    userAgent,
    cf,
    client: clientMeta,
  });

  const kind = trimStr(payload.kind, 20);
  const to = (env.contact_to?.trim() || 'alex@hostverna.com').slice(0, 320);
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
      '',
      privateBlock,
    ].join('\n');
    const subject = `Quick contact: ${name}`;
    const notify = await sendResendEmail(env.resend_api_key, {
      from,
      to,
      reply_to: email,
      subject,
      text,
    });
    if (!notify.ok) {
      console.error('Resend error', notify.status, notify.errText);
      return json({ ok: false, error: 'Could not send message. Try again later or call us.' }, 502);
    }
    await sendConfirmation(env.resend_api_key, {
      from,
      replyTo: to,
      submitterEmail: email,
      submitterName: name,
      summary: { kind: 'quick', name, email, phone },
    });
    return json({ ok: true });
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

    const text = `${buildFullEmailBody({
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
    })}\n\n${privateBlock}`;
    const subject = `Contact request: ${organization || name}`;
    const notify = await sendResendEmail(env.resend_api_key, {
      from,
      to,
      reply_to: email,
      subject,
      text,
    });
    if (!notify.ok) {
      console.error('Resend error', notify.status, notify.errText);
      return json({ ok: false, error: 'Could not send message. Try again later or call us.' }, 502);
    }
    await sendConfirmation(env.resend_api_key, {
      from,
      replyTo: to,
      submitterEmail: email,
      submitterName: name,
      summary: {
        kind: 'full',
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
      },
    });
    return json({ ok: true });
  }

  return json({ ok: false, error: 'Unknown request type.' }, 400);
}

type SendResult = { ok: true } | { ok: false; status: number; errText: string };

async function sendResendEmail(
  apiKey: string,
  args: { from: string; to: string; reply_to: string; subject: string; text: string; html?: string },
): Promise<SendResult> {
  const body: Record<string, unknown> = {
    from: args.from,
    to: [args.to],
    reply_to: args.reply_to,
    subject: args.subject.slice(0, 900),
    text: args.text,
  };
  if (args.html) body.html = args.html;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    return { ok: false, status: res.status, errText };
  }
  return { ok: true };
}

/** Best-effort confirmation email back to the submitter. Failures are logged, not surfaced. */
async function sendConfirmation(
  apiKey: string,
  args: {
    from: string;
    replyTo: string;
    submitterEmail: string;
    submitterName: string;
    summary: ConfirmationSummary;
  },
): Promise<void> {
  const result = await sendResendEmail(apiKey, {
    from: args.from,
    to: args.submitterEmail,
    reply_to: args.replyTo,
    subject: 'Thanks for reaching out — HostVerna',
    text: buildConfirmationBody(args.submitterName, args.summary),
    html: buildConfirmationHtml(args.submitterName, args.summary),
  });
  if (!result.ok) {
    console.error('Confirmation email failed', result.status, result.errText);
  }
}

/** Non-POST requests (POST is handled by `onRequestPost`). */
export async function onRequest(): Promise<Response> {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
