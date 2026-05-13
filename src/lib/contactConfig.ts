/** Cloudflare Turnstile site key (public). */
export const TURNSTILE_SITE_KEY = '0x4AAAAAADOrGqZd49yj0a0i';

export const CONTACT_API_URL = '/api/contact';

/** Client-side context for internal lead routing only (never shown in the submitter confirmation email). */
export type ContactClientMeta = {
  pageUrl?: string;
  referrer?: string;
  timeOnPageMs?: number;
  /** Time since the visitor started the guided form (e.g. left the intro step), when provided. */
  formFilledMs?: number;
  userLang?: string;
  utm?: Record<string, string>;
};

const META = { url: 2000, ref: 2000, lang: 40, utmVal: 200 } as const;

function clip(s: string, max: number): string {
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max);
}

/**
 * Snapshot referrer, landing URL, UTM tags, and coarse timing. Call in the browser at submit time.
 */
export function snapshotContactClientMeta(formStartedAtMs?: number): ContactClientMeta {
  if (typeof window === 'undefined') return {};

  const u = new URL(window.location.href);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
  const utm: Record<string, string> = {};
  for (const k of utmKeys) {
    const v = u.searchParams.get(k);
    if (v) utm[k] = clip(v, META.utmVal);
  }

  const timeOnPageMs = Number.isFinite(performance.now()) ? Math.max(0, Math.round(performance.now())) : undefined;
  let formFilledMs: number | undefined;
  if (typeof formStartedAtMs === 'number' && formStartedAtMs > 0 && Number.isFinite(formStartedAtMs)) {
    formFilledMs = Math.max(0, Math.round(Date.now() - formStartedAtMs));
  }

  return {
    pageUrl: clip(u.href, META.url) || undefined,
    referrer: clip(document.referrer || '', META.ref) || undefined,
    timeOnPageMs,
    formFilledMs,
    userLang: clip(navigator.language || '', META.lang) || undefined,
    ...(Object.keys(utm).length ? { utm } : {}),
  };
}

export type ContactResponse = { ok: true } | { ok: false; error: string };

export async function postContactJson(body: unknown): Promise<ContactResponse> {
  let res: Response;
  try {
    res = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: 'Network error. Check your connection and try again.' };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return { ok: false, error: 'Unexpected server response.' };
  }

  const obj = data as { ok?: boolean; error?: string };
  if (res.ok && obj.ok === true) return { ok: true };
  const err = typeof obj.error === 'string' && obj.error.trim() ? obj.error.trim() : 'Something went wrong.';
  return { ok: false, error: err };
}
