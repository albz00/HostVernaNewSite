import { audienceSegments } from './audienceSegments';
import { learnDocs } from './learnPages';
import { servicePages } from './servicePages';
import { solutionPages } from './solutionPages';

/** Canonical origin for SEO files and meta (no trailing slash). */
export const SITE_ORIGIN = 'https://hostverna.com';

/** Client workspace login on client.hostverna.com */
export const CLIENT_PORTAL_LOGIN_URL = 'https://client.hostverna.com/app/login';

/**
 * Indexable paths for sitemap.xml. Excludes locked placeholders (/portal, legal stubs, etc.).
 * Keep in sync with `App.svelte` routing.
 */
export function getSitemapPaths(): string[] {
  const staticPaths: string[] = [
    '/',
    '/about',
    '/connect',
    '/contact',
    '/quick-contact',
    '/resources',
    '/support',
    '/public-sector',
    '/learn',
    '/events/free-website-july',
    ...audienceSegments.map((s) => `/${s.slug}`),
  ];

  const servicePaths = servicePages.map((p) => `/services/${p.slug}`);
  const solutionPaths = solutionPages.map((p) => `/solutions/${p.slug}`);
  const learnPaths = learnDocs.map((d) => `/learn/${d.slug}`);

  const combined = [...staticPaths, ...servicePaths, ...solutionPaths, ...learnPaths];
  return [...new Set(combined)].sort((a, b) => a.localeCompare(b));
}

export function canonicalUrl(pathname: string): string {
  const p = pathname === '/' ? '' : pathname;
  return `${SITE_ORIGIN}${p}`;
}
