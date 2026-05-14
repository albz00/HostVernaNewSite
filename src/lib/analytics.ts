/** Sends a GA4 page_view tied to the in-app route (pathname). */
export function trackGaPageView(pathname: string): void {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;

  const loc = window.location;
  const page_path = pathname && pathname !== '' ? pathname : '/';
  const page_location = new URL(page_path + loc.search + loc.hash, loc.origin).href;

  gtag('event', 'page_view', {
    page_path,
    page_location,
    page_title: document.title,
  });
}
