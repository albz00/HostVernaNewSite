export type SolutionSection = { heading: string; body: string[] };

export type SolutionPageData = {
  slug: string;
  /** Short label for nav (2-3 words) */
  navTitle: string;
  /** H1 on the page */
  title: string;
  metaTitle: string;
  lede: string;
  sections: SolutionSection[];
};

/** Page data for the Solutions dropdown. */
export const solutionPages: SolutionPageData[] = [
  {
    slug: 'own-your-site',
    navTitle: 'Own your site',
    title: 'Own your site',
    metaTitle: 'Own your site | HostVerna',
    lede:
      'Stop renting a website you will never own. We build your site so ownership transfers after a defined term, without perpetual licensing or platform lock-in.',
    sections: [
      {
        heading: 'What ownership means',
        body: [
          'You receive the full deliverable: design, code, and a documented handoff. We do not deliver locked themes on third-party platforms.',
          'After a defined number of months, ownership transfers to you. Rental-style build fees end, and support remains available when needed.',
        ],
      },
      {
        heading: 'Why it matters',
        body: [
          'Many small businesses outgrow template platforms but remain tied to recurring fees. Ownership aligns your spend with an asset you control.',
        ],
      },
    ],
  },
  {
    slug: 'beyond-templates',
    navTitle: 'Beyond templates',
    title: 'Beyond templates',
    metaTitle: 'Beyond templates | HostVerna',
    lede:
      'If your site resembles a generic theme, it likely does not represent your business well. We design and build from your strategy, not from a preset layout.',
    sections: [
      {
        heading: 'Custom, not recycled',
        body: [
          'Discovery comes first: audience, differentiation, and conversion goals. Structure, copy, and visuals follow that strategy.',
          'You get a focused site with clear messaging and performance, without unnecessary filler sections.',
        ],
      },
      {
        heading: 'Next step',
        body: [
          'Our web design and development service is the next step when you need a full build specification and timeline.',
        ],
      },
    ],
  },
  {
    slug: 'workflow-fit-software',
    navTitle: 'Workflow-fit software',
    title: 'Workflow-fit software',
    metaTitle: 'Workflow-fit software | HostVerna',
    lede:
      'Off-the-shelf tools often leave workflow gaps that cost time. Custom software closes those gaps with internal tools, portals, and processes built for your operation.',
    sections: [
      {
        heading: 'Built for your real workflow',
        body: [
          'We scope to outcomes: fewer spreadsheets, fewer handoffs, and less manual re-entry between systems. Iteration includes the people who use the software daily.',
        ],
      },
      {
        heading: 'Explore the approach',
        body: [
          'Review how we handle custom applications, ownership, and documentation for long-term maintainability.',
        ],
      },
    ],
  },
  {
    slug: 'reachable-it-support',
    navTitle: 'Reachable IT support',
    title: 'Reachable IT support',
    metaTitle: 'Reachable IT support | HostVerna',
    lede:
      'You should not need a technical background to run your business. We provide responsive IT support aligned to your devices, network, and line-of-business systems.',
    sections: [
      {
        heading: 'Context-aware support',
        body: [
          'Issues are triaged with operational context. When a decision or purchase is required, we communicate it clearly and promptly.',
        ],
      },
      {
        heading: 'Stability and sanity',
        body: [
          'We maintain security baselines, backups, and clear documentation, with proactive monitoring where it provides measurable value.',
        ],
      },
    ],
  },
  {
    slug: 'speed-without-lock-in',
    navTitle: 'Speed without lock-in',
    title: 'Speed without lock-in',
    metaTitle: 'Speed without lock-in | HostVerna',
    lede:
      'Fast load times should not require proprietary lock-in. We deliver lean, edge-hosted sites with portable code ownership and clear documentation.',
    sections: [
      {
        heading: 'Performance by design',
        body: [
          'Compiled static output and edge delivery provide fast performance without unnecessary stack complexity.',
        ],
      },
      {
        heading: 'No platform ransom',
        body: [
          'When you own your site, you own the underlying code, not just access to a closed platform.',
        ],
      },
    ],
  },
  {
    slug: 'customer-confirmations',
    navTitle: 'Customer confirmations',
    title: 'Customer confirmations that build trust',
    metaTitle: 'Customer confirmations | HostVerna',
    lede:
      'After a form submission, customers should immediately know their message was received and what happens next. We design confirmation flows that reduce uncertainty and improve follow-through.',
    sections: [
      {
        heading: 'On the page and in the inbox',
        body: [
          'A clear on-screen confirmation is the baseline. Where appropriate, we align follow-up copy so next steps are explicit: what happens next, expected response time, and how to follow up.',
          'This protects trust at a critical point in the customer journey.',
        ],
      },
      {
        heading: 'Why it belongs in scope',
        body: [
          'Trust declines when the interface becomes silent after submission. Confirmation messaging is part of the product and should be included in scope and QA.',
        ],
      },
    ],
  },
  {
    slug: 'security-built-in',
    navTitle: 'Security built in',
    title: 'Security built in, not bolted on later',
    metaTitle: 'Web security | HostVerna',
    lede:
      'Even brochure sites are regularly scanned for weak forms and insecure defaults. We ship with a practical baseline: lower attack surface, modern hosting patterns, and controlled endpoints.',
    sections: [
      {
        heading: 'What a solid baseline includes',
        body: [
          'Protections against automated abuse on contact paths, careful input handling, and infrastructure choices that reduce unnecessary exposure.',
          'We align controls to your actual risk profile, including public forms and third-party scripts.',
        ],
      },
      {
        heading: 'How we keep it maintainable',
        body: [
          'Security must remain maintainable over time. We keep builds understandable, dependencies intentional, and communicate clearly when server-side controls are required.',
        ],
      },
    ],
  },
  {
    slug: 'how-we-work-together',
    navTitle: 'How we work together',
    title: 'How we work together',
    metaTitle: 'How we work together | HostVerna',
    lede:
      'We focus on web presence, software, and technical infrastructure. We provide clear guidance and implementation support while your team remains responsible for business strategy and growth.',
    sections: [
      {
        heading: 'Clear guidance and clear limits',
        body: [
          'If digital systems are not your core focus, we explain each phase in plain language: what the solution does, what it does not do, and what happens after launch.',
          'We do not guarantee customers or revenue. We do build a credible digital foundation that supports trust and clearer buyer decisions.',
        ],
      },
      {
        heading: 'Professional foundations',
        body: [
          'We prioritize domain-based business email, credible design, and clear information architecture so visitors can evaluate your business quickly and confidently.',
        ],
      },
      {
        heading: 'Many channels, one destination',
        body: [
          'Your business may be discovered through search, social media, referrals, or email. Each channel should point to one reliable destination.',
          'That destination should provide the essentials: services, proof, contact paths, and practical details. Without it, potential customers may leave before they have enough information to decide.',
        ],
      },
      {
        heading: 'How we define our role',
        body: [
          'We build and maintain the digital destination. Your team owns reputation, follow-up, and demand generation. This division of responsibility keeps expectations clear and execution effective.',
        ],
      },
    ],
  },
];

const bySlug = new Map(solutionPages.map((p) => [p.slug, p]));

export function getSolutionPage(slug: string): SolutionPageData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}

const solutionNavOrder = [
  'how-we-work-together',
  'own-your-site',
  'beyond-templates',
  'speed-without-lock-in',
  'security-built-in',
  'customer-confirmations',
  'workflow-fit-software',
  'reachable-it-support',
] as const;

export const solutionNavItems = solutionNavOrder.map((slug) => {
  const page = bySlug.get(slug);
  if (!page) throw new Error(`Missing solution page for nav slug: ${slug}`);

  return {
    title: page.navTitle,
    href: `/solutions/${page.slug}`,
  };
});
