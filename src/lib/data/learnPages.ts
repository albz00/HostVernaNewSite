export type LearnSection = {
  heading: string;
  body: string[];
  /** Empty image/diagram frames after this section (for your screenshots). */
  mediaSlots?: number;
  /** Optional per-slot labels (same length as mediaSlots, or shorter; defaults used). */
  mediaLabels?: string[];
};

export type LearnDocData = {
  slug: string;
  navTitle: string;
  title: string;
  metaTitle: string;
  lede: string;
  sections: LearnSection[];
};

export const learnDocs: LearnDocData[] = [
  {
    slug: 'domain-transfers',
    navTitle: 'Domain transfers',
    title: 'How we transfer domains',
    metaTitle: 'Domain transfers | HostVerna Learn',
    lede:
      'Domain transfers should be predictable and low risk. Here is how we coordinate transfers, what we need from you, and where delays usually occur.',
    sections: [
      {
        heading: 'Before anything moves',
        body: [
          'We confirm ownership, current registrar details, and any email or DNS dependencies before changes begin.',
        ],
      },
      {
        heading: 'Auth codes and unlock',
        body: [
          'Most transfers require domain unlock and an authorization code from the current registrar. We provide clear steps and collect required data through a secure channel.',
          'Timing matters: some registrars add a waiting period after you request a code.',
        ],
      },
      {
        heading: 'After transfer starts',
        body: [
          'DNS can remain stable during many transfers with proper planning. We coordinate cutovers to avoid unexpected site or email downtime.',
        ],
      },
    ],
  },
  {
    slug: 'images-and-cdn',
    navTitle: 'Images & CDN',
    title: 'How images are hosted and load fast',
    metaTitle: 'Images & CDN | HostVerna Learn',
    lede:
      'Large, unoptimized images are a common performance issue. We use Cloudflare image delivery so visitors receive appropriately sized files from nearby edge locations.',
    sections: [
      {
        heading: 'Why a CDN helps',
        body: [
          'A content delivery network caches copies of assets across multiple regions. This reduces latency and improves performance for repeat and geographically distributed traffic.',
        ],
      },
      {
        heading: 'Cloudflare Images in our stack',
        body: [
          'With Cloudflare Images, we serve variants by layout and device density so smaller screens do not download oversized originals.',
          'Setup depends on your plan and implementation. We document enabled options in your project handoff.',
        ],
      },
    ],
  },
  {
    slug: 'custom-solutions',
    navTitle: 'Custom solutions',
    title: 'How our solutions stay tailored to you',
    metaTitle: 'Custom solutions | HostVerna Learn',
    lede:
      'Our delivery is tailored to each client. Discovery, constraints, and operational workflows drive what we design, build, and host.',
    sections: [
      {
        heading: 'Discovery first',
        body: [
          'We start from outcomes: who uses the system, what cannot fail, and what delivery looks like in practical terms. Templates may inform layout but do not replace requirements.',
        ],
      },
      {
        heading: 'Build and iterate with you',
        body: [
          'You see progress in risk-based stages: structure before polish and core paths before edge cases. Feedback is incorporated continuously throughout delivery.',
        ],
      },
      {
        heading: 'What you get at handoff',
        body: [
          'At handoff, you should know what you own, where it runs, and how to make routine content updates. Ongoing support remains available for strategy or advanced work.',
        ],
      },
    ],
  },
];

const bySlug = new Map(learnDocs.map((d) => [d.slug, d]));

export function getLearnDoc(slug: string): LearnDocData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}

/** Resources dropdown: overview, blog, documentation hub, then each guide. */
export const resourcesNavItems: { title: string; href: string }[] = [
  { title: 'Overview', href: '/resources' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Blog', href: '/blog' },
  { title: 'Documentation', href: '/learn' },
  ...learnDocs.map((d) => ({
    title: d.navTitle,
    href: `/learn/${d.slug}`,
  })),
];
