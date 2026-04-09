export type ServiceSection = { heading: string; body: string[] };

export type ServicePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  lede: string;
  sections: ServiceSection[];
};

/** Top → bottom order matches the Services dropdown */
export const servicePages: ServicePageData[] = [
  {
    slug: 'web-design',
    title: 'Web design',
    metaTitle: 'Web design | HostVerna',
    lede:
      'Sites designed and built around your business, not a template with your logo dropped in. You get something that fits how you work and what you need to say.',
    sections: [
      {
        heading: 'Built from scratch',
        body: [
          'We start from discovery: who you serve, what makes you different, and what visitors should do on your site. Design and content follow from that, not from a theme demo.',
          'You get clear structure, fast performance, and ownership when the project wraps. No mystery fees, no “you can’t move your site elsewhere.”',
        ],
      },
      {
        heading: 'What you can expect',
        body: [
          'A focused build timeline, check-ins you can actually use, and a handoff where you’re not left guessing how to update things.',
          'When you need integrations later (forms, booking, email), we plan for real-world use, not just launch day.',
        ],
      },
    ],
  },
  {
    slug: 'managed-web-services',
    title: 'Managed web services',
    metaTitle: 'Managed web services | HostVerna',
    lede:
      'Hosting, updates, and monitoring so your site stays fast, secure, and online, without you becoming the part-time web person.',
    sections: [
      {
        heading: 'We stay on it',
        body: [
          'SSL, backups, and platform updates handled on a sane schedule. When something drifts (uptime, speed, broken links), we catch it before your customers do.',
          'You get a team you can reach without a ticket maze. If something’s wrong, you’re not debugging it alone at 9 p.m.',
        ],
      },
      {
        heading: 'Fit for your stack',
        body: [
          'Whether we built the site or you’re bringing one to us, we align hosting and care with how your business actually operates.',
        ],
      },
    ],
  },
  {
    slug: 'business-software-crm',
    title: 'Business software & CRM',
    metaTitle: 'Business software & CRM | HostVerna',
    lede:
      'Tools and CRM setup that match your sales process, so your team uses them instead of fighting them.',
    sections: [
      {
        heading: 'Configured for how you sell',
        body: [
          'Fields, pipelines, and automation aligned to your workflow, not a generic default that everyone ignores by week three.',
          'We care about adoption: training, cleanup, and follow-through so the system still works six months later.',
        ],
      },
      {
        heading: 'Fewer tools, clearer handoffs',
        body: [
          'When it makes sense, we help consolidate overlapping apps so data and responsibility aren’t scattered across five logins.',
        ],
      },
    ],
  },
  {
    slug: 'it-solutions',
    title: 'IT solutions',
    metaTitle: 'IT solutions | HostVerna',
    lede:
      'Practical IT support for businesses that need things to work, without building an internal IT department.',
    sections: [
      {
        heading: 'Responsive support',
        body: [
          'Issues triaged and fixed with context: your devices, your network, your line-of-business apps. We’re not a faceless queue reading from a script.',
          'Proactive monitoring where it helps, clear communication when something needs a decision or a purchase.',
        ],
      },
      {
        heading: 'Grounded in your operations',
        body: [
          'We optimize for uptime and sanity: security baselines, backups, and documentation you can actually find when you need it.',
        ],
      },
    ],
  },
  {
    slug: 'custom-software-solutions',
    title: 'Custom software solutions',
    metaTitle: 'Custom software solutions | HostVerna',
    lede:
      'When off-the-shelf almost fits, custom work closes the gap: internal tools, client portals, and workflows built for your rules, not a vendor’s roadmap.',
    sections: [
      {
        heading: 'Purpose-built',
        body: [
          'We scope to outcomes: fewer spreadsheets, fewer handoffs, less retyping between systems. You get software that reflects how your team really operates.',
          'Design, build, and iterate with you, so v1 ships and v2 isn’t a rewrite because nobody talked to the people who click the buttons.',
        ],
      },
      {
        heading: 'Own the result',
        body: [
          'Clear IP and hosting story: you’re not locked into a black box you can’t move. We document what we built and how to run it.',
        ],
      },
    ],
  },
];

const bySlug = new Map(servicePages.map((p) => [p.slug, p]));

export function getServicePage(slug: string): ServicePageData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}

export const serviceNavItems = servicePages.map((p) => ({
  title: p.title,
  href: `/services/${p.slug}`,
}));
