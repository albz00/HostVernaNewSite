/** Mockup / preview: persisted light to dark preference */
export const THEME_STORAGE_KEY = 'hv_theme_mock';

export type ThemeMode = 'light' | 'dark';

export function getTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function setTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

/** Call once at startup (also run inline in index.html to reduce flash). */
export function initTheme(): void {
  if (typeof document === 'undefined') return;
  let mode: ThemeMode = 'light';
  try {
    const s = localStorage.getItem(THEME_STORAGE_KEY);
    if (s === 'dark' || s === 'light') mode = s;
  } catch {
    /* ignore */
  }
  setTheme(mode);
}

export function toggleTheme(): void {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}
