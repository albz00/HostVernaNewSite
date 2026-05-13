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
      'Moving a domain should be boring and predictable. Here is how we coordinate transfers, what we need from you, and where the slow parts usually are (hint: often the registrar, not us).',
    sections: [
      {
        heading: 'Before anything moves',
        body: [
          'We confirm who owns the domain, where it is registered today, and whether email or DNS depends on it. If you are not sure, we walk you through finding that in your current registrar’s panel.',
        ],
      },
      {
        heading: 'Auth codes and unlock',
        body: [
          'Most transfers need the domain unlocked and an authorization code from the losing registrar. We tell you exactly what to click; you paste codes to us in a secure channel when we ask.',
          'Timing matters: some registrars add a waiting period after you request a code.',
        ],
      },
      {
        heading: 'After transfer starts',
        body: [
          'DNS can stay stable during many transfers if we plan it. We coordinate cutovers so your site and email do not disappear in the middle of the night unless you want that window.',
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
      'Heavy, unoptimized images are the fastest way to make a site feel slow. We use Cloudflare’s image pipeline so visitors get appropriately sized files from the edge, close to where they are browsing.',
    sections: [
      {
        heading: 'Why a CDN helps',
        body: [
          'A content delivery network caches copies of your assets in many places. First visit might fetch from origin; repeat visits and global traffic benefit from shorter paths and fewer round trips.',
        ],
      },
      {
        heading: 'Cloudflare Images in our stack',
        body: [
          'When we wire your project for Cloudflare Images, variants can be served for different layouts and densities so phones are not downloading desktop-sized originals.',
          'Exact setup depends on your plan and how your site is built; we document what we enabled for your project in handoff.',
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
      'Nothing we ship is “insert business name here.” Discovery, constraints, and your actual workflows drive what we design, build, and host.',
    sections: [
      {
        heading: 'Discovery first',
        body: [
          'We start from outcomes: who uses the thing, what must never break, and what “done” looks like on your calendar. Templates might inform layout, but they do not replace your specifics.',
        ],
        mediaSlots: 1,
        mediaLabels: ['Your discovery outline / workshop notes'],
      },
      {
        heading: 'Build and iterate with you',
        body: [
          'You see progress in stages that match risk: structure before polish, working paths before edge cases. Feedback goes into the next slice instead of stacking silently until launch week.',
        ],
        mediaSlots: 2,
      },
      {
        heading: 'What you get at handoff',
        body: [
          'You should know what you own, where it runs, and how to change text without calling us for every comma. When you want us back, it is for strategy or heavier work, not because the basics are a mystery.',
        ],
        mediaSlots: 1,
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
  { title: 'Greenbrier County, WV', href: '/greenbrier-county-wv' },
  ...learnDocs.map((d) => ({
    title: d.navTitle,
    href: `/learn/${d.slug}`,
  })),
];
