export type AudienceBlock = { heading: string; body: string[] };
export type AudienceStep = { title: string; body: string };

export type AudienceSegmentData = {
  slug: string;
  navTitle: string;
  title: string;
  metaTitle: string;
  lede: string;
  eyebrow: string;
  checklistHeading: string;
  checklist: string[];
  sections: AudienceBlock[];
  nextSteps: AudienceStep[];
};

export const audienceSegments: AudienceSegmentData[] = [
  {
    slug: 'accounting-tax-firms',
    navTitle: 'Accounting & Tax Firms',
    title: 'IT support designed around the realities of accounting firms.',
    metaTitle: 'IT for CPAs, Accounting Firms & Tax Preparers | HostVerna',
    lede:
      'From a solo preparer to a multi-office CPA practice, the technology priorities are similar: protect access, keep systems available, support staff quickly, and reduce surprises during busy season.',
    eyebrow: 'Accounting and tax practices',
    checklistHeading: 'One IT relationship for the whole firm',
    checklist: [
      'Help desk support for partners and staff',
      'Workstation monitoring, patching, and encryption',
      'Microsoft 365 or Google Workspace administration',
      'MFA, user access, and account lifecycle management',
      'Backup monitoring and recovery coordination',
      'Tax software and line-of-business vendor coordination',
      'Security Six implementation',
      'WISP creation and ongoing updates',
    ],
    sections: [
      {
        heading: 'Technology support that fits the way your firm works',
        body: [
          'HostVerna supports CPA firms, tax practices, enrolled agents, bookkeeping teams, and payroll providers. The work can cover user accounts, endpoints, email, document access, collaboration, remote work, backups, security controls, and the vendors behind your core applications.',
          'Your team gets a clear place to take technology problems while owners and office managers gain better visibility into what is protected, what needs attention, and who is responsible.',
        ],
      },
      {
        heading: 'Prepare before the phones start ringing',
        body: [
          'A pre-season review can cover user accounts and permissions, workstation health, MFA, tax software access, backups, remote work, internet and network dependencies, printer and scanner workflows, vendor contacts, and WISP changes.',
          'HostVerna provides technology implementation and documentation assistance. Your firm remains responsible for its legal, regulatory, and professional obligations. HostVerna does not provide legal advice or certify regulatory compliance.',
        ],
      },
      {
        heading: 'Support for firms without an internal IT department',
        body: [
          'Many small and midsize firms have capable staff managing technology by necessity rather than by role. HostVerna can take ownership of routine administration, document the environment, coordinate providers, and help leadership plan improvements in a practical order.',
          'Engagements can begin with a focused Security Six or WISP project, an environment cleanup, or an ongoing managed IT relationship.',
        ],
      },
    ],
    nextSteps: [
      {
        title: 'Tell us about the firm',
        body: 'Share your users, devices, locations, cloud platform, current support arrangement, and the reason you are reviewing IT.',
      },
      {
        title: 'Review the current environment',
        body: 'We discuss accounts, endpoints, applications, backups, security controls, vendors, remote work, and current documentation.',
      },
      {
        title: 'Prioritize the work',
        body: 'HostVerna separates urgent risks, operational cleanup, documentation needs, and longer-term improvements into a practical recommendation.',
      },
      {
        title: 'Choose a clear scope',
        body: 'Move forward with a focused project, managed IT onboarding, or a defined combination based on what the firm actually needs.',
      },
    ],
  },
  {
    slug: 'cpa-firms',
    navTitle: 'CPA Firms',
    title: 'Managed IT for CPA firms that cannot afford busy-season disruption.',
    metaTitle: 'Managed IT Services for CPA Firms | HostVerna',
    lede:
      'Keep partners and staff productive with responsive support, organized account administration, documented safeguards, and preparation that starts before filing deadlines expose weak systems.',
    eyebrow: 'For CPA practices',
    checklistHeading: 'Technology coverage for a modern CPA firm',
    checklist: [
      'Partner and staff help desk support',
      'New-hire setup and prompt offboarding',
      'Microsoft 365 or Google Workspace administration',
      'Laptop and workstation health monitoring',
      'Secure remote and hybrid work',
      'Document portal and application coordination',
      'Backup and recovery readiness',
      'Security Six and WISP alignment',
    ],
    sections: [
      {
        heading: 'Support across audit, tax, advisory, and administration',
        body: [
          'CPA firms depend on a connected stack of productivity tools, tax and accounting applications, portals, scanners, printers, document systems, and vendor-hosted services. When one dependency fails, several teams can lose billable time at once.',
          'HostVerna provides one accountable IT relationship for user support, device administration, cloud accounts, access issues, vendor coordination, and routine environment maintenance.',
        ],
      },
      {
        heading: 'Control access as staffing changes',
        body: [
          'Seasonal hires, interns, promotions, departures, and changing client responsibilities make account lifecycle management especially important. We help standardize onboarding and offboarding, enforce MFA, review permissions, and document who owns each administrative system.',
          'That process reduces stale accounts and rushed access decisions without making partners personally administer every platform.',
        ],
      },
      {
        heading: 'Plan around deadlines, not after an outage',
        body: [
          'Pre-season readiness can include workstation checks, account testing, backup review, remote-access validation, network dependencies, tax application access, and escalation contacts for critical vendors.',
          'The goal is not to promise that technology never fails. It is to reduce avoidable failures and make recovery paths clear before every hour matters.',
        ],
      },
    ],
    nextSteps: [
      {
        title: 'Complete firm qualification',
        body: 'Provide the number of users and locations, your cloud platform, current IT arrangement, and the main issue driving the conversation.',
      },
      {
        title: 'Map the operating environment',
        body: 'We review staff workflows, devices, identity, applications, document access, vendors, backups, and known security controls.',
      },
      {
        title: 'Identify deadline-sensitive gaps',
        body: 'We call out issues that could affect busy-season availability, staff access, data protection, or recoverability.',
      },
      {
        title: 'Receive a practical scope',
        body: 'HostVerna recommends focused remediation, managed IT onboarding, or both, with responsibilities and next actions made clear.',
      },
    ],
  },
  {
    slug: 'tax-preparers-enrolled-agents',
    navTitle: 'Tax Preparers & Enrolled Agents',
    title: 'Practical IT and security support for tax preparers and enrolled agents.',
    metaTitle: 'IT Support for Tax Preparers & Enrolled Agents | HostVerna',
    lede:
      'Protect taxpayer information, prepare workstations and accounts before filing season, and get responsive help when software, access, scanning, printing, or remote work interrupts the day.',
    eyebrow: 'For tax practices and EAs',
    checklistHeading: 'Filing-season technology readiness',
    checklist: [
      'Tax software access and vendor coordination',
      'MFA on email and critical cloud accounts',
      'Endpoint protection and patching',
      'Full-disk encryption monitoring',
      'Reliable backup review',
      'Secure remote-access configuration',
      'Scanner, printer, and document workflow support',
      'Security Six and WISP assistance',
    ],
    sections: [
      {
        heading: 'Built for small teams handling sensitive information',
        body: [
          'Independent preparers and enrolled agents often manage technology alongside client work. HostVerna can take routine administration and troubleshooting off the owner’s desk while keeping decisions understandable and proportionate to the practice.',
          'Support can cover computers, email, cloud accounts, tax applications, document sharing, backups, remote access, printers, scanners, and the technical portions of security documentation.',
        ],
      },
      {
        heading: 'Close baseline security gaps before filing season',
        body: [
          'The IRS Security Six emphasizes anti-malware, firewalls, MFA, backups, drive encryption, and secure remote access. We can review what is already in place, implement agreed improvements, and document what was verified or remains unresolved.',
          'A useful Written Information Security Plan should reflect the people, systems, vendors, and safeguards the practice actually uses rather than relying on an untouched template.',
        ],
      },
      {
        heading: 'Know who to call when a workflow breaks',
        body: [
          'A login problem, failed update, disconnected printer, blocked portal, or unavailable workstation can stop client work. HostVerna provides a clear support path and coordinates with tax software or internet providers when the issue sits outside the local device.',
          'HostVerna provides technology implementation and documentation assistance, not legal advice or compliance certification.',
        ],
      },
    ],
    nextSteps: [
      {
        title: 'Describe your tax practice',
        body: 'Tell us about users, computers, tax software, cloud email, remote work, existing IT help, and your current WISP.',
      },
      {
        title: 'Review Security Six basics',
        body: 'We discuss endpoint protection, firewalls, MFA, backups, encryption, remote access, and where taxpayer information is handled.',
      },
      {
        title: 'Address the highest-impact gaps',
        body: 'The recommendation prioritizes filing-season continuity, account security, recoverability, and documentation.',
      },
      {
        title: 'Choose project or ongoing support',
        body: 'Start with a focused security project or establish managed IT support for year-round administration and help desk needs.',
      },
    ],
  },
  {
    slug: 'bookkeeping-firms',
    navTitle: 'Bookkeeping Firms',
    title: 'Reliable IT support for bookkeeping firms and distributed client-service teams.',
    metaTitle: 'Managed IT for Bookkeeping Firms | HostVerna',
    lede:
      'Standardize devices and accounts, support remote staff, protect access to client financial systems, and keep the cloud tools your team uses every day organized and available.',
    eyebrow: 'For bookkeeping practices',
    checklistHeading: 'Support for cloud-first bookkeeping teams',
    checklist: [
      'Remote employee setup and support',
      'Microsoft 365 or Google Workspace administration',
      'Laptop standards, patching, and encryption',
      'MFA and password-manager rollout',
      'Onboarding and offboarding workflows',
      'Secure document sharing and collaboration',
      'Backup and SaaS recovery planning',
      'Client access and vendor coordination',
    ],
    sections: [
      {
        heading: 'Keep a distributed team working consistently',
        body: [
          'Bookkeeping firms often grow by adding remote staff, contractors, and new cloud applications. Without clear standards, every laptop, account, and client workflow can become a one-off arrangement that is difficult to support or secure.',
          'HostVerna helps standardize devices, identity, collaboration, endpoint protection, access requests, and support so the firm can grow without rebuilding its technology process for each hire.',
        ],
      },
      {
        heading: 'Protect access across many client platforms',
        body: [
          'Bookkeepers may work in accounting systems, receipt tools, document portals, payroll products, bank portals, and client-owned environments. We help the firm secure its own accounts and devices, use MFA and password management appropriately, and maintain clearer onboarding and offboarding records.',
          'Client-controlled platforms still require coordination with the client or software provider, but your team has an IT partner to help isolate the problem and manage the handoff.',
        ],
      },
      {
        heading: 'Make operational knowledge less fragile',
        body: [
          'Documenting administrators, vendors, devices, account ownership, backup expectations, and recurring workflows reduces dependence on one owner or operations lead remembering every detail.',
          'That foundation improves support today and makes future hiring, vendor changes, security reviews, and recovery work more manageable.',
        ],
      },
    ],
    nextSteps: [
      {
        title: 'Share how your team works',
        body: 'Provide team size, work locations, devices, cloud tools, client-access patterns, and how technology support is handled today.',
      },
      {
        title: 'Review identity and endpoints',
        body: 'We look at account administration, MFA, device standards, encryption, patching, remote support, and staff lifecycle processes.',
      },
      {
        title: 'Document and prioritize',
        body: 'HostVerna identifies immediate support issues, security gaps, ownership questions, and improvements needed for repeatable growth.',
      },
      {
        title: 'Build the right support model',
        body: 'Choose focused cleanup or ongoing managed IT based on the team’s complexity and the ownership your firm wants to transfer.',
      },
    ],
  },
  {
    slug: 'payroll-providers',
    navTitle: 'Payroll Providers',
    title: 'Managed IT for payroll providers with deadline-driven, data-sensitive operations.',
    metaTitle: 'IT Support for Payroll Providers | HostVerna',
    lede:
      'Support the people, devices, accounts, and vendors behind every payroll run with clearer ownership, stronger access controls, responsive troubleshooting, and documented recovery planning.',
    eyebrow: 'For payroll service firms',
    checklistHeading: 'IT coverage for payroll operations',
    checklist: [
      'Priority support for deadline-sensitive workflows',
      'Payroll application and vendor coordination',
      'MFA and privileged-account administration',
      'Workstation monitoring and encryption',
      'Secure remote and hybrid access',
      'Employee onboarding and offboarding',
      'Backup and business-continuity review',
      'Incident contacts and environment documentation',
    ],
    sections: [
      {
        heading: 'Technology support that respects payroll deadlines',
        body: [
          'Payroll work has fixed processing windows and little tolerance for account lockouts, unavailable workstations, connectivity failures, or unclear vendor ownership. HostVerna provides a defined support path and helps coordinate technical providers when an issue crosses systems.',
          'Routine monitoring and administration are paired with documentation so the firm is not starting from scratch during every urgent event.',
        ],
      },
      {
        heading: 'Secure high-impact accounts and staff transitions',
        body: [
          'Payroll teams handle sensitive employee and financial information across internal systems and vendor platforms. We help enforce MFA, manage privileged accounts, maintain endpoint safeguards, and remove access promptly when roles change.',
          'Standard onboarding and offboarding also gives managers a repeatable way to request equipment, accounts, permissions, and closures.',
        ],
      },
      {
        heading: 'Define recovery dependencies before they are tested',
        body: [
          'A continuity review should distinguish what your firm controls from what the payroll platform, bank, internet provider, or other vendor controls. We document contacts, dependencies, backup expectations, alternative access, and known escalation paths.',
          'HostVerna does not replace the payroll platform’s support team or certify compliance. We provide IT implementation, coordination, and documentation support around your firm’s environment.',
        ],
      },
    ],
    nextSteps: [
      {
        title: 'Outline the payroll operation',
        body: 'Share users, locations, processing schedule, primary platforms, devices, remote work, vendors, and current IT responsibilities.',
      },
      {
        title: 'Map critical dependencies',
        body: 'We review identity, endpoints, internet and network needs, provider relationships, backups, and escalation paths.',
      },
      {
        title: 'Prioritize continuity and access',
        body: 'The recommendation focuses first on issues that could interrupt payroll processing or expose sensitive accounts and devices.',
      },
      {
        title: 'Establish accountable support',
        body: 'Move forward with defined remediation, ongoing managed IT, or a combination that makes support and ownership clear.',
      },
    ],
  },
];

const bySlug = new Map(audienceSegments.map((s) => [s.slug, s]));

export function getAudienceSegment(slug: string): AudienceSegmentData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}
