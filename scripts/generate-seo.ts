import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { learnDocs } from '../src/lib/data/learnPages';
import { servicePages } from '../src/lib/data/servicePages';
import { solutionPages } from '../src/lib/data/solutionPages';
import { getSitemapPaths, SITE_ORIGIN } from '../src/lib/data/siteUrls';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

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

# LLM and AI assistant context
# See ${SITE_ORIGIN}/llms.txt

Host: hostverna.com
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8');

const serviceList = servicePages.map((p) => `- ${p.title}: ${SITE_ORIGIN}/services/${p.slug}`).join('\n');
const solutionList = solutionPages.map((p) => `- ${p.title}: ${SITE_ORIGIN}/solutions/${p.slug}`).join('\n');
const learnList = learnDocs.map((d) => `- ${d.title}: ${SITE_ORIGIN}/learn/${d.slug}`).join('\n');

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
- Greenbrier County, WV (local resource): ${SITE_ORIGIN}/greenbrier-county-wv
- Learn / documentation index: ${SITE_ORIGIN}/learn

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
`;

writeFileSync(join(publicDir, 'llms.txt'), llms, 'utf8');

console.log(`Wrote ${urls.length} URLs to public/sitemap.xml, robots.txt, llms.txt`);
