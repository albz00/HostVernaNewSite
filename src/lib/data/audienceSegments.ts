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
    slug: 'accounting-tax-firms',
    navTitle: 'Accounting & Tax Firms',
    title: 'IT support designed around the realities of accounting firms.',
    metaTitle: 'IT for CPAs, Accounting Firms & Tax Preparers | HostVerna',
    lede:
      'From a solo preparer to a multi-office CPA practice, the technology priorities are similar: protect access, keep systems available, support staff quickly, and reduce surprises during busy season.',
    sections: [
      {
        heading: 'Who HostVerna supports',
        body: [
          'CPA firms, accounting firms, tax preparers, enrolled agents, bookkeeping firms, and payroll providers.',
          'Support can include user accounts, endpoints, email, document access, collaboration, remote work, backups, Security Six implementation, WISP documentation, and technology vendors.',
        ],
      },
      {
        heading: 'Prepare before the phones start ringing',
        body: [
          'A pre-season review can cover user accounts and permissions, workstation health, MFA, tax software access, backups, remote work, internet and network dependencies, printer and scanner workflows, vendor contacts, and WISP changes.',
          'HostVerna provides technology implementation and documentation assistance. Your firm remains responsible for its legal, regulatory, and professional obligations. HostVerna does not provide legal advice or certify regulatory compliance.',
        ],
      },
    ],
  },
];

const bySlug = new Map(audienceSegments.map((s) => [s.slug, s]));

export function getAudienceSegment(slug: string): AudienceSegmentData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}
