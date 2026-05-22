import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPageMeta } from '../src/lib/data/pageMeta';
import { getSitemapPaths } from '../src/lib/data/siteUrls';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const templatePath = join(distDir, 'index.html');

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function injectMeta(html: string, path: string): string {
  const { title, description, canonical } = getPageMeta(path);
  const t = escapeAttr(title);
  const d = escapeAttr(description);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${d}" />`
  );
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
  out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
  out = out.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${t}" />`);
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${d}" />`
  );
  out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${t}" />`);
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${d}" />`
  );
  return out;
}

const template = readFileSync(templatePath, 'utf8');
const paths = getSitemapPaths();

for (const path of paths) {
  const html = injectMeta(template, path);
  if (path === '/') {
    writeFileSync(templatePath, html, 'utf8');
  } else {
    const dir = join(distDir, path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf8');
  }
}

console.log(`Prerendered ${paths.length} routes with unique meta in dist/`);
