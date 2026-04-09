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
      'HVAC, electrical, plumbing, landscaping, and other trade businesses need sites that load fast on phones, show proof and licensing clearly, and turn estimates into booked work. We build for how you actually get customers.',
    sections: [
      {
        heading: 'What we focus on',
        body: [
          'Clear service areas, emergency vs scheduled work, and calls-to-action that match how people hire you (call, form, text).',
          'Photos and testimonials that read real, not stock, plus the basics Google and visitors expect: hours, service list, and trust signals.',
        ],
      },
      {
        heading: 'Built for the field',
        body: [
          'Mobile-first layouts, fast hosting, and forms that do not break when someone submits from a truck cab. When you are ready to add scheduling or CRM hooks, the foundation is already sane.',
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
      'Law, accounting, consulting, agencies, and similar firms need a credible first impression: proper email on your domain, a site that reflects your standards, and content structured for busy decision-makers.',
    sections: [
      {
        heading: 'Credibility first',
        body: [
          'Design and copy that sound like you, not a generic theme. Clear paths for intake, consults, or downloads without burying contact info.',
        ],
      },
      {
        heading: 'Systems when you need them',
        body: [
          'We connect websites to the tools you already use (scheduling, CRM, intake) without selling you software you will not adopt.',
        ],
      },
    ],
  },
];

const bySlug = new Map(audienceSegments.map((s) => [s.slug, s]));

export function getAudienceSegment(slug: string): AudienceSegmentData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}
