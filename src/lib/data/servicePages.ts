export type ServiceSection = { heading: string; body: string[] };
export type ServiceStep = { title: string; body: string };

export type ServicePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  lede: string;
  imageUrl: string;
  imageAlt: string;
  checklistHeading: string;
  checklist: string[];
  sections: ServiceSection[];
  nextSteps: ServiceStep[];
};

/** Top → bottom order matches the IT Services dropdown. */
export const servicePages: ServicePageData[] = [
  {
    slug: 'it-solutions',
    title: 'Managed IT Services',
    metaTitle: 'Managed IT Services | HostVerna',
    lede:
      'Responsive user support plus the ongoing administration required to keep devices, accounts, applications, backups, and business technology organized.',
    imageUrl:
      'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/a01968f3-730e-4a92-27aa-8b9eb15c0100/public',
    imageAlt: 'Managed IT collaboration and support',
    checklistHeading: 'What ongoing support can cover',
    checklist: [
      '24-hour security monitoring',
      'Remote technical support during business hours',
      'Critical security escalation outside business hours',
      'Endpoint monitoring, patching, and remote management',
      'Identity, MFA, and account administration',
      'Backup monitoring and recovery coordination',
      'Encryption monitoring',
      'Employee onboarding and offboarding',
      'Routine environment reviews and documentation',
      'Limited onsite assistance where practical',
    ],
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
    nextSteps: [
      {
        title: 'Complete the firm qualification',
        body: 'Share your firm size, cloud platform, current support arrangement, locations, and the main reason you are reviewing IT.',
      },
      {
        title: 'Meet with HostVerna for discovery',
        body: 'HostVerna reviews users, devices, Microsoft 365 or Google Workspace, provider relationships, known controls, and unanswered questions.',
      },
      {
        title: 'Verify the environment',
        body: 'Known facts are confirmed and unknown areas are marked for verification. This is discovery, not a completed audit or penetration test.',
      },
      {
        title: 'Receive a practical recommendation',
        body: 'You get a clear proposed scope for cleanup, onboarding, ongoing support, or a focused security project.',
      },
    ],
  },
  {
    slug: 'irs-security-six',
    title: 'IRS Security Six',
    metaTitle: 'IRS Security Six Implementation | HostVerna',
    lede:
      'A focused technology project for CPAs and tax preparers to configure the six baseline safeguards emphasized by the IRS Security Summit and document what is in place.',
    imageUrl: '/images/irs-security-six.jpg',
    imageAlt: 'Laptop showing a secured connection and lock symbol',
    checklistHeading: 'What the evaluation and implementation covers',
    checklist: [
      'Endpoint protection deployment or validation',
      'Firewall and network review',
      'MFA implementation and enforcement',
      'Backup review and configuration',
      'Drive encryption',
      'VPN or secure remote access where needed',
      'User and device inventory',
      'Microsoft 365 or Google Workspace review',
      'Initial findings and a clear remediation summary',
      'WISP review or creation when the firm needs it',
    ],
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
    nextSteps: [
      {
        title: 'Complete the firm qualification',
        body: 'Tell us how many users and devices you have, which cloud platform you use, who handles IT today, and what prompted the review.',
      },
      {
        title: 'Review the current environment',
        body: 'HostVerna walks through users, endpoints, identity, backups, encryption, network controls, remote access, and the current WISP.',
      },
      {
        title: 'Implement and verify safeguards',
        body: 'HostVerna closes the agreed configuration gaps and records what was implemented, validated, or still needs verification.',
      },
      {
        title: 'Receive the findings summary',
        body: 'Your firm receives a clear remediation summary and can discuss WISP work or ongoing managed IT where those services are useful.',
      },
    ],
  },
  {
    slug: 'wisp-services',
    title: 'WISP Services',
    metaTitle: 'WISP Creation & Updates | HostVerna',
    lede:
      'Create a new Written Information Security Plan or update an outdated one so it documents your firm’s systems, safeguards, vendors, roles, and review process in plain language.',
    imageUrl: '/images/wisp-documentation.jpg',
    imageAlt: 'Professionals reviewing a written security plan together',
    checklistHeading: 'What the WISP process documents',
    checklist: [
      'Users, devices, and locations',
      'Applications and taxpayer-data locations',
      'Microsoft 365 or Google Workspace environment',
      'Security roles and responsibilities',
      'Current technical and administrative safeguards',
      'Service providers and vendor relationships',
      'Remote access and remote-work practices',
      'Incident response responsibilities',
      'Review cadence and change triggers',
      'Security Six controls reflected in the written plan',
    ],
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
    nextSteps: [
      {
        title: 'Complete the firm qualification',
        body: 'Share the firm structure, users, locations, cloud platform, current support arrangement, and the status of any existing WISP.',
      },
      {
        title: 'Gather the real environment details',
        body: 'We review systems, vendors, safeguards, responsible roles, remote access, and how taxpayer information is handled in practice.',
      },
      {
        title: 'Build or update the plan',
        body: 'HostVerna drafts the technical plan around the firm that actually exists instead of inserting a name into a generic template.',
      },
      {
        title: 'Review and maintain it',
        body: 'The firm reviews the document, resolves open questions, and can arrange future updates after material changes or annual reviews.',
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
