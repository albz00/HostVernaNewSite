import { audienceSegments } from './audienceSegments';
import { greenbrierPlaces } from './greenbrierPlaces';
import { learnDocs } from './learnPages';
import { servicePages } from './servicePages';
import { solutionPages } from './solutionPages';
import { wvCityPages } from './wvCityPages';

/** Canonical origin for SEO files and meta (no trailing slash). */
export const SITE_ORIGIN = 'https://hostverna.com';

/** Client workspace login on client.hostverna.com */
export const CLIENT_PORTAL_LOGIN_URL = 'https://client.hostverna.com/app/login';

/** Google Business profile: leave a review */
export const GOOGLE_REVIEWS_URL = 'https://g.page/r/CU8uH4eJcYkzEAI/review';

/** Facebook page: reviews */
export const FACEBOOK_REVIEWS_URL = 'https://www.facebook.com/hostverna/reviews';

/** Cloudflare page views: shared analytics link */
export const CLOUDFLARE_PAGE_VIEWS_URL = 'https://share.google/lmAC6lH1PqvElrUJo';

/**
 * Easy!Appointments scheduling (separate subdomain; not part of the marketing site index).
 * Deploy `deploy/booking-hostverna/robots.txt` to this host; see that folder's README.
 */
export const BOOKING_ORIGIN = 'https://booking.hostverna.com';

/**
 * Indexable paths for sitemap.xml. Excludes locked placeholders (/portal, legal stubs, etc.).
 * Keep in sync with `App.svelte` routing.
 */
export function getSitemapPaths(): string[] {
  const staticPaths: string[] = [
    '/',
    '/about',
    '/careers',
    '/connect',
    '/contact',
    '/quick-contact',
    '/resources',
    '/faq',
    '/areas-served',
    '/greenbrier-county-wv',
    '/support',
    '/public-sector',
    '/learn',
    ...audienceSegments.map((s) => `/${s.slug}`),
  ];

  const servicePaths = servicePages.map((p) => `/services/${p.slug}`);
  const solutionPaths = solutionPages.map((p) => `/solutions/${p.slug}`);
  const learnPaths = learnDocs.map((d) => `/learn/${d.slug}`);
  const greenbrierPlacePaths = greenbrierPlaces.map((place) => `/greenbrier-county-wv/${place.slug}`);
  const wvCityPaths = wvCityPages.map((city) => `/areas-served/${city.slug}`);

  const combined = [...staticPaths, ...servicePaths, ...solutionPaths, ...learnPaths, ...greenbrierPlacePaths, ...wvCityPaths];
  return [...new Set(combined)].sort((a, b) => a.localeCompare(b));
}

export function canonicalUrl(pathname: string): string {
  const p = pathname === '/' ? '' : pathname;
  return `${SITE_ORIGIN}${p}`;
}
