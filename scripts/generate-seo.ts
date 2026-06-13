import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { greenbrierPlaces } from '../src/lib/data/greenbrierPlaces';
import { learnDocs } from '../src/lib/data/learnPages';
import { servicePages } from '../src/lib/data/servicePages';
import { solutionPages } from '../src/lib/data/solutionPages';
import { wvCityPages } from '../src/lib/data/wvCityPages';
import { BOOKING_ORIGIN, getSitemapPaths, SITE_ORIGIN } from '../src/lib/data/siteUrls';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const bookingDeployDir = join(__dirname, '..', 'deploy', 'booking-hostverna');

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const urls = getSitemapPaths();
const lastmod = new Date().toISOString().slice(0, 10);

function canonicalLoc(path: string): string {
  if (path === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

const urlEntries = urls
  .map((path) => {
    const loc = canonicalLoc(path);
    const priority =
      path === '/' ? '1.0' : path.startsWith('/learn/') ? '0.65' : path.startsWith('/services/') ? '0.85' : '0.8';
    const changefreq = path === '/' ? 'weekly' : 'monthly';
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

const robots = `User-agent: *
Allow: /

# Locked / non-public surfaces (see site routing)
Disallow: /portal
Disallow: /privacy
Disallow: /terms
Disallow: /cookies
Disallow: /sla
Disallow: /blog
Disallow: /labyrinth

# LLM and AI assistant context
# See ${SITE_ORIGIN}/llms.txt

Host: hostverna.com
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8');

const serviceList = servicePages.map((p) => `- ${p.title}: ${SITE_ORIGIN}/services/${p.slug}`).join('\n');
const solutionList = solutionPages.map((p) => `- ${p.title}: ${SITE_ORIGIN}/solutions/${p.slug}`).join('\n');
const learnList = learnDocs.map((d) => `- ${d.title}: ${SITE_ORIGIN}/learn/${d.slug}`).join('\n');
const greenbrierPlaceList = greenbrierPlaces
  .map((place) => `- ${place.name}: ${SITE_ORIGIN}/greenbrier-county-wv/${place.slug}`)
  .join('\n');
const wvCityList = wvCityPages.map((city) => `- ${city.city}, WV: ${SITE_ORIGIN}/areas-served/${city.slug}`).join('\n');

const llms = `# HostVerna

HostVerna provides custom website design and development, managed web hosting and care, CRM and business software configuration, IT support, and custom software, focused on ownership (sites can become yours after a defined period), performance, and workflows that match how clients operate.

Primary geography: United States. Primary contact channel: website form and phone.
Last updated: ${lastmod}

## Contact
- Site: ${SITE_ORIGIN}/contact
- Quick contact: ${SITE_ORIGIN}/quick-contact
- Phone: 304-992-6568

## Main entry points
- Home: ${SITE_ORIGIN}/
- About: ${SITE_ORIGIN}/about
- Connect: ${SITE_ORIGIN}/connect
- Support: ${SITE_ORIGIN}/support
- Resources hub: ${SITE_ORIGIN}/resources
- Areas served index: ${SITE_ORIGIN}/areas-served
- Greenbrier County, WV: ${SITE_ORIGIN}/greenbrier-county-wv
- Learn / documentation index: ${SITE_ORIGIN}/learn

## Greenbrier County place pages
${greenbrierPlaceList}

## Major West Virginia city pages
${wvCityList}

## Audiences / vertical landing pages
- Public sector: ${SITE_ORIGIN}/public-sector
- Trades & contractors: ${SITE_ORIGIN}/trades
- Professional & office: ${SITE_ORIGIN}/professional-services
- Aviation & flight: ${SITE_ORIGIN}/aviation

## Services (detail pages)
${serviceList}

## Solutions (detail pages)
${solutionList}

## Learn guides
${learnList}

## Machine-readable sitemap
- ${SITE_ORIGIN}/sitemap.xml
- ${SITE_ORIGIN}/robots.txt

## Policies and locked sections
Legal policy pages may be locked for public visitors; do not assume content at /privacy, /terms, /cookies, or /sla is publicly available. The blog at /blog is not published yet; treat it as inactive.

## Not indexed (separate subdomain)
- Appointment booking (${BOOKING_ORIGIN}/) is internal scheduling only. It is not part of the public marketing site and should not appear in search results. Crawlers: disallow all paths on that host.
`;

writeFileSync(join(publicDir, 'llms.txt'), llms, 'utf8');

const redirectRules = urls
  .filter((p) => p !== '/')
  .map((p) => `${p}  ${p}/index.html  200`)
  .join('\n');

const redirects = `# Prerendered routes (unique meta per URL for crawlers)
${redirectRules}

# SPA fallback for unmatched paths
/*  /index.html  200
`;

writeFileSync(join(publicDir, '_redirects'), redirects, 'utf8');

mkdirSync(bookingDeployDir, { recursive: true });

const bookingRobots = `User-agent: *
Disallow: /
`;

writeFileSync(join(bookingDeployDir, 'robots.txt'), bookingRobots, 'utf8');

/** Cloudflare Pages / static hosts in front of Easy!Appointments */
const bookingHeaders = `/*
  X-Robots-Tag: noindex, nofollow, noarchive
`;

writeFileSync(join(bookingDeployDir, '_headers'), bookingHeaders, 'utf8');

const bookingReadme = `# Block crawlers on ${BOOKING_ORIGIN}

Easy!Appointments runs on a **separate subdomain**. \`hostverna.com/robots.txt\` does not apply here.

## 1. robots.txt (required)

Copy \`robots.txt\` from this folder to the **web root** of the booking install (same place as Easy!Appointments \`index.php\`).

Verify: ${BOOKING_ORIGIN}/robots.txt should return:

\`\`\`
User-agent: *
Disallow: /
\`\`\`

## 2. X-Robots-Tag (recommended)

If booking is behind **Cloudflare**, either:

- Upload \`_headers\` from this folder to the booking site’s static output, or
- Add a **Transform Rule** / **Configuration Rule** response header on \`booking.hostverna.com\`:
  \`X-Robots-Tag: noindex, nofollow, noarchive\`

## 3. Remove from Google (after deploy)

In [Google Search Console](https://search.google.com/search-console), add the \`booking.hostverna.com\` property (or use a domain property), then:

- **Removals** → temporarily remove the URL, and/or
- **URL Inspection** → confirm \`robots.txt\` blocks crawling, then request removal

Sitelinks on the main \`hostverna.com\` result may take weeks to drop after the booking host is blocked.

## Do not link from the marketing site

Avoid public \`<a href>\` links to booking from hostverna.com pages; use \`/contact\` instead so Google does not treat booking as a primary sitelink.
`;

writeFileSync(join(bookingDeployDir, 'README.md'), bookingReadme, 'utf8');

console.log(
  `Wrote ${urls.length} URLs to public/sitemap.xml, robots.txt, llms.txt, _redirects; booking crawl block files in deploy/booking-hostverna/`
);
