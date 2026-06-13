export type AudienceBlock = { heading: string; body: string[] };

export type AudienceSegmentData = {
  slug: string;
  navTitle: string;
  title: string;
  metaTitle: string;
  lede: string;
  sections: AudienceBlock[];
};

export const audienceSegments: AudienceSegmentData[] = [
  {
    slug: 'trades',
    navTitle: 'Trades & contractors',
    title: 'Trades & contractors',
    metaTitle: 'Trades & contractors | HostVerna',
    lede:
      'HVAC, electrical, plumbing, landscaping, and similar trade businesses need mobile-first sites that load quickly, present licensing clearly, and convert estimate requests into booked work.',
    sections: [
      {
        heading: 'What we focus on',
        body: [
          'Clear service areas, emergency versus scheduled service paths, and calls to action aligned to how customers contact you (call, form, or text).',
          'Project photos, testimonials, and core trust information visitors expect: hours, services, and business credentials.',
        ],
      },
      {
        heading: 'Built for the field',
        body: [
          'Mobile-first layouts, reliable hosting, and submission paths that perform under real field conditions. When you are ready to add scheduling or CRM integrations, the technical foundation is in place.',
        ],
      },
    ],
  },
  {
    slug: 'professional-services',
    navTitle: 'Professional & office',
    title: 'Professional & office',
    metaTitle: 'Professional services | HostVerna',
    lede:
      'Law, accounting, consulting, and similar firms need a credible first impression: domain-based business email, a professional site, and information structured for busy decision-makers.',
    sections: [
      {
        heading: 'Credibility first',
        body: [
          'Design and copy aligned to your positioning, with clear paths for intake, consultations, or downloads.',
        ],
      },
      {
        heading: 'Systems when you need them',
        body: [
          'We connect websites to your existing tools (scheduling, CRM, intake) without adding unnecessary software.',
        ],
      },
    ],
  },
  {
    slug: 'aviation',
    navTitle: 'Aviation & flight',
    title: 'Aviation & flight',
    metaTitle: 'Aviation websites and software | HostVerna',
    lede:
      'Charter operators, flight schools, airports, FBOs, and maintenance teams need digital tools that are credible, current, and easy to use. We build systems for aviation organizations that cannot afford unclear information.',
    sections: [
      {
        heading: 'Who this fits',
        body: [
          'Private charter operators, ground schools, flight training programs, airport services, FBOs, maintenance shops, and related operations.',
          'We help present services, safety information, availability, aircraft details, forms, and contact paths in a way that is clear to customers, students, pilots, and partners.',
        ],
      },
      {
        heading: 'What we can build',
        body: [
          'Public-facing websites for charter requests, training inquiries, airport services, fleet pages, and maintenance intake.',
          'When needed, we also scope portals, CRM workflows, quote paths, scheduling workflows, and internal tools aligned to your operation.',
        ],
      },
    ],
  },
];

const bySlug = new Map(audienceSegments.map((s) => [s.slug, s]));

export function getAudienceSegment(slug: string): AudienceSegmentData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}
