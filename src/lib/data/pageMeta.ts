import { audienceSegments } from './audienceSegments';
import { servicePages } from './servicePages';
import { canonicalUrl } from './siteUrls';

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
    title: 'HostVerna | Managed IT for Accounting & Tax Firms',
    description:
      'Managed IT services for CPAs, accounting firms, tax preparers and professional businesses. IRS Security Six, WISP support, help desk and cloud administration.',
  },
  '/about': {
    title: 'About HostVerna | West Virginia IT Services',
    description:
      'Learn about HostVerna, a West Virginia-based managed IT firm serving accounting, tax, and other professional firms.',
  },
  '/contact': {
    title: 'Contact HostVerna | IT Consultation',
    description:
      'Schedule a consultation for managed IT, IRS Security Six implementation, WISP support, or tax-season readiness for your accounting or tax firm.',
  },
  '/quick-contact': {
    title: 'Quick contact | HostVerna',
    description: 'Reach HostVerna for managed IT support for your accounting or tax firm.',
  },
  '/faq': {
    title: 'FAQ | HostVerna',
    description:
      'Answers to common questions about HostVerna services, pricing, timelines, support, and how to get started.',
  },
  '/resources': {
    title: 'Security & Compliance Resources | HostVerna',
    description:
      'Official IRS and FTC resources for tax professionals covering the Security Six, Written Information Security Plans, and the Safeguards Rule.',
  },
  '/pricing': {
    title: 'Managed IT Package & Pricing | HostVerna',
    description:
      'See what is included in HostVerna managed IT support and contact us for a clear proposal built around your accounting or tax firm.',
  },
  '/qualification': {
    title: 'Accounting Firm IT Qualification | HostVerna',
    description:
      'Complete HostVerna’s CPA technology and security qualification checklist before a discovery meeting about IRS Security Six or managed IT services.',
  },
  '/support': {
    title: 'Support | HostVerna',
    description:
      'Get IT help for your accounting or tax firm. Call, email, or open a request through the client portal.',
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
    title: 'Privacy Policy | HostVerna',
    description:
      'Learn what information HostVerna collects through its website, how it is used, and the privacy choices available to visitors and clients.',
  },
  '/terms': {
    title: 'Terms of Service | HostVerna',
    description:
      'Review the terms governing use of the HostVerna website and baseline terms for interactions not covered by a separate signed agreement.',
  },
  '/cookies': {
    title: 'Cookie Policy | HostVerna',
    description:
      'Learn how HostVerna uses cookies, analytics, local browser storage, and security technologies on hostverna.com.',
  },
  '/sla': {
    title: 'Service Level Framework | HostVerna',
    description:
      'See how HostVerna receives, prioritizes, communicates, and escalates client support requests and service incidents.',
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

  const segment = audienceSegments.find((s) => `/${s.slug}` === p);
  if (segment) {
    return {
      title: segment.metaTitle,
      description: segment.lede,
      canonical: canonicalUrl(p),
    };
  }

  return { ...notFoundMeta, canonical: canonicalUrl(p) };
}
