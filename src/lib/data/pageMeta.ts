import { audienceSegments } from './audienceSegments';
import { getGreenbrierPlace } from './greenbrierPlaces';
import { learnDocs } from './learnPages';
import { servicePages } from './servicePages';
import { solutionPages } from './solutionPages';
import { canonicalUrl } from './siteUrls';
import { getWvCityPage } from './wvCityPages';

export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  /** When set, emitted as meta robots (e.g. locked or non-indexable pages). */
  robots?: string;
};

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const p = path.endsWith('/') ? path.slice(0, -1) : path;
  return p || '/';
}

const staticMeta: Record<string, Omit<PageMeta, 'canonical'>> = {
  '/': {
    title: 'HostVerna | Custom websites, software & IT that fit your business',
    description:
      'Custom websites, web hosting, web development, CRM setup, IT support, and software built around your business, with clear ownership when the project wraps. Built for owners searching for a dependable web designer near me in Southern WV and beyond.',
  },
  '/about': {
    title: 'About HostVerna | Website and IT partner in WV',
    description:
      'Learn about HostVerna: our story, how we partner with clients on custom websites, web hosting, and long-term technology support in West Virginia.',
  },
  '/contact': {
    title: 'Contact HostVerna | Web design and hosting consultation',
    description:
      'Contact HostVerna to discuss custom websites, software development, hosting, or IT support. Call, email, or use our guided form.',
  },
  '/quick-contact': {
    title: 'Quick contact | HostVerna',
    description: 'Reach HostVerna in a few fields for a fast response about websites, hosting, software, or IT support.',
  },
  '/connect': {
    title: 'Connect | HostVerna',
    description:
      'Found us through a client site or another web team? Contact us to connect, collaborate, or ask questions.',
  },
  '/areas-served': {
    title: 'Areas served | HostVerna',
    description:
      'Areas served index from HostVerna with nationwide U.S. coverage details plus featured city and regional pages for web development, web hosting, software, and IT support.',
  },
  '/greenbrier-county-wv': {
    title: 'Greenbrier County, WV | Areas served | HostVerna',
    description:
      'Local web development, web hosting, software, and IT support coverage details for Greenbrier County, West Virginia.',
  },
  '/resources': {
    title: 'Resources | HostVerna',
    description:
      'Blog, documentation, and guides from HostVerna: domains, web hosting, web development, performance, and how we work with clients.',
  },
  '/faq': {
    title: 'FAQ | HostVerna',
    description:
      'Answers to common questions about HostVerna services, pricing, timelines, support, and how to get started.',
  },
  '/learn': {
    title: 'Learn | HostVerna',
    description:
      'Documentation: domain transfers, images and CDN on Cloudflare, and how solutions stay tailored to you.',
  },
  '/support': {
    title: 'Support | HostVerna',
    description:
      'Get help with hosting, your site, or software we built for you. Call, email, or open a request through the portal when you have access.',
  },
  '/public-sector': {
    title: 'Public sector | HostVerna',
    description:
      'Websites, software, and integrations for agencies and public entities buying through formal procurement and vendor marketplaces.',
  },
  '/careers': {
    title: 'Careers | HostVerna',
    description:
      'Careers at HostVerna. There are currently no open positions, but you can still send your information for future opportunities.',
  },
  '/portal': {
    title: 'Client portal | HostVerna',
    description: 'Sign in to the HostVerna client portal for projects, files, and updates.',
    robots: 'noindex, follow',
  },
  '/blog': {
    title: 'Blog (locked) | HostVerna',
    description: 'The HostVerna blog is not available for public access right now.',
    robots: 'noindex, follow',
  },
  '/privacy': {
    title: 'Privacy Policy (locked) | HostVerna',
    description: 'The HostVerna privacy policy is not available for public access right now.',
    robots: 'noindex, follow',
  },
  '/terms': {
    title: 'Terms of Service (locked) | HostVerna',
    description: 'The HostVerna terms of service are not available for public access right now.',
    robots: 'noindex, follow',
  },
  '/cookies': {
    title: 'Cookie Policy (locked) | HostVerna',
    description: 'The HostVerna cookie policy is not available for public access right now.',
    robots: 'noindex, follow',
  },
  '/sla': {
    title: 'SLA (locked) | HostVerna',
    description: 'The HostVerna service level agreement is not available for public access right now.',
    robots: 'noindex, follow',
  },
  '/pacman': {
    title: 'First-person Pac-Man | HostVerna',
    description:
      'A first-person Pac-Man experience hidden inside hostverna.com. Eat all pellets, avoid ghosts, and use power pellets for temporary defense.',
    robots: 'noindex, follow',
  },
};

const notFoundMeta: Omit<PageMeta, 'canonical'> = {
  title: 'Not found | HostVerna',
  description: 'The page you requested is not available on HostVerna.',
};

/** SEO title and description for a route (used in App.svelte and prerendered HTML). */
export function getPageMeta(path: string): PageMeta {
  const p = normalizePath(path);

  const staticEntry = staticMeta[p];
  if (staticEntry) {
    return { ...staticEntry, canonical: canonicalUrl(p) };
  }

  const service = servicePages.find((s) => `/services/${s.slug}` === p);
  if (service) {
    return {
      title: service.metaTitle,
      description: service.lede,
      canonical: canonicalUrl(p),
    };
  }

  const solution = solutionPages.find((s) => `/solutions/${s.slug}` === p);
  if (solution) {
    return {
      title: solution.metaTitle,
      description: solution.lede,
      canonical: canonicalUrl(p),
    };
  }

  const doc = learnDocs.find((d) => `/learn/${d.slug}` === p);
  if (doc) {
    return {
      title: doc.metaTitle,
      description: doc.lede,
      canonical: canonicalUrl(p),
    };
  }

  const segment = audienceSegments.find((s) => `/${s.slug}` === p);
  if (segment) {
    return {
      title: segment.metaTitle,
      description: segment.lede,
      canonical: canonicalUrl(p),
    };
  }

  if (p.startsWith('/greenbrier-county-wv/')) {
    const placeSlug = p.slice('/greenbrier-county-wv/'.length);
    const place = getGreenbrierPlace(placeSlug);
    if (place) {
      return {
        title: place.metaTitle,
        description: place.metaDescription,
        canonical: canonicalUrl(p),
      };
    }
  }

  if (p.startsWith('/areas-served/')) {
    const citySlug = p.slice('/areas-served/'.length);
    const cityPage = getWvCityPage(citySlug);
    if (cityPage) {
      return {
        title: cityPage.metaTitle,
        description: cityPage.metaDescription,
        canonical: canonicalUrl(p),
      };
    }
  }

  return { ...notFoundMeta, canonical: canonicalUrl(p) };
}
