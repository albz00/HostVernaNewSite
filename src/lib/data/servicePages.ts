export type ServiceSection = { heading: string; body: string[] };

export type ServicePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  lede: string;
  sections: ServiceSection[];
};

/** Top → bottom order matches the IT Services dropdown. */
export const servicePages: ServicePageData[] = [
  {
    slug: 'it-solutions',
    title: 'Managed IT Services',
    metaTitle: 'Managed IT Services | HostVerna',
    lede:
      'Responsive user support plus the ongoing administration required to keep devices, accounts, applications, backups, and business technology organized.',
    sections: [
      {
        heading: 'One place to call when technology gets in the way',
        body: [
          'HostVerna acts as an outsourced IT function for accounting and tax firms that need professional support but do not want to build a full internal IT department.',
          'Help desk, device administration, Microsoft 365 or Google Workspace, backup management, vendor coordination, and practical technology planning can all sit under one accountable relationship.',
        ],
      },
      {
        heading: 'Built around filing season',
        body: [
          'Workstations, tax applications, email, document storage, scanning, printing, remote access, and reliable internet all have an outsized impact on revenue during busy season.',
          'We review and improve the environment before January through April exposes every weak process at once.',
        ],
      },
    ],
  },
  {
    slug: 'irs-security-six',
    title: 'IRS Security Six',
    metaTitle: 'IRS Security Six Implementation | HostVerna',
    lede:
      'A focused technology project for CPAs and tax preparers to configure the six baseline safeguards emphasized by the IRS Security Summit and document what is in place.',
    sections: [
      {
        heading: 'What the IRS Security Six covers',
        body: [
          'Anti-malware, firewall review, multi-factor authentication, reliable backups, full-disk encryption, and secure remote access.',
          'HostVerna can review your current environment, close practical configuration gaps, and produce a clear implementation summary for your records.',
        ],
      },
      {
        heading: 'Best paired with a WISP',
        body: [
          'The technical safeguards should be reflected in your Written Information Security Plan. HostVerna can build or update the WISP so the documentation matches the systems and processes actually in use.',
          'The Security Six is a baseline checklist, not a complete security or compliance program. HostVerna provides technology implementation and documentation assistance. Your firm remains responsible for its legal, regulatory, and professional obligations. HostVerna does not provide legal advice or certify regulatory compliance.',
        ],
      },
    ],
  },
  {
    slug: 'wisp-services',
    title: 'WISP Services',
    metaTitle: 'WISP Creation & Updates | HostVerna',
    lede:
      'Create a new Written Information Security Plan or update an outdated one so it documents your firm’s systems, safeguards, vendors, roles, and review process in plain language.',
    sections: [
      {
        heading: 'More than a downloaded template',
        body: [
          'A useful WISP should be tailored to the firm’s size, complexity, systems, and the sensitivity of the information it handles.',
          'We identify users, devices, applications, data locations, service providers, remote-access methods, and current safeguards, then document responsible roles, risks, safeguards, service providers, incident handling, and review cadence.',
        ],
      },
      {
        heading: 'Keep it current',
        body: [
          'Update the WISP as systems, vendors, staff, locations, or operating processes materially change. Annual reviews and updates after major IT changes are available.',
          'HostVerna can help develop and maintain the technical portions of a WISP, but we do not provide legal advice or certify regulatory compliance. Firms remain responsible for their legal, regulatory, and professional obligations.',
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
