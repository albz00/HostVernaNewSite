/** Cloudflare Turnstile site key (public). */
export const TURNSTILE_SITE_KEY = '0x4AAAAAADOrGqZd49yj0a0i';

export const CONTACT_API_URL = '/api/contact';

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
