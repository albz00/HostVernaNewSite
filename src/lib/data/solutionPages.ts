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

/** Order matches Use Cases dropdown */
export const solutionPages: SolutionPageData[] = [
  {
    slug: 'own-your-site',
    navTitle: 'Own your site',
    title: 'Own your site',
    metaTitle: 'Own your site | HostVerna',
    lede:
      'Stop renting a website you will never own. We build yours so that after a clear payoff period, the asset is yours, with no perpetual license and no hostage-taking when you want to move.',
    sections: [
      {
        heading: 'What “ownership” means here',
        body: [
          'You get the real deliverable: design, code, and a handoff where you know what you have. We are not selling a locked theme on someone else’s platform.',
          'After a set number of months, the site is yours. Hosting fees tied to “renting” the build go away. You keep a direct line to the people who built it when you need changes.',
        ],
      },
      {
        heading: 'Why it matters',
        body: [
          'Most small businesses outgrow template sites but stay stuck paying for them. Ownership aligns the investment with an asset you control, and removes the “call us to change a word” trap.',
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
      'If your site looks like a theme demo with your logo, it is not serving you. We design and build from your business, not from a one-size-fits-all layout.',
    sections: [
      {
        heading: 'Custom, not recycled',
        body: [
          'Discovery comes first: who you serve, what makes you different, and what visitors should do. Structure, copy, and visuals follow from that, not from a pre-built grid.',
          'You get performance and clarity without filler sections you did not ask for.',
        ],
      },
      {
        heading: 'When you are ready to go deeper',
        body: [
          'Our web design and development service is the natural next step if you want a full build spec and timeline.',
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
      'Off-the-shelf tools almost fit. The gap is where your team loses hours. Custom software closes it: internal tools, portals, and workflows built for your rules, not a vendor’s roadmap.',
    sections: [
      {
        heading: 'Built for how you actually work',
        body: [
          'We scope to outcomes: fewer spreadsheets, fewer handoffs, less retyping between systems. Iteration includes the people who click the buttons, so v2 is not a rewrite because nobody asked them.',
        ],
      },
      {
        heading: 'Explore the build',
        body: [
          'See how we approach custom applications, ownership of the result, and documentation you can run with.',
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
      'You should not need a computer science degree to run your business, or a 40-minute hold when something breaks. You get responsive IT grounded in your devices, network, and line-of-business apps.',
    sections: [
      {
        heading: 'Humans, not a script',
        body: [
          'Issues get triaged with context. We are not a faceless queue reading from a script. When something needs a decision or a purchase, we say so clearly.',
        ],
      },
      {
        heading: 'Stability and sanity',
        body: [
          'Security baselines, backups, and documentation you can find when you need it. Proactive monitoring where it actually helps.',
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
      'Fast load times should not require chaining yourself to a proprietary platform. We ship lean, edge-hosted sites with real ownership of the codebase: portable, documented, and yours.',
    sections: [
      {
        heading: 'Performance by design',
        body: [
          'Compiled static output and edge delivery mean visitors get a snappy experience without a bloated stack. You feel it in benchmarks and in day-to-day use.',
        ],
      },
      {
        heading: 'No platform ransom',
        body: [
          'When you own your site, you own the actual code, not a login to a black box. That freedom is part of the build, not an upsell.',
        ],
      },
    ],
  },
  {
    slug: 'customer-confirmations',
    navTitle: 'Customer confirmations',
    title: 'Customer confirmations that actually reassure',
    metaTitle: 'Customer confirmations | HostVerna',
    lede:
      'After someone submits a form, they should know their message was received—not stare at a spinner, get dumped on the homepage, or wonder if it vanished. We build confirmation experiences we would stand behind for our own clients.',
    sections: [
      {
        heading: 'On the page and in the inbox',
        body: [
          'A clear on-screen confirmation is the minimum. Where it fits your process, we align copy so the next step is obvious: what you will do, how fast, and how they can follow up if needed.',
          'That is the same bar we use when we set up sites for businesses that cannot afford to look sloppy after someone takes the time to write them.',
        ],
      },
      {
        heading: 'Why it is part of the product',
        body: [
          'Trust breaks when the UI goes silent. Confirmation messaging is not an afterthought—it is part of the conversion story and the relationship. We treat it that way in scope and in QA.',
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
      'A brochure site can still be probed for weak forms, leaked data, and sloppy defaults. We ship with a sane baseline: less attack surface, modern hosting patterns, and no mystery endpoints for visitors to poke.',
    sections: [
      {
        heading: 'What “solid” means here',
        body: [
          'Sensible protections against automated abuse on contact paths, careful handling of user input, and infrastructure choices that do not paint a target on your back.',
          'We are not selling fear—we are matching the risk to what you actually run: public forms, third-party scripts, and the reality that small sites get scanned constantly.',
        ],
      },
      {
        heading: 'How we keep it maintainable',
        body: [
          'Security that only lives in one person’s head does not survive. Builds stay understandable, dependencies stay intentional, and when something needs a server-side check, we say so plainly instead of pretending the browser can do it all.',
        ],
      },
    ],
  },
  {
    slug: 'how-we-work-together',
    navTitle: 'How we work together',
    title: 'How we work together (without pretending we run your business)',
    metaTitle: 'How we work together | HostVerna',
    lede:
      'We are not a marketing agency. We build professional web presence, credible email, and solid tech—and we help you understand how the digital world fits your business. You still steer the ship: we do our part so you can do yours.',
    sections: [
      {
        heading: 'Real guidance, honest limits',
        body: [
          'If you are not sure how any of this works, that is normal. Part of our job is to explain what to expect in plain language: what a site can and cannot do, what happens after launch, and where your effort still matters.',
          'We do not guarantee customers or revenue. Growing the business is still on you. What we can do is make you look serious, give people one clear place to learn about you, and remove the “cheap template” feeling that costs trust.',
        ],
      },
      {
        heading: 'Professional, not “growth hacks”',
        body: [
          'We care about real business email on your domain, design that makes you look established, and information architecture that holds up when someone actually reads it. That is how you look gigantic next to a bare social profile or a half-finished Google Business listing with nowhere good to send people.',
        ],
      },
      {
        heading: 'Many doors, one lobby',
        body: [
          'Think of a bowling alley: you would not expect one lane. You expect enough lanes for people to play. Your marketing touchpoints work the same way—you might mention the business on TikTok, Facebook, Instagram, in email, and on Google. Each of those is a door.',
          'What you need is one proper place where all of that traffic can land: hours, story, proof, contact, and the details people ask for. Without a real site, you still might win work—but you also might lose someone who needed a single trustworthy page and never found it.',
        ],
      },
      {
        heading: 'Why we do not lead with “conversions”',
        body: [
          'We understand how traffic and attention work online, but we are not here to sell magic funnel math. We build the credible destination; you put the energy into reputation, follow-up, and getting people to those doors in the first place. When both sides do their job, it tends to work out well.',
        ],
      },
    ],
  },
];

const bySlug = new Map(solutionPages.map((p) => [p.slug, p]));

export function getSolutionPage(slug: string): SolutionPageData | undefined {
  return bySlug.get(slug.replace(/\/$/, ''));
}

export const solutionNavItems = solutionPages.map((p) => ({
  title: p.navTitle,
  href: `/solutions/${p.slug}`,
}));
