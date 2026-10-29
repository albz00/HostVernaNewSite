/**
 * Seasonal site palette.
 *
 * Revert to the blue/teal brand:
 * 1. Set SEASON to null.
 * 2. Remove data-season="halloween" from the <html> tag in index.html
 *    and set the theme-color meta back to #0369a1.
 *
 * CSS lives in src/halloween.css and only applies while data-season="halloween".
 * The hero's falling leaves use the same flag and disappear with it.
 */
export const SEASON = 'halloween' as 'halloween' | null;

export function applySeason(): void {
  if (typeof document === 'undefined') return;
  if (SEASON) {
    document.documentElement.setAttribute('data-season', SEASON);
  } else {
    document.documentElement.removeAttribute('data-season');
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta instanceof HTMLMetaElement) {
    meta.content = SEASON === 'halloween' ? '#c2410c' : '#0369a1';
  }
}
