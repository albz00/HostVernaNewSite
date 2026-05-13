<script lang="ts">
  import { onMount } from 'svelte';
  import ContentHighlight from '../components/ContentHighlight.svelte';

  /** LCP candidate: preloaded in index.html + fetchpriority="high" on the img */
  const founderPortraitUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/895c60d8-8b2b-4b97-96d9-add7a9432300/public';

  /** Process reel: 3D icons (Cloudflare Images) for discovery → email → site */
  const phaseIconPhoneUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/980b5974-7dc6-44e7-5cf0-d3ef7e1c2d00/public';
  const phaseIconEmailUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/054d1a3f-3ccf-4f24-9242-c12e4277ba00/public';
  const phaseIconSiteUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/6fc0be21-6272-4038-37dc-7a4327a6be00/public';

  /** Logos (Cloudflare Images); two partners are wordmarks only until assets exist */
  const trustedPartners: { name: string; logo?: string }[] = [
    {
      name: 'Apex Realty',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/60f04972-9d0d-4956-dba4-8fc50b856300/public',
    },
    {
      name: 'NorthTide Co.',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/b7f51357-985c-40fc-d9bd-e469493d7500/public',
    },
    {
      name: 'GridFlow',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/06557119-caa7-46fc-04ec-17af5ee6a600/public',
    },
    {
      name: 'Beacon Labs',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/a3a20ac0-a25f-411d-e6c8-d17b1971ac00/public',
    },
    {
      name: 'Hillcrest Builders',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/7b3fece0-f62b-4504-d3c3-83397b333200/public',
    },
    {
      name: 'Vista Moving',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/00aa7e65-bd0c-44a7-6804-e01027d48a00/public',
    },
    {
      name: 'Sweet Grass Meadows',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/7364054b-c69c-4ecb-9e2d-23836883f700/public',
    },
  ];

  /*
   * Monitor reel: cycles through 3 mock client sites. Each cycle shows the
   * full HostVerna process: brief intake → finished site with an animated
   * cursor browsing through it. All phase timings below are driven by CSS
   * keyframes synced to CYCLE_MS; bumping it re-paces everything in lockstep.
   */
  /*
   * The intake phase shows a discovery-briefing email we send from HostVerna
   * back to the client after the first call. It doubles as the pitch for
   * how we work: clear scope, an ownership line ("you own the site"), and
   * the reassurance that someone on our end actually listened.
   */
  type Brief = {
    toName: string;
    toEmail: string;
    subject: string;
    greeting: string;
    intro: string;
    objectives: string[];
    outro: string;
    signoff: string;
  };

  type GridCard = { title: string; meta: string; tag?: string };
  type ServiceCard = { title: string; blurb: string };
  type Review = { author: string; quote: string };

  type Section =
    | { kind: 'hero' }
    | {
        kind: 'grid';
        cols: number;
        eyebrow?: string;
        heading?: string;
        sub?: string;
        cards: GridCard[];
      }
    | { kind: 'services'; eyebrow?: string; heading?: string; sub?: string; cards: ServiceCard[] }
    | { kind: 'reviews'; eyebrow?: string; heading?: string; items: Review[] }
    | { kind: 'cta'; title: string; sub: string; button: string }
    | { kind: 'footer'; columns: { title: string; links: string[] }[] };

  type SitePalette = {
    bg: string;
    surface: string;
    primary: string;
    accent: string;
    text: string;
    muted: string;
  };

  type Hero = {
    title: string;
    titleEmphasis?: string;
    sub: string;
    cta: string;
  };

  type Logo = {
    mark: string;
    tag?: string;
    style: 'serif' | 'sans' | 'script';
  };

  type Site = {
    name: string;
    url: string;
    logo: Logo;
    nav: string[];
    palette: SitePalette;
    brief: Brief;
    hero: Hero;
    sections: Section[];
  };

  const sites: Site[] = [
    {
      name: 'Pacific Aviation',
      url: 'pacificaviation.com',
      logo: { mark: 'PACIFIC', tag: 'Aviation', style: 'serif' },
      nav: ['Fleet', 'Charters', 'Training', 'Contact'],
      palette: {
        bg: '#eef2f7',
        surface: '#ffffff',
        primary: '#0b2239',
        accent: '#38bdf8',
        text: '#0f172a',
        muted: '#94a3b8',
      },
      brief: {
        toName: 'Marcus Alder',
        toEmail: 'marcus@pacificaviation.com',
        subject: 'Pacific Aviation: launch scope',
        greeting: 'Hi Marcus,',
        intro: "Great call today. Scope for launch:",
        objectives: [
          'Fleet showcase + pilot bios',
          'Quote requests to dispatch',
          'Mobile-first booking',
        ],
        outro: "Site, domain, content: all yours. Preview tomorrow.",
        signoff: '- Alex, HostVerna',
      },
      hero: {
        title: 'Charter flights with',
        titleEmphasis: 'a steadier hand.',
        sub: 'West Coast private charters and type-rated pilots with 20+ years in the left seat.',
        cta: 'Request a Quote',
      },
      sections: [
        { kind: 'hero' },
        {
          kind: 'grid',
          cols: 3,
          eyebrow: 'Our Fleet',
          heading: 'Aircraft you can book today',
          sub: 'Operated and maintained in-house from Boeing Field.',
          cards: [
            { title: 'Cessna Citation X', meta: '8 seats \u00b7 3,200 nm range' },
            { title: 'King Air 350', meta: '9 seats \u00b7 1,800 nm range' },
            { title: 'Pilatus PC-12', meta: '6 seats \u00b7 1,600 nm range' },
            { title: 'Cirrus SR22', meta: '4 seats \u00b7 For training' },
            { title: 'Diamond DA40', meta: '4 seats \u00b7 For training' },
            { title: 'Piper Seminole', meta: 'Multi-engine \u00b7 Training' },
          ],
        },
        {
          kind: 'services',
          eyebrow: 'What we do',
          heading: 'Three ways we fly',
          cards: [
            { title: 'Private charter', blurb: 'Door-to-door, West Coast wide' },
            { title: 'Flight training', blurb: 'Private, instrument, commercial' },
            { title: 'Aircraft mgmt', blurb: 'We fly & maintain yours' },
          ],
        },
        {
          kind: 'cta',
          title: 'Need a lift next week?',
          sub: 'Most quotes come back within the hour.',
          button: 'Get a Quote',
        },
        {
          kind: 'footer',
          columns: [
            { title: 'Fleet', links: ['Jets', 'Turboprops', 'Trainers'] },
            { title: 'Services', links: ['Charter', 'Training', 'Mgmt'] },
            { title: 'Operations', links: ['Safety', 'Crews', 'Routes'] },
            { title: 'Contact', links: ['Boeing Field', 'Dispatch', 'Email'] },
          ],
        },
      ],
    },
    {
      name: 'Ironcrest Mechanical',
      url: 'ironcrestmech.com',
      logo: { mark: 'IRONCREST', tag: 'Mechanical Co.', style: 'sans' },
      nav: ['Services', 'Projects', 'Estimates', '24/7'],
      palette: {
        bg: '#f1f2f4',
        surface: '#ffffff',
        primary: '#27313d',
        accent: '#f97316',
        text: '#1f2937',
        muted: '#94a3b8',
      },
      brief: {
        toName: 'Dave Halverson',
        toEmail: 'dave@ironcrestmech.com',
        subject: 'Ironcrest: phase-one scope',
        greeting: 'Hi Dave,',
        intro: "Good walk-through today. Phase one:",
        objectives: [
          'Sticky 24/7 phone CTA',
          'Residential + commercial splits',
          'Online estimates to dispatch',
        ],
        outro: "Hosted under your account; take it anywhere. Estimate Thursday.",
        signoff: '- Alex, HostVerna',
      },
      hero: {
        title: '24/7 mechanical work,',
        titleEmphasis: 'done right.',
        sub: 'HVAC, plumbing, and electrical for Minneapolis/St. Paul homes and commercial buildings.',
        cta: 'Request an Estimate',
      },
      sections: [
        { kind: 'hero' },
        {
          kind: 'services',
          eyebrow: 'Trades',
          heading: 'What we fix, install, and maintain',
          cards: [
            { title: 'Heating', blurb: 'Install, repair, maintain' },
            { title: 'Cooling', blurb: 'AC tune-ups & replacements' },
            { title: 'Plumbing', blurb: 'Repipes to water heaters' },
            { title: 'Electrical', blurb: 'Panels, EV chargers, wiring' },
          ],
        },
        {
          kind: 'grid',
          cols: 3,
          eyebrow: 'Recent projects',
          heading: 'A snapshot of jobs we just wrapped',
          sub: 'Residential, commercial, and civic, Twin Cities wide.',
          cards: [
            { title: 'Riverside Plaza HVAC', meta: 'Commercial retrofit', tag: '2024' },
            { title: 'Warehouse Retrofit', meta: 'Industrial \u00b7 40,000 sq ft', tag: '2024' },
            { title: 'Uptown Apartments', meta: 'Multifamily \u00b7 120 units', tag: '2023' },
            { title: 'Capitol Building', meta: 'Civic \u00b7 HVAC upgrade', tag: '2023' },
            { title: 'North Loop Office', meta: 'Commercial \u00b7 Build-out', tag: '2023' },
            { title: 'Eagan Community Ctr.', meta: 'Civic \u00b7 Replacement', tag: '2023' },
          ],
        },
        {
          kind: 'cta',
          title: "Emergency? We're open right now.",
          sub: '24/7 dispatch across the Twin Cities.',
          button: 'Call 24/7 Line',
        },
        {
          kind: 'footer',
          columns: [
            { title: 'Services', links: ['HVAC', 'Plumbing', 'Electric'] },
            { title: 'Projects', links: ['Residential', 'Commercial', 'Civic'] },
            { title: 'Company', links: ['About', 'Crew', 'Careers'] },
            { title: 'Contact', links: ['24/7 Line', 'Estimates', 'Address'] },
          ],
        },
      ],
    },
    {
      name: 'Northline Dental',
      url: 'northlinedental.com',
      logo: { mark: 'Northline', tag: 'Dental Care', style: 'sans' },
      nav: ['Services', 'Team', 'Reviews', 'Book'],
      palette: {
        bg: '#f1f8fb',
        surface: '#ffffff',
        primary: '#0e7490',
        accent: '#10b981',
        text: '#0f172a',
        muted: '#94a3b8',
      },
      brief: {
        toName: 'Dr. Priya Rao',
        toEmail: 'priya@northlinedental.com',
        subject: 'Northline Dental: launch scope',
        greeting: 'Hi Dr. Rao,',
        intro: "Thanks for the tour today. Launch scope:",
        objectives: [
          'Two-click online booking',
          'Transparent pricing page',
          'HIPAA-friendly contact form',
        ],
        outro: "All assets under your account; site is yours. Preview Wednesday.",
        signoff: '- Alex, HostVerna',
      },
      hero: {
        title: 'Modern dentistry with',
        titleEmphasis: 'a softer touch.',
        sub: 'Same-day appointments, honest pricing, and a team that remembers you.',
        cta: 'Book an Appointment',
      },
      sections: [
        { kind: 'hero' },
        {
          kind: 'services',
          eyebrow: 'Services',
          heading: 'Care that fits your schedule',
          cards: [
            { title: 'Cleanings', blurb: 'Comfortable 30-minute visits' },
            { title: 'Whitening', blurb: 'In-office, enamel-safe' },
            { title: 'Invisalign', blurb: 'Free consult + 3D scan' },
            { title: 'Emergencies', blurb: 'Same-day urgent care' },
          ],
        },
        {
          kind: 'reviews',
          eyebrow: 'What patients say',
          heading: 'Reviews from the neighborhood',
          items: [
            { author: 'Sarah K.', quote: 'They got me in the same day.' },
            { author: 'Jamal T.', quote: 'Booking took two minutes.' },
            { author: 'Andrea R.', quote: 'Clear pricing before I sat down.' },
          ],
        },
        {
          kind: 'cta',
          title: 'New patient?',
          sub: 'Your first cleaning is on us.',
          button: 'Book Free Cleaning',
        },
        {
          kind: 'footer',
          columns: [
            { title: 'Care', links: ['Services', 'Pricing', 'Insurance'] },
            { title: 'Practice', links: ['Team', 'Office', 'Tech'] },
            { title: 'Patients', links: ['Forms', 'Reviews', 'Blog'] },
            { title: 'Visit', links: ['Book', 'Hours', 'Directions'] },
          ],
        },
      ],
    },
    {
      name: 'Town of Branford',
      url: 'branford.ma.gov',
      logo: { mark: 'BRANFORD, MA', tag: 'Official Town Site', style: 'serif' },
      nav: ['Services', 'Departments', 'News', 'Events'],
      palette: {
        bg: '#f6f4ea',
        surface: '#ffffff',
        primary: '#14532d',
        accent: '#ca8a04',
        text: '#1c1917',
        muted: '#a8a29e',
      },
      brief: {
        toName: 'Alicia Brennan, Town Clerk',
        toEmail: 'a.brennan@branford.ma.gov',
        subject: 'Town of Branford: launch scope',
        greeting: 'Dear Ms. Brennan,',
        intro: "Thanks for hosting us today. Launch scope:",
        objectives: [
          'Pay bills + file permits online',
          'WCAG 2.1 AA accessibility',
          'Emergency alerts banner',
        ],
        outro: "Hosted under the Town\u2019s account; full export anytime. Draft Friday.",
        signoff: '- Alex, HostVerna',
      },
      hero: {
        title: 'Your town,',
        titleEmphasis: 'clearly online.',
        sub: 'Pay bills, file permits, and find what you need without the runaround.',
        cta: 'Pay a Bill',
      },
      sections: [
        { kind: 'hero' },
        {
          kind: 'services',
          eyebrow: 'Online services',
          heading: 'Handle town business from home',
          cards: [
            { title: 'Permits & licenses', blurb: 'Apply, renew, and track' },
            { title: 'Bill pay', blurb: 'Water, trash, and taxes' },
            { title: 'Town meetings', blurb: 'Agendas, minutes, video' },
            { title: 'Parks & rec', blurb: 'Register for programs' },
          ],
        },
        {
          kind: 'grid',
          cols: 3,
          eyebrow: 'Directory',
          heading: 'Departments',
          sub: 'Find who handles what, and reach them directly.',
          cards: [
            { title: 'Public Works', meta: 'Roads \u00b7 Water \u00b7 Snow' },
            { title: 'Health Department', meta: 'Inspections \u00b7 Records' },
            { title: 'Police', meta: 'Non-emergency \u00b7 Records' },
            { title: 'Fire & EMS', meta: 'Permits \u00b7 Inspections' },
            { title: 'Schools', meta: 'K\u201312 \u00b7 Enrollment' },
            { title: 'Library', meta: 'Hours \u00b7 Catalog' },
          ],
        },
        {
          kind: 'cta',
          title: 'Moving to Branford?',
          sub: "Here's what you need in your first week.",
          button: 'New Resident Guide',
        },
        {
          kind: 'footer',
          columns: [
            { title: 'Services', links: ['Permits', 'Pay bills', 'Forms'] },
            { title: 'Departments', links: ['Public Works', 'Police', 'Fire'] },
            { title: 'Government', links: ['Meetings', 'Elections', 'Budget'] },
            { title: 'Contact', links: ['Town Hall', 'Hours', 'Email'] },
          ],
        },
      ],
    },
  ];

  const CYCLE_MS = 15000;
  let siteI = 0;

  $: site = sites[siteI];

  onMount(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const id = window.setInterval(() => {
      siteI = (siteI + 1) % sites.length;
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  });
</script>

<section class="hero">
  <!-- Soft brand “spots” only; no grids/maps; stays behind copy -->
  <div class="hero-spots" aria-hidden="true"></div>
  <div class="hero-dot-wave" aria-hidden="true">
    <div class="hero-grid-3d-scene">
      <div class="hero-grid-3d"></div>
    </div>
  </div>

  <div class="hero-stripe"></div>

  <div class="container hero-content">
    <div class="hero-top">
      <div class="hero-copy">
        <h1 class="hero-title">
          Your site. Your software.<br />
          <span class="gradient-text">Actually yours.</span>
        </h1>

        <p class="hero-sub">
          We design and build everything from scratch.
          <ContentHighlight tone="keyword">No templates, no locked subscriptions.</ContentHighlight>
          You <ContentHighlight tone="string">own your site outright</ContentHighlight>, get the tools to manage it, and have
          <ContentHighlight tone="comment">a team you can actually reach</ContentHighlight>.
        </p>

        <div class="hero-actions">
          <a href="/contact" class="btn btn-primary btn-lg">Get a Free Consultation</a>
          <a href="/solutions/own-your-site" class="btn btn-secondary btn-lg">How Ownership Works</a>
        </div>
      </div>

      <figure class="hero-portrait">
        <div
          class="hero-portrait-frame"
          style="--hero-portrait-mask: url({founderPortraitUrl})"
        >
          <!-- Filled masked layers behind the photo (original effect); img pulse uses drop-shadow on top -->
          <span class="hero-shock hero-shock--1" aria-hidden="true"></span>
          <span class="hero-shock hero-shock--2" aria-hidden="true"></span>
          <span class="hero-shock hero-shock--3" aria-hidden="true"></span>
          <img
            src={founderPortraitUrl}
            width="640"
            height="640"
            alt="HostVerna founder with brand logo"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            class="hero-portrait-img"
          />
        </div>
      </figure>

      <div class="hero-proof">
        <span class="proof-label">Trusted by business owners across the US</span>
        <div class="proof-list">
          {#each trustedPartners as p}
            <div class="proof-partner">
              {#if p.logo}
                <img
                  class="proof-logo"
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width="176"
                  height="52"
                  loading="lazy"
                  decoding="async"
                />
              {:else}
                <span class="proof-brand">{p.name}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="hero-visual-row">
      <div class="hero-mock-stack">
      <div class="hero-mockup" aria-label="Site showcase preview">
        <div class="mockup-bar">
          <div class="browser-controls" aria-hidden="true">
            <button class="browser-btn" type="button" tabindex="-1" disabled>
              <svg viewBox="0 0 16 16" width="11" height="11"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="browser-btn" type="button" tabindex="-1" disabled>
              <svg viewBox="0 0 16 16" width="11" height="11"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="browser-btn" type="button" tabindex="-1" disabled>
              <svg viewBox="0 0 16 16" width="11" height="11"><path d="M3 8a5 5 0 1 1 1.6 3.66M3 12v-2.5h2.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="browser-address" aria-hidden="true">
            <svg class="browser-lock" viewBox="0 0 16 16" width="9" height="9"><path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v6h-9z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {#key siteI}
              <span class="browser-url">{site.url}</span>
            {/key}
          </div>
          <div class="browser-tab-actions" aria-hidden="true">
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
          </div>
        </div>

        <div class="mockup-screen" aria-hidden="true">
          {#key siteI}
            <div
              class="reel"
              style="--site-bg:{site.palette.bg}; --site-surface:{site.palette.surface}; --site-primary:{site.palette.primary}; --site-accent:{site.palette.accent}; --site-text:{site.palette.text}; --site-muted:{site.palette.muted};"
            >
              <!-- Phase 1: Intake, the briefing email we send after a discovery call.
                   A small process timeline sits to the left of the email showing the
                   three phases: Discovery call → Email brief → Build. -->
              <div class="reel-intake">
                <div class="phase-track" aria-hidden="true">
                  <div class="phase-node phase-node--done">
                    <span class="phase-icon">
                      <img
                        src={phaseIconPhoneUrl}
                        alt=""
                        width="26"
                        height="26"
                        class="phase-icon-img"
                        decoding="async"
                      />
                    </span>
                    <span class="phase-label">Discovery<br/>call</span>
                  </div>

                  <svg class="phase-arrow" viewBox="0 0 14 16" width="10" height="12" aria-hidden="true">
                    <path d="M7 1v12m0 0l-3.5-3.5M7 13l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <div class="phase-node phase-node--current">
                    <span class="phase-icon">
                      <img
                        src={phaseIconEmailUrl}
                        alt=""
                        width="26"
                        height="26"
                        class="phase-icon-img"
                        decoding="async"
                      />
                    </span>
                    <span class="phase-label">Email<br/>brief</span>
                  </div>

                  <svg class="phase-arrow" viewBox="0 0 14 16" width="10" height="12" aria-hidden="true">
                    <path d="M7 1v12m0 0l-3.5-3.5M7 13l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <div class="phase-node phase-node--next">
                    <span class="phase-icon">
                      <img
                        src={phaseIconSiteUrl}
                        alt=""
                        width="26"
                        height="26"
                        class="phase-icon-img"
                        decoding="async"
                      />
                    </span>
                    <span class="phase-label">Your<br/>site</span>
                  </div>
                </div>

                <div class="email-card">
                  <div class="email-toolbar">
                    <span class="email-toolbar-title">New Message</span>
                    <span class="email-toolbar-actions" aria-hidden="true">
                      <span class="email-toolbar-btn"><svg viewBox="0 0 16 16" width="9" height="9"><path d="M3 10h10M3 10L6 7M3 10l3 3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                      <span class="email-toolbar-btn"><svg viewBox="0 0 16 16" width="9" height="9"><rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span>
                      <span class="email-toolbar-btn"><svg viewBox="0 0 16 16" width="9" height="9"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></span>
                    </span>
                  </div>
                  <div class="email-headers">
                    <div class="email-row">
                      <span class="email-label">From</span>
                      <span class="email-value">
                        <span class="email-from-name">Alex Zimmerman</span>
                        <span class="email-from-addr">&lt;info@hostverna.com&gt;</span>
                      </span>
                    </div>
                    <div class="email-row">
                      <span class="email-label">To</span>
                      <span class="email-value">
                        <span class="email-from-name">{site.brief.toName}</span>
                        <span class="email-from-addr">&lt;{site.brief.toEmail}&gt;</span>
                      </span>
                    </div>
                    <div class="email-row email-row--subject">
                      <span class="email-label">Subject</span>
                      <span class="email-value email-subject">{site.brief.subject}</span>
                    </div>
                  </div>
                  <div class="email-body">
                    <p class="email-greeting">{site.brief.greeting}</p>
                    <p class="email-intro">{site.brief.intro}</p>
                    <ul class="email-list">
                      {#each site.brief.objectives as obj, oi}
                        <li style="--oi:{oi}">
                          <span class="email-bullet" aria-hidden="true"></span>
                          <span>{obj}</span>
                        </li>
                      {/each}
                    </ul>
                    <p class="email-outro">{site.brief.outro}</p>
                    <p class="email-signoff">{site.brief.signoff}</p>
                  </div>
                  <div class="email-footer">
                    <span class="email-send">
                      <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true"><path d="M1.5 8L14.5 2.5 12 14l-4-5-6.5-1z" fill="currentColor"/></svg>
                      Send
                    </span>
                    <span class="email-sent-indicator" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="9" height="9"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Sent
                    </span>
                  </div>
                </div>
              </div>

              <!-- Phase 2: Finished site that the cursor browses -->
              <div class="reel-page">
                {#each site.sections as section, sI}
                  {#if section.kind === 'hero'}
                    <div class="sec sec-hero">
                      <nav class="site-nav">
                        <span class="site-logo site-logo--{site.logo.style}">
                          <span class="site-logo-mark">{site.logo.mark}</span>
                          {#if site.logo.tag}
                            <span class="site-logo-tag">{site.logo.tag}</span>
                          {/if}
                        </span>
                        <ul class="site-nav-links">
                          {#each site.nav as link}
                            <li>{link}</li>
                          {/each}
                        </ul>
                      </nav>
                      <div class="sec-hero-body">
                        <h2 class="sec-hero-title">
                          {site.hero.title}
                          {#if site.hero.titleEmphasis}
                            <em>{site.hero.titleEmphasis}</em>
                          {/if}
                        </h2>
                        <p class="sec-hero-sub">{site.hero.sub}</p>
                        <span class="sec-hero-cta">{site.hero.cta}</span>
                      </div>
                    </div>
                  {:else if section.kind === 'grid'}
                    <div class="sec sec-grid">
                      {#if section.eyebrow || section.heading}
                        <div class="sec-head">
                          {#if section.eyebrow}
                            <span class="sec-eyebrow">{section.eyebrow}</span>
                          {/if}
                          {#if section.heading}
                            <h3 class="sec-heading">{section.heading}</h3>
                          {/if}
                          {#if section.sub}
                            <p class="sec-sub">{section.sub}</p>
                          {/if}
                        </div>
                      {/if}
                      <div class="sec-grid-body" style="--cols:{section.cols};">
                        {#each section.cards as card, gi}
                          <div class="grid-card" style="--gi:{gi}">
                            <div class="grid-card-photo" aria-hidden="true">
                              <span class="grid-card-photo-shimmer"></span>
                            </div>
                            <div class="grid-card-body">
                              <span class="grid-card-title">{card.title}</span>
                              <span class="grid-card-sub">{card.meta}</span>
                            </div>
                            {#if card.tag}
                              <span class="grid-card-tag">{card.tag}</span>
                            {/if}
                          </div>
                        {/each}
                      </div>
                    </div>
                  {:else if section.kind === 'services'}
                    <div class="sec sec-services">
                      {#if section.eyebrow || section.heading}
                        <div class="sec-head">
                          {#if section.eyebrow}
                            <span class="sec-eyebrow">{section.eyebrow}</span>
                          {/if}
                          {#if section.heading}
                            <h3 class="sec-heading">{section.heading}</h3>
                          {/if}
                          {#if section.sub}
                            <p class="sec-sub">{section.sub}</p>
                          {/if}
                        </div>
                      {/if}
                      <div class="sec-services-body" style="--count:{section.cards.length};">
                        {#each section.cards as card, ci}
                          <div class="service-card" style="--ci:{ci}">
                            <span class="service-icon" aria-hidden="true"></span>
                            <span class="service-title">{card.title}</span>
                            <span class="service-blurb">{card.blurb}</span>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {:else if section.kind === 'reviews'}
                    <div class="sec sec-reviews">
                      {#if section.eyebrow || section.heading}
                        <div class="sec-head">
                          {#if section.eyebrow}
                            <span class="sec-eyebrow">{section.eyebrow}</span>
                          {/if}
                          {#if section.heading}
                            <h3 class="sec-heading">{section.heading}</h3>
                          {/if}
                        </div>
                      {/if}
                      <div class="sec-reviews-body">
                      {#each section.items as item, ri}
                        <figure class="review-row" style="--ri:{ri}">
                          <span class="review-avatar">{item.author[0]}</span>
                          <figcaption>
                            <span class="review-stars" aria-hidden="true">
                              {#each Array.from({ length: 5 }) as _, _sI}
                                <svg
                                  class="review-star"
                                  viewBox="0 0 24 24"
                                  width="10"
                                  height="10"
                                  focusable="false"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                  />
                                </svg>
                              {/each}
                            </span>
                            <blockquote class="review-quote">&ldquo;{item.quote}&rdquo;</blockquote>
                            <span class="review-author">- {item.author}</span>
                          </figcaption>
                        </figure>
                      {/each}
                      </div>
                    </div>
                  {:else if section.kind === 'cta'}
                    <div class="sec sec-cta">
                      <div class="cta-text">
                        <h3 class="cta-title">{section.title}</h3>
                        <p class="cta-sub">{section.sub}</p>
                      </div>
                      <span class="cta-btn">{section.button}</span>
                    </div>
                  {:else if section.kind === 'footer'}
                    <div class="sec sec-footer">
                      <div class="footer-brand">
                        <span class="site-logo site-logo--{site.logo.style} site-logo--footer">
                          <span class="site-logo-mark">{site.logo.mark}</span>
                        </span>
                      </div>
                      <div class="footer-cols">
                        {#each section.columns as col, fi}
                          <div class="footer-col" style="--fi:{fi}">
                            <span class="footer-title">{col.title}</span>
                            {#each col.links as link}
                              <span class="footer-link">{link}</span>
                            {/each}
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/if}
                {/each}
              </div>

              <!-- Phase 3: Animated pointer that browses the built site -->
              <div class="reel-cursor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M5 3 L5 19 L9.2 15.5 L11.7 21 L14 20 L11.5 14.5 L17 14.2 Z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    stroke-width="1.2"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <!--
                Reel annotations + CTA: small coach-mark bubbles that pop up
                over the site explaining what the prospect is seeing. The
                final one is a real anchor so prospects can actually start
                a brief without calling.
              -->
              <div class="reel-annot reel-annot--a" aria-hidden="true">
                This could be yours, written for <em>your</em> business.
              </div>
              <div class="reel-annot reel-annot--b" aria-hidden="true">
                Own every asset. No lock-in. Ever.
              </div>
              <a
                class="reel-cta"
                href="/contact"
                aria-label="Start your brief with HostVerna"
              >
                <span class="reel-cta-label">Get a site like this</span>
                <span class="reel-cta-arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          {/key}
        </div>
      </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding-top: calc(140px + var(--hv-promo-h));
    padding-bottom: 0;
    /* visible so portrait shockwaves / drop-shadow aren’t clipped */
    overflow: visible;
    background: var(--bg);
  }

  .hero-spots {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 58% 48% at 10% 16%, rgb(3 105 161 / 0.09), transparent 58%),
      radial-gradient(ellipse 52% 44% at 92% 20%, rgb(13 148 136 / 0.075), transparent 56%),
      radial-gradient(ellipse 72% 58% at 82% 78%, rgb(3 105 161 / 0.055), transparent 62%),
      radial-gradient(ellipse 46% 40% at 18% 82%, rgb(13 148 136 / 0.065), transparent 55%),
      radial-gradient(ellipse 90% 70% at 48% 42%, rgb(3 105 161 / 0.035), transparent 68%);
  }

  /* Perspective floor grid (static, no motion) */
  .hero-dot-wave {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    -webkit-mask-image: radial-gradient(ellipse 125% 92% at 50% 14%, rgb(0 0 0 / 0.98) 0%, rgb(0 0 0 / 0.42) 48%, transparent 76%);
    mask-image: radial-gradient(ellipse 125% 92% at 50% 14%, rgb(0 0 0 / 0.98) 0%, rgb(0 0 0 / 0.42) 48%, transparent 76%);
  }

  .hero-grid-3d-scene {
    position: absolute;
    inset: 0;
    perspective: min(1200px, 140vw);
    perspective-origin: 50% 26%;
    transform-style: preserve-3d;
  }

  .hero-grid-3d {
    position: absolute;
    left: 50%;
    top: 30%;
    width: 320%;
    height: 160%;
    margin-left: -160%;
    transform-origin: 50% 0%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    background-repeat: repeat;
    /* Lines + node dots: reads as a 3D lattice receding toward the horizon */
    background-image:
      linear-gradient(to right, rgb(3 105 161 / 0.38) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(13 148 136 / 0.28) 1px, transparent 1px),
      radial-gradient(circle, rgb(3 105 161 / 0.42) 1.15px, transparent 1.75px);
    background-size: 56px 56px, 56px 56px, 56px 56px;
    background-position: 0 0, 0 0, 28px 28px;
    opacity: 0.52;
    transform: rotateX(70deg) translate3d(0, 0, -50px);
  }

  :global([data-theme='dark']) .hero-grid-3d {
    background-image:
      linear-gradient(to right, rgb(56 189 248 / 0.22) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(45 212 191 / 0.16) 1px, transparent 1px),
      radial-gradient(circle, rgb(56 189 248 / 0.28) 1.1px, transparent 1.65px);
  }

  @media (min-width: 901px) {
    .hero {
      padding-top: calc(172px + var(--hv-promo-h));
    }
  }

  .hero-stripe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border);
    pointer-events: none;
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding-bottom: 56px;
  }

  .hero > .container {
    position: relative;
    z-index: 1;
  }

  .hero-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, min(40vw, 380px));
    grid-template-rows: auto auto;
    column-gap: clamp(32px, 5.5vw, 64px);
    row-gap: 0;
    align-items: start;
  }

  .hero-copy {
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    padding-top: clamp(0px, 0.8vw, 8px);
  }

  .hero-portrait {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
    justify-self: end;
    align-self: start;
    width: 100%;
    max-width: 380px;
    /* Optical nudge: sit slightly below headline cap for balance with left column */
    margin-top: clamp(10px, 2.5vw, 28px);
    overflow: visible;
  }

  .hero-portrait-frame {
    position: relative;
    display: block;
    width: 100%;
    overflow: visible;
  }

  /*
   * Shockwaves: filled + masked shapes behind the photo (shows in transparent areas of the PNG).
   * Animated drop-shadow on the img follows the alpha silhouette so something always reads, even on a solid card.
   */
  .hero-shock {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    box-sizing: border-box;
    background: linear-gradient(135deg, rgb(3 105 161 / 0.58), rgb(13 148 136 / 0.46));
    -webkit-mask-image: var(--hero-portrait-mask);
    mask-image: var(--hero-portrait-mask);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    mask-mode: alpha;
    transform-origin: center center;
    will-change: transform, opacity;
    /* ease-out tail: smooth dissipation like fizz dying (no glitch pops) */
    animation: hero-shockwave-fill 4.25s cubic-bezier(0.2, 0.75, 0.28, 1) infinite;
  }

  .hero-shock--1 {
    animation-delay: 0s;
  }

  .hero-shock--2 {
    animation-delay: 1.42s;
    background: linear-gradient(135deg, rgb(13 148 136 / 0.5), rgb(3 105 161 / 0.38));
  }

  .hero-shock--3 {
    animation-delay: 2.84s;
    background: linear-gradient(135deg, rgb(3 105 161 / 0.42), rgb(13 148 136 / 0.34));
  }

  @keyframes hero-shockwave-fill {
    0% {
      transform: scale(1);
      opacity: 0.56;
    }
    32% {
      transform: scale(1.07);
      opacity: 0.38;
    }
    58% {
      transform: scale(1.14);
      opacity: 0.22;
    }
    /* outer expansion then fizzles out smoothly (opacity only eases down to 0) */
    72% {
      transform: scale(1.2);
      opacity: 0.1;
    }
    100% {
      transform: scale(1.24);
      opacity: 0;
    }
  }

  @keyframes hero-portrait-pulse {
    0% {
      filter: drop-shadow(0 0 0 rgb(3 105 161 / 0.55)) drop-shadow(0 0 0 rgb(13 148 136 / 0.35));
    }
    40% {
      filter: drop-shadow(0 0 12px rgb(3 105 161 / 0.22)) drop-shadow(0 0 18px rgb(13 148 136 / 0.14));
    }
    62% {
      filter: drop-shadow(0 0 18px rgb(3 105 161 / 0.12)) drop-shadow(0 0 26px rgb(13 148 136 / 0.08));
    }
    72% {
      filter: drop-shadow(0 0 20px rgb(3 105 161 / 0.07)) drop-shadow(0 0 28px rgb(13 148 136 / 0.05));
    }
    100% {
      filter: drop-shadow(0 0 26px rgb(3 105 161 / 0)) drop-shadow(0 0 36px rgb(13 148 136 / 0));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-shock {
      animation: none;
      opacity: 0;
    }

    .hero-portrait-img {
      animation: none;
    }
  }

  .hero-portrait-img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    display: block;
    animation: hero-portrait-pulse 4.25s cubic-bezier(0.2, 0.75, 0.28, 1) infinite;
    will-change: filter;
    /* No radius/shadow; asset already has hex frame; box effects read as a flat “card” */
  }

  @media (max-width: 920px) {
    .hero-top {
      grid-template-columns: 1fr;
      grid-template-rows: none;
      row-gap: 24px;
    }

    .hero-copy {
      grid-column: 1;
      grid-row: auto;
      padding-top: 0;
      order: 0;
    }

    .hero-portrait {
      grid-column: 1;
      grid-row: auto;
      justify-self: center;
      max-width: min(300px, 78vw);
      margin-top: 4px;
      order: 2;
    }

    .hero-proof {
      grid-column: 1;
      grid-row: auto;
      order: 1;
    }
  }

  .hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(44px, 7vw, 80px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--text-primary);
    margin-bottom: 20px;
  }

  .hero-sub {
    font-size: clamp(15px, 1.8vw, 18px);
    color: var(--text-secondary);
    max-width: 520px;
    margin: 0 auto 28px;
    line-height: 1.7;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  .hero-proof {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-top: clamp(28px, 4vw, 44px);
    padding-top: clamp(24px, 3.5vw, 36px);
    border-top: 1px solid rgb(226 232 240 / 0.85);
    width: 100%;
    box-sizing: border-box;
  }

  .proof-label {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
  }

  .proof-list {
    display: flex;
    gap: clamp(20px, 4vw, 36px);
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .proof-partner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
  }

  .proof-logo {
    display: block;
    height: clamp(34px, 4.2vw, 44px);
    width: auto;
    max-width: min(168px, 34vw);
    object-fit: contain;
    object-position: center;
    opacity: 0.92;
  }

  .proof-brand {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.02em;
    font-family: 'Space Grotesk', sans-serif;
  }

  :global([data-theme='dark']) .proof-logo {
    opacity: 0.88;
    filter: brightness(1.08);
  }

  :global([data-theme='dark']) .proof-brand {
    color: #cbd5e1;
  }

  .hero-visual-row {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 16px;
    align-items: flex-end;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 4px 18px 0;
  }

  /* Layered “stack” behind the dashboard mock (depth without changing palette) */
  .hero-mock-stack {
    position: relative;
    flex: 1;
    min-width: 0;
  }

  .hero-mock-stack::before,
  .hero-mock-stack::after {
    content: '';
    position: absolute;
    z-index: 0;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    pointer-events: none;
  }

  .hero-mock-stack::before {
    inset: 0;
    transform: translate(7px, 9px);
    box-shadow: var(--shadow-sm);
    opacity: 0.95;
  }

  .hero-mock-stack::after {
    inset: 0;
    transform: translate(14px, 17px);
    opacity: 0.55;
    background: var(--bg);
  }

  .hero-mockup {
    position: relative;
    z-index: 1;
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-tile-stack);
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-mock-stack::before,
    .hero-mock-stack::after {
      display: none;
    }

    .hero-mockup {
      box-shadow: var(--shadow-tile);
    }

    .reel-intake,
    .reel-cursor,
    .reel-annot {
      display: none !important;
    }

    .reel-page {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }

    .reel-cta {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }
  }

  /* ============================================================
     Monitor reel cycles through 3 mock client sites.
     Phases per 15s cycle:
       0-20%   Intake brief (client + checklist of objectives)
       20-26%  Cross-fade into the finished site
       26-90%  Cursor browses the site while page scrolls
       90-100% Fade to next site (siteI rotates via Svelte)
     ============================================================ */

  /* ---- Browser chrome (Chrome/Edge-style address bar) ---- */

  .mockup-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }

  .browser-controls {
    display: inline-flex;
    gap: 1px;
    flex-shrink: 0;
    color: #64748b;
  }

  .browser-btn {
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0;
    background: transparent;
    color: inherit;
    padding: 0;
    cursor: default;
    opacity: 0.7;
  }

  .browser-btn:disabled {
    color: #94a3b8;
    opacity: 0.7;
  }

  .browser-btn:first-child {
    color: #0f172a;
    opacity: 0.85;
  }

  .browser-address {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 24px;
    padding: 0 10px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 999px;
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    color: #0f172a;
    min-width: 0;
  }

  .browser-lock {
    color: #15803d;
    flex-shrink: 0;
  }

  .browser-url {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .browser-tab-actions {
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
    padding: 2px;
  }

  .browser-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #94a3b8;
  }

  /* ---- Screen container ---- */

  .mockup-screen {
    position: relative;
    height: 380px;
    background: #0f172a;
    overflow: hidden;
  }

  .reel {
    position: absolute;
    inset: 0;
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    color: var(--site-text, #0f172a);
  }

  /* ============================================================
     Phase 1: Intake brief, "we talk, gather your details"
     ============================================================ */

  .reel-intake {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 14px 18px;
    background:
      radial-gradient(ellipse 72% 60% at 50% 48%, rgb(30 41 59 / 0.2), transparent 72%),
      linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    opacity: 0;
    animation: reel-intake-show 15s ease forwards;
  }

  @media (max-width: 680px) {
    /* On narrow screens the phase track wouldn't fit next to the email
       without crushing it, so we collapse the track out of the layout. */
    .phase-track {
      display: none;
    }
  }

  @keyframes reel-intake-show {
    0% { opacity: 0; }
    3% { opacity: 1; }
    20% { opacity: 1; }
    26% { opacity: 0; }
    100% { opacity: 0; }
  }

  /* ---- Phase track (Discovery call → Email brief → Build) ----
     Sits to the left of the email during intake. Visualizes the process
     so prospects understand the email is step two, not a cold pitch. */

  .phase-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    flex-shrink: 0;
    width: 74px;
    opacity: 0;
    transform: translateY(10px);
    animation: email-card-in 15s cubic-bezier(0.2, 0.85, 0.3, 1) forwards;
  }

  .phase-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 2px 0;
  }

  .phase-icon {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgb(255 255 255 / 0.06);
    border: 1px solid rgb(255 255 255 / 0.14);
    box-sizing: border-box;
    overflow: hidden;
  }

  .phase-icon-img {
    width: 26px;
    height: 26px;
    object-fit: contain;
    display: block;
    pointer-events: none;
  }

  .phase-node--done .phase-icon {
    background: rgb(16 185 129 / 0.12);
    border-color: rgb(16 185 129 / 0.35);
  }

  .phase-node--current .phase-icon {
    background: var(--gradient, linear-gradient(135deg, #0369a1, #0d9488));
    border-color: rgb(255 255 255 / 0.2);
    box-shadow:
      0 0 0 3px rgb(13 148 136 / 0.22),
      0 6px 18px rgb(3 105 161 / 0.35);
    animation: phase-current-pulse 2.4s ease-in-out infinite;
  }

  @keyframes phase-current-pulse {
    0%, 100% {
      box-shadow:
        0 0 0 3px rgb(13 148 136 / 0.22),
        0 6px 18px rgb(3 105 161 / 0.35);
    }
    50% {
      box-shadow:
        0 0 0 7px rgb(13 148 136 / 0.04),
        0 6px 18px rgb(3 105 161 / 0.4);
    }
  }

  .phase-arrow {
    color: rgb(255 255 255 / 0.32);
    margin: 1px 0;
  }

  .phase-label {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgb(255 255 255 / 0.55);
    line-height: 1.25;
    text-align: center;
  }

  .phase-node--done .phase-label {
    color: rgb(255 255 255 / 0.78);
  }

  .phase-node--current .phase-label {
    color: #ffffff;
    font-weight: 700;
  }

  /* ---- Email client card ----
     Mimics a Gmail/Outlook compose window: toolbar, headers, body with a
     bulleted objectives list, and a Send button that pulses right before
     the email "sends" and the site reveals itself. */

  .email-card {
    width: 100%;
    max-width: 440px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid rgb(226 232 240 / 0.6);
    box-shadow:
      0 24px 56px rgb(0 0 0 / 0.45),
      0 0 0 1px rgb(56 189 248 / 0.1);
    overflow: hidden;
    opacity: 0;
    transform: translateY(10px);
    animation: email-card-in 15s cubic-bezier(0.2, 0.85, 0.3, 1) forwards;
  }

  @keyframes email-card-in {
    0% { opacity: 0; transform: translateY(12px) scale(0.98); }
    4% { opacity: 1; transform: translateY(0) scale(1); }
    20% { opacity: 1; transform: translateY(0) scale(1); }
    22% { opacity: 1; transform: translateY(-2px) scale(0.99); }
    26% { opacity: 0; transform: translateY(-14px) scale(0.97); }
    100% { opacity: 0; transform: translateY(-14px) scale(0.97); }
  }

  .email-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #0f172a;
    color: #ffffff;
  }

  .email-toolbar-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .email-toolbar-actions {
    display: inline-flex;
    gap: 4px;
    color: rgb(255 255 255 / 0.75);
  }

  .email-toolbar-btn {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background: rgb(255 255 255 / 0.08);
  }

  .email-headers {
    padding: 8px 12px 6px;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .email-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 10.5px;
    line-height: 1.35;
  }

  .email-label {
    flex-shrink: 0;
    width: 48px;
    font-family: 'DM Mono', monospace;
    font-size: 8.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .email-value {
    flex: 1;
    color: #0f172a;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .email-from-name {
    font-weight: 600;
  }

  .email-from-addr {
    color: #64748b;
    margin-left: 4px;
    font-size: 10px;
  }

  .email-subject {
    font-weight: 600;
  }

  .email-body {
    padding: 10px 12px 6px;
    font-family: 'Inter', sans-serif;
    font-size: 10.5px;
    line-height: 1.45;
    color: #1f2937;
  }

  .email-body p {
    margin: 0 0 6px;
    white-space: pre-line;
  }

  .email-greeting {
    font-weight: 500;
  }

  .email-list {
    list-style: none;
    margin: 0 0 8px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .email-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10.5px;
    color: #1f2937;
    opacity: 0;
    transform: translateX(-4px);
    animation: email-obj-in 15s ease forwards;
    /* Stagger: each bullet lands ~180ms after the previous, beginning once
       the email has settled (~0.9s into the cycle). */
    animation-delay: calc(0.9s + var(--oi, 0) * 0.18s);
  }

  @keyframes email-obj-in {
    0% { opacity: 0; transform: translateX(-4px); }
    2% { opacity: 1; transform: translateX(0); }
    20% { opacity: 1; transform: translateX(0); }
    26% { opacity: 0; }
    100% { opacity: 0; }
  }

  .email-bullet {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #10b981;
    flex-shrink: 0;
  }

  .email-outro {
    margin-top: 2px !important;
    padding: 4px 0 4px 10px;
    border-left: 2px solid #cbd5e1;
    color: #334155;
    font-size: 10px;
  }

  .email-signoff {
    margin-top: 2px;
    color: #475569;
  }

  .email-footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 6px 12px 10px;
    border-top: 1px solid #f1f5f9;
  }

  .email-send {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 14px;
    border-radius: 4px;
    background: #2563eb;
    color: #ffffff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
    box-shadow: 0 2px 8px rgb(37 99 235 / 0.3);
    /* Send button pulses right before the email "sends" (~18-22% of cycle) */
    animation: email-send-pulse 15s ease forwards;
  }

  @keyframes email-send-pulse {
    0%, 17% { transform: scale(1); box-shadow: 0 2px 8px rgb(37 99 235 / 0.3); }
    18% { transform: scale(1.06); box-shadow: 0 4px 18px rgb(37 99 235 / 0.6); }
    20% { transform: scale(0.94); box-shadow: 0 1px 4px rgb(37 99 235 / 0.4); }
    21% { transform: scale(1); box-shadow: 0 2px 8px rgb(37 99 235 / 0.3); }
    22% { opacity: 0; transform: scale(0.9); }
    26%, 100% { opacity: 0; transform: scale(0.9); }
  }

  .email-sent-indicator {
    position: absolute;
    right: 24px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 999px;
    background: #ecfdf5;
    color: #059669;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    opacity: 0;
    transform: scale(0.9);
    animation: email-sent-in 15s ease forwards;
  }

  @keyframes email-sent-in {
    0%, 21% { opacity: 0; transform: scale(0.9); }
    22% { opacity: 1; transform: scale(1); }
    25% { opacity: 1; transform: scale(1); }
    26% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 0; }
  }

  /* ============================================================
     Phase 2: Built site scrolls through sections while cursor browses
     Content height ~720px in a 380px viewport; translates up to -340px.
     ============================================================ */

  .reel-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: var(--site-bg, #f8fafc);
    color: var(--site-text, #0f172a);
    display: flex;
    flex-direction: column;
    opacity: 0;
    will-change: transform, opacity;
    animation:
      reel-page-show 15s ease forwards,
      reel-page-scroll 15s cubic-bezier(0.42, 0, 0.58, 1) forwards;
  }

  @keyframes reel-page-show {
    0%, 22% { opacity: 0; }
    28% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes reel-page-scroll {
    0%, 32% { transform: translateY(0); }
    /* Cursor hovers hero/nav first, then page starts scrolling under it.
       Content now totals ~780 to 820px thanks to real section headers;
       -400px brings the footer into view without clipping. */
    42% { transform: translateY(-30px); }
    52% { transform: translateY(-130px); }
    62% { transform: translateY(-230px); }
    72% { transform: translateY(-320px); }
    82% { transform: translateY(-400px); }
    92%, 100% { transform: translateY(-400px); }
  }

  .reel-page .sec {
    flex: none;
  }

  /* ---- Logo wordmarks ---- */

  .site-logo {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1;
    color: inherit;
  }

  .site-logo-mark {
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .site-logo-tag {
    font-family: 'DM Mono', monospace;
    font-size: 7px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-top: 2px;
    opacity: 0.7;
  }

  .site-logo--serif .site-logo-mark {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: 16px;
    letter-spacing: 0.08em;
  }

  .site-logo--sans .site-logo-mark {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    letter-spacing: -0.02em;
  }

  .site-logo--script .site-logo-mark {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-style: italic;
    font-size: 16px;
    letter-spacing: 0;
  }

  .site-logo--footer .site-logo-mark {
    color: rgb(255 255 255 / 0.92);
  }

  .site-logo--footer .site-logo-tag {
    color: rgb(255 255 255 / 0.6);
  }

  /* ---- Section: hero (nav + real copy + CTA) ----
     Sized like a real website hero: readable, not a splash screen. */

  .sec-hero {
    min-height: 175px;
    background:
      linear-gradient(
        165deg,
        var(--site-primary, #0f2a44) 0%,
        color-mix(in srgb, var(--site-primary, #0f2a44) 86%, #000) 100%
      );
    color: #fff;
    padding: 12px 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }

  .site-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 22px;
    color: #fff;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(255 255 255 / 0.08);
  }

  .site-nav .site-logo-mark {
    color: #fff;
    font-size: 12px;
  }

  .site-nav .site-logo-tag {
    color: rgb(255 255 255 / 0.55);
    font-size: 6.5px;
  }

  .site-nav-links {
    display: inline-flex;
    gap: 18px;
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgb(255 255 255 / 0.78);
  }

  .site-nav-links li {
    cursor: default;
  }

  .site-nav-links li:last-child {
    color: var(--site-accent, #c79d5a);
    font-weight: 600;
  }

  .sec-hero-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    max-width: 76%;
  }

  .sec-hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
    color: #fff;
  }

  .sec-hero-title em {
    font-style: normal;
    color: var(--site-accent, #c79d5a);
  }

  .sec-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 9.5px;
    line-height: 1.5;
    color: rgb(255 255 255 / 0.68);
    margin: 0;
    max-width: 92%;
  }

  .sec-hero-cta {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 2px;
    padding: 5px 11px;
    border-radius: 3px;
    background: var(--site-accent, #c79d5a);
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    cursor: default;
  }

  /* ---- Shared section header (eyebrow + heading + optional sub) ----
     Every section inside the mockup reads like a real website section:
     a small category eyebrow, a title, and an optional one-line intro.
     This is the bit that made the grid feel like real content instead
     of stand-alone tiles with gimmicky pill tags. */

  .sec-head {
    padding: 13px 18px 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    background: var(--site-bg);
  }

  .sec-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 7.5px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--site-accent, #c79d5a);
    opacity: 0.95;
  }

  .sec-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.22;
    color: var(--site-text, #0f172a);
    margin: 0;
  }

  .sec-sub {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    line-height: 1.5;
    color: var(--site-muted, #94a3b8);
    margin: 0;
    max-width: 82%;
  }

  /* ---- Section: grid (listings / projects / directory) ----
     Reads like a real "Our Fleet / Recent Projects / Departments" block:
     a titled section header, then cards with a photo slot, a title, and a
     subtitle. No price pills, no "Done" labels, just content. */

  .sec-grid {
    background: var(--site-bg);
  }

  .sec-grid-body {
    padding: 4px 18px 16px;
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
    gap: 10px;
  }

  .grid-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 9px 8px 8px;
    background: var(--site-surface, #ffffff);
    border: 1px solid rgb(148 163 184 / 0.18);
    border-radius: 5px;
    box-shadow: 0 1px 0 rgb(255 255 255 / 0.85) inset,
                0 1px 2px rgb(15 23 42 / 0.04);
    overflow: hidden;
  }

  /* Photo slot: diagonal color wash with a subtle shimmer strip so each card
     reads as having imagery, like a real project tile would. */
  .grid-card-photo {
    position: relative;
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--site-primary, #0f2a44) 74%, #000) 0%,
        color-mix(in srgb, var(--site-primary, #0f2a44) 38%, var(--site-accent, #c79d5a) 50%) 55%,
        color-mix(in srgb, var(--site-accent, #c79d5a) 80%, #fff) 100%
      );
  }

  .grid-card-photo::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 28% 22%,
        rgb(255 255 255 / 0.42),
        transparent 48%
      );
  }

  .grid-card-photo-shimmer {
    position: absolute;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    background: linear-gradient(
      115deg,
      transparent 38%,
      rgb(255 255 255 / 0.18) 48%,
      transparent 58%
    );
  }

  .grid-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .grid-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: -0.005em;
    color: var(--site-text, #0f172a);
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .grid-card-sub {
    font-family: 'Inter', sans-serif;
    font-size: 8.5px;
    color: var(--site-muted, #94a3b8);
    letter-spacing: 0.01em;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Optional year/chip tag on project cards reads as a caption, not a
     category pill or button. */
  .grid-card-tag {
    flex-shrink: 0;
    font-family: 'DM Mono', monospace;
    font-size: 7.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--site-muted, #94a3b8);
    padding: 2px 5px;
    border: 1px solid rgb(148 163 184 / 0.28);
    border-radius: 3px;
    align-self: center;
  }

  /* ---- Section: services (flat inline features, no boxes) ---- */

  .sec-services {
    background: var(--site-bg);
  }

  .sec-services-body {
    padding: 4px 18px 16px;
    display: grid;
    grid-template-columns: repeat(var(--count, 3), 1fr);
    gap: 14px;
  }

  .service-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 10px;
    border-left: 2px solid color-mix(in srgb, var(--site-primary, #0e7490) 50%, transparent);
  }

  .service-icon {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--site-accent, #10b981) 85%, transparent);
  }

  .service-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--site-text, #0f172a);
  }

  .service-blurb {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    line-height: 1.4;
    color: var(--site-muted, #94a3b8);
  }

  /* ---- Section: reviews ---- */

  .sec-reviews {
    background: var(--site-bg);
  }

  .sec-reviews-body {
    padding: 4px 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .review-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 6px 0;
    margin: 0;
    border-bottom: 1px solid rgb(148 163 184 / 0.14);
  }

  .review-row:last-child {
    border-bottom: 0;
  }

  .review-avatar {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--site-primary, #0e7490) 16%, var(--site-surface, #fff));
    color: var(--site-primary, #0e7490);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .review-row figcaption {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .review-stars {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    color: var(--site-accent, #10b981);
  }

  .review-star {
    display: block;
    flex-shrink: 0;
  }

  .review-quote {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    line-height: 1.4;
    color: var(--site-text, #0f172a);
    margin: 0;
  }

  .review-author {
    font-family: 'Inter', sans-serif;
    font-size: 8.5px;
    color: var(--site-muted, #94a3b8);
    letter-spacing: 0.01em;
  }

  /* ---- Section: CTA (restrained band, not a splash) ---- */

  .sec-cta {
    padding: 18px 22px 20px;
    background: color-mix(in srgb, var(--site-bg, #f8fafc) 60%, var(--site-primary, #0f2a44));
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border-top: 1px solid rgb(0 0 0 / 0.04);
  }

  .cta-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 2px;
    color: #fff;
  }

  .cta-sub {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    color: rgb(255 255 255 / 0.7);
    margin: 0;
  }

  .cta-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 3px;
    background: var(--site-accent, #c79d5a);
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  /* ---- Section: footer ---- */

  .sec-footer {
    padding: 14px 18px 16px;
    background: color-mix(in srgb, var(--site-text, #0f172a) 96%, #000);
    color: rgb(255 255 255 / 0.8);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgb(255 255 255 / 0.08);
  }

  .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .footer-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 2px;
  }

  .footer-link {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    color: rgb(255 255 255 / 0.5);
  }

  /* ============================================================
     Phase 3: Animated cursor browsing the page.
     Coordinates are in screen pixels (container is ~900x380).
     ============================================================ */

  /*
   * Cursor uses percentage left/top so it tracks meaningful screen regions
   * regardless of mockup width. The scale pulse (click feedback) is applied
   * via a separate keyframe animation on transform to avoid fighting with
   * position animations.
   */
  .reel-cursor {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    opacity: 0;
    pointer-events: none;
    filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.35));
    animation:
      cursor-show 15s ease forwards,
      cursor-path 15s cubic-bezier(0.5, 0, 0.5, 1) forwards;
  }

  @keyframes cursor-show {
    0%, 24% { opacity: 0; }
    28% { opacity: 1; }
    88% { opacity: 1; }
    94%, 100% { opacity: 0; }
  }

  /*
   * Cursor choreography across the 15s cycle:
   *   0-26%   waits bottom-right (intake is showing)
   *   28%     visible at bottom-right corner
   *   32%     hovering the hero CTA (left side of hero body)
   *   35%     micro-click pulse (handled by cursor-click)
   *   46%     up to a nav link
   *   54-78%  drifting over content as the page scrolls under it
   *   84%     micro-click on the CTA band button
   *   94%     drifts off-screen bottom-right
   */
  @keyframes cursor-path {
    0%, 24% { left: 82%; top: 84%; }
    28% { left: 82%; top: 84%; }
    32% { left: 28%; top: 45%; }
    38% { left: 28%; top: 45%; }
    46% { left: 75%; top: 14%; }
    54% { left: 52%; top: 68%; }
    62% { left: 36%; top: 54%; }
    70% { left: 62%; top: 46%; }
    78% { left: 50%; top: 60%; }
    84% { left: 50%; top: 60%; }
    88% { left: 50%; top: 60%; }
    96%, 100% { left: 88%; top: 92%; }
  }

  /* Scale pulses layered on top of the path translation */
  .reel-cursor svg {
    display: block;
    animation: cursor-click 15s linear forwards;
    transform-origin: 4px 4px;
  }

  @keyframes cursor-click {
    0%, 33% { transform: scale(1); }
    35% { transform: scale(0.82); }
    37% { transform: scale(1); }
    82% { transform: scale(1); }
    84% { transform: scale(0.82); }
    86% { transform: scale(1); }
    100% { transform: scale(1); }
  }

  /* ============================================================
     Reel annotations + CTA.
     Two small coach-mark bubbles pop up over the built site
     pointing out that the design is tailored to the prospect.
     The final element is the real HostVerna CTA linking to
     /contact so prospects can reach out without calling.
     ============================================================ */

  .reel-annot {
    position: absolute;
    z-index: 6;
    max-width: 220px;
    padding: 7px 11px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgb(15 23 42 / 0.08);
    box-shadow:
      0 1px 2px rgb(15 23 42 / 0.08),
      0 8px 24px rgb(15 23 42 / 0.18);
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    line-height: 1.35;
    color: #0f172a;
    opacity: 0;
    transform: translateY(4px) scale(0.96);
    pointer-events: none;
  }

  .reel-annot em {
    font-style: normal;
    font-weight: 700;
    background: var(--gradient, linear-gradient(135deg, #0369a1, #0d9488));
    -webkit-background-clip: text;
            background-clip: text;
    color: transparent;
  }

  /* Tail: a tiny triangle pointing back toward the content */
  .reel-annot::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: inherit;
    border: inherit;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg);
  }

  /* Annotation A near the hero body (appears 32-46% of cycle) */
  .reel-annot--a {
    left: 6%;
    top: 40%;
    animation: annot-a-pop 15s ease forwards;
  }

  .reel-annot--a::after {
    left: 20px;
    top: -5px;
    transform: rotate(225deg);
  }

  @keyframes annot-a-pop {
    0%, 30% { opacity: 0; transform: translateY(4px) scale(0.96); }
    33% { opacity: 1; transform: translateY(0) scale(1); }
    44% { opacity: 1; transform: translateY(0) scale(1); }
    48% { opacity: 0; transform: translateY(-2px) scale(0.97); }
    100% { opacity: 0; }
  }

  /* Annotation B near mid-content (appears 50-66% of cycle) */
  .reel-annot--b {
    right: 4%;
    top: 32%;
    animation: annot-b-pop 15s ease forwards;
  }

  .reel-annot--b::after {
    right: 22px;
    top: -5px;
    transform: rotate(225deg);
  }

  @keyframes annot-b-pop {
    0%, 50% { opacity: 0; transform: translateY(4px) scale(0.96); }
    53% { opacity: 1; transform: translateY(0) scale(1); }
    64% { opacity: 1; transform: translateY(0) scale(1); }
    68% { opacity: 0; transform: translateY(-2px) scale(0.97); }
    100% { opacity: 0; }
  }

  /* Real CTA appears late, persists, is clickable.
     Bottom-right so it doesn't block the scrolling content. */
  .reel-cta {
    position: absolute;
    right: 14px;
    bottom: 14px;
    z-index: 7;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 15px 9px 16px;
    border-radius: 999px;
    background: var(--gradient, linear-gradient(135deg, #0369a1, #0d9488));
    color: #ffffff;
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    box-shadow:
      0 2px 4px rgb(3 105 161 / 0.28),
      0 10px 28px rgb(13 148 136 / 0.24);
    opacity: 0;
    transform: translateY(6px) scale(0.96);
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
    animation: reel-cta-pop 15s ease forwards;
  }

  .reel-cta:hover {
    transform: translateY(-1px) scale(1);
    box-shadow:
      0 4px 10px rgb(3 105 161 / 0.34),
      0 14px 34px rgb(13 148 136 / 0.32);
    filter: brightness(1.05);
  }

  .reel-cta:active {
    transform: translateY(0) scale(0.98);
  }

  .reel-cta-arrow {
    display: inline-flex;
    transition: transform 0.2s ease;
  }

  .reel-cta:hover .reel-cta-arrow {
    transform: translateX(2px);
  }

  @keyframes reel-cta-pop {
    0%, 70% { opacity: 0; transform: translateY(6px) scale(0.96); }
    74% { opacity: 1; transform: translateY(0) scale(1); }
    92% { opacity: 1; transform: translateY(0) scale(1); }
    96%, 100% { opacity: 0; transform: translateY(-2px) scale(0.98); }
  }

  @media (max-width: 760px) {
    .hero {
      padding-top: calc(110px + var(--hv-promo-h));
    }

    .hero-content {
      padding-bottom: 36px;
    }

    .hero-title {
      font-size: clamp(34px, 11vw, 44px);
      line-height: 1.08;
      margin-bottom: 16px;
    }

    .hero-sub {
      font-size: 15px;
      line-height: 1.62;
      margin-bottom: 22px;
    }

    .hero-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      max-width: 340px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions .btn {
      width: 100%;
      white-space: normal;
      min-height: 48px;
    }

    .hero-proof {
      margin-top: 18px;
      padding-top: 20px;
      gap: 12px;
    }

    .proof-label {
      max-width: 260px;
      line-height: 1.45;
    }

    .proof-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px 18px;
      width: 100%;
      max-width: 360px;
    }

    .proof-logo {
      max-width: min(142px, 38vw);
      height: clamp(28px, 9vw, 38px);
    }

    .hero-visual-row {
      padding: 0 0 12px;
    }

    .hero-mock-stack::before,
    .hero-mock-stack::after {
      display: none;
    }

    .mockup-screen {
      height: clamp(280px, 76vw, 340px);
    }

    .reel-annot {
      display: none;
    }
  }

  @media (max-width: 520px) {
    .mockup-bar {
      gap: 6px;
      padding: 6px 8px;
    }

    .browser-controls {
      display: none;
    }

    .browser-address {
      height: 24px;
      padding: 0 9px;
    }

    .site-nav-links {
      gap: 8px;
      max-width: 55%;
      overflow: hidden;
      font-size: 8px;
    }

    .sec-hero {
      padding: 11px 14px 16px;
    }

    .sec-hero-body {
      max-width: 90%;
    }

    .sec-grid-body {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      padding-left: 12px;
      padding-right: 12px;
    }

    .sec-services-body {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      padding-left: 12px;
      padding-right: 12px;
    }

    .footer-cols {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .reel-cta {
      right: 10px;
      bottom: 10px;
      padding: 8px 12px;
      font-size: 10.5px;
    }
  }

  @media (max-width: 380px) {
    .hero {
      padding-top: calc(98px + var(--hv-promo-h));
    }

    .hero-title {
      font-size: 32px;
    }

    .hero-portrait {
      max-width: min(240px, 76vw);
    }
  }
</style>
