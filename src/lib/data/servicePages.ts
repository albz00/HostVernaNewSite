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
      'Custom websites designed around your business goals, audience, and workflow. You get a site that reflects your brand and helps visitors take action.',
    sections: [
      {
        heading: 'Built from scratch',
        body: [
          'We start with discovery: who you serve, what differentiates your business, and what visitors should do on your site. Design and content are built from that plan.',
          'You get clear structure, strong performance, and full ownership at handoff. There is no platform lock-in.',
        ],
      },
      {
        heading: 'What you can expect',
        body: [
          'A defined build timeline, practical check-ins, and a documented handoff so your team can update core content with confidence.',
          'When you need integrations later (forms, booking, email, CRM), we plan for those requirements from the beginning.',
        ],
      },
    ],
  },
  {
    slug: 'managed-web-services',
    title: 'Managed web services',
    metaTitle: 'Managed web services | HostVerna',
    lede:
      'Hosting, updates, and monitoring that keep your site fast, secure, and available without adding operational overhead to your team.',
    sections: [
      {
        heading: 'We stay on it',
        body: [
          'SSL, backups, and platform updates are handled on a consistent schedule. We monitor uptime, performance, and core site health before issues impact customers.',
          'You have direct support access when something goes wrong, so your team is not troubleshooting alone.',
        ],
      },
      {
        heading: 'Fit for your stack',
        body: [
          'Whether we built the site or you are migrating an existing one, we align hosting and support with your operating requirements.',
        ],
      },
    ],
  },
  {
    slug: 'business-software-crm',
    title: 'Business software & CRM',
    metaTitle: 'Business software & CRM | HostVerna',
    lede:
      'CRM and business tools configured to match your sales process, so teams can adopt them quickly and use them consistently.',
    sections: [
      {
        heading: 'Configured for how you sell',
        body: [
          'Fields, pipelines, and automation are mapped to your workflow instead of generic defaults.',
          'We support adoption with training, cleanup, and follow-up so the system remains useful after launch.',
        ],
      },
      {
        heading: 'Fewer tools, clearer handoffs',
        body: [
          'When appropriate, we consolidate overlapping tools so data and ownership are not fragmented across multiple systems.',
        ],
      },
    ],
  },
  {
    slug: 'it-solutions',
    title: 'IT solutions',
    metaTitle: 'IT solutions | HostVerna',
    lede:
      'Practical IT support for businesses that need reliable systems without maintaining a full internal IT department.',
    sections: [
      {
        heading: 'Responsive support',
        body: [
          'Issues are triaged and resolved with context from your devices, network, and line-of-business systems.',
          'We provide proactive monitoring where it adds value and clear communication when decisions or purchases are required.',
        ],
      },
      {
        heading: 'Grounded in your operations',
        body: [
          'We focus on uptime, security baselines, backups, and documentation your team can find and use when needed.',
        ],
      },
    ],
  },
  {
    slug: 'custom-software-solutions',
    title: 'Custom software solutions',
    metaTitle: 'Custom software solutions | HostVerna',
    lede:
      'When off-the-shelf software does not fully fit, custom development closes the gap with internal tools, portals, and workflows built for your requirements.',
    sections: [
      {
        heading: 'Purpose-built',
        body: [
          'We scope to outcomes: fewer spreadsheets, fewer handoffs, and less manual re-entry between systems.',
          'We design, build, and iterate with your team so the first release is usable and future updates remain manageable.',
        ],
      },
      {
        heading: 'Own the result',
        body: [
          'You receive clear IP ownership, portable hosting options, and documentation for ongoing operation.',
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
