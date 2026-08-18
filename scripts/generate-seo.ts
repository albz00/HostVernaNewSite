import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { servicePages } from '../src/lib/data/servicePages';
import { audienceSegments } from '../src/lib/data/audienceSegments';
import { BOOKING_ORIGIN, getSitemapPaths, SITE_ORIGIN } from '../src/lib/data/siteUrls';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const bookingDeployDir = join(__dirname, '..', 'deploy', 'booking-hostverna');

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const urls = getSitemapPaths();
const lastmod = new Date().toISOString().slice(0, 10);
const mdLink = (label: string, url: string): string => `[${label}](${url})`;

function canonicalLoc(path: string): string {
  if (path === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

const urlEntries = urls
  .map((path) => {
    const loc = canonicalLoc(path);
    const priority =
      path === '/' ? '1.0' : path.startsWith('/services/') ? '0.85' : '0.8';
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
Disallow: /blog
Disallow: /pacman

# LLM and AI assistant context
# See ${SITE_ORIGIN}/llms.txt

Host: hostverna.com
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8');

const serviceList = servicePages.map((p) => `- ${mdLink(p.title, `${SITE_ORIGIN}/services/${p.slug}`)}`).join('\n');
const audienceList = audienceSegments
  .map((segment) => `- ${mdLink(segment.navTitle, `${SITE_ORIGIN}/${segment.slug}`)}`)
  .join('\n');
const mainPageList = [
  ['Home', '/'],
  ['About', '/about'],
  ['Pricing', '/pricing'],
  ['Firm qualification', '/qualification'],
  ['Security and compliance resources', '/resources'],
  ['Frequently asked questions', '/faq'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
  ['Quick contact', '/quick-contact'],
  ['Client support', '/support'],
]
  .map(([label, path]) => `- ${mdLink(label, `${SITE_ORIGIN}${path}`)}`)
  .join('\n');

const llms = `# HostVerna

HostVerna provides managed IT support for CPAs, accounting firms, tax preparers, enrolled agents, bookkeeping firms, and payroll providers. Core services are managed IT, IRS Security Six implementation, WISP creation and updates, and tax-season IT readiness.

Primary geography: West Virginia and beyond. Primary contact channels: consultation form and phone.
Last updated: ${lastmod}

## Public pages
${mainPageList}

Phone: 304-992-6568

## Who HostVerna serves
${audienceList}

## Services (detail pages)
${serviceList}

## Machine-readable sitemap
- ${mdLink('sitemap.xml', `${SITE_ORIGIN}/sitemap.xml`)}
- ${mdLink('robots.txt', `${SITE_ORIGIN}/robots.txt`)}

## Policies
- ${mdLink('Privacy Policy', `${SITE_ORIGIN}/privacy`)}
- ${mdLink('Terms of Service', `${SITE_ORIGIN}/terms`)}
- ${mdLink('Cookie Policy', `${SITE_ORIGIN}/cookies`)}
- ${mdLink('Service Level Framework', `${SITE_ORIGIN}/sla`)}

The blog at /blog is not published yet; treat it as inactive.

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

# Retired website-development and local web-design pages
/connect  /contact  301
/services/web-design  /services/it-solutions  301
/services/managed-web-services  /services/it-solutions  301
/services/business-software-crm  /services/it-solutions  301
/services/custom-software-solutions  /services/it-solutions  301
/services/web-hosting  /services/it-solutions  301
/services/software-solutions  /services/it-solutions  301
/solutions/*  /services/it-solutions  301
/learn  /resources  301
/learn/*  /resources  301
/areas-served  /accounting-tax-firms  301
/areas-served/*  /accounting-tax-firms  301
/greenbrier-county-wv  /accounting-tax-firms  301
/greenbrier-county-wv/*  /accounting-tax-firms  301

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
