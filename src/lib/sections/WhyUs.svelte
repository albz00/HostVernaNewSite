<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const steps = [
    {
      title: 'Discovery Call',
      desc: 'A focused 30-minute conversation about your business, what you need, and what\'s been frustrating you. No pitch. No pressure.',
    },
    {
      title: 'Clear Proposal',
      desc: 'You get scope, timeline, and pricing in plain language before any work starts. No moving goalposts.',
    },
    {
      title: 'Build & Launch',
      desc: 'We build it, you get check-ins along the way. When it launches, we walk you through everything so you\'re never left guessing.',
    },
    {
      title: 'Handoff & Support',
      desc: 'You leave with your site, your tools, and your documentation. We stay available without ever being required.',
    },
  ];

  const pillars = [
    {
      title: 'We answer the phone',
      desc: 'Not a ticket system. Not a chatbot. A real person who knows your account picks up. We\'re genuinely easy to get ahold of.',
    },
    {
      title: 'We\'re not a marketing company',
      desc: 'We won\'t talk you into conversion hacks or SEO packages. We build real, properly designed things that work for your specific business. Not generic funnels.',
    },
    {
      title: 'You own what you paid for',
      desc: 'After a set number of months, the site transfers to you completely. No subscriptions. No fees for something you\'ve already bought.',
    },
    {
      title: 'We guide, not overwhelm',
      desc: 'We walk you through your own site until you\'re confident. You should never feel like a stranger on your own web property.',
    },
    {
      title: 'No surprises, ever',
      desc: 'Scope, pricing, and timeline are agreed before anything starts. If something changes, we tell you immediately. No bill shock, no silent scope creep.',
    },
    {
      title: 'Proactive communication',
      desc: 'You won\'t be chasing us for updates. We check in, flag issues before they become problems, and stay in your corner without needing to be asked.',
    },
  ];
</script>

<section class="section process-section" id="use-cases">
  <div class="container">
    <div class="split-header">
      <div>
        <h2 class="section-title">A clear path, start to finish</h2>
      </div>
      <p class="split-sub">
        You shouldn't have to become a web expert to have a good website.
        <ContentHighlight tone="keyword">Here is the flow we use, without the gimmicks.</ContentHighlight>
      </p>
    </div>

    <ol class="process-list" aria-label="How we work with you">
      {#each steps as step, i}
        <li class="process-item" data-step={i + 1}>
          <div class="process-item-top">
            <span class="process-step-label">Step {i + 1} of 4</span>
            <span class="process-step-num" aria-hidden="true">{i + 1}</span>
          </div>
          <h3 class="process-item-title">{step.title}</h3>
          <p class="process-item-desc">{step.desc}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="section whyus-section">
  <div class="container">
    <div class="whyus-layout">
      <div class="whyus-left">
        <h2 class="section-title">Why businesses<br />stay with us</h2>
        <p class="why-sub">
          We built HostVerna for business owners who are too busy, too stretched, or too new to this to want to manage a tech vendor relationship. We handle it, and we do it without making you feel out of the loop.
        </p>
        <figure class="why-team-fig">
          <img
            class="why-team-img"
            src="/images/team-at-work.jpg"
            width="1400"
            height="933"
            alt="Colleagues collaborating at a table in a bright office"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="why-team-cap">
            The kind of direct, in-room collaboration we bring to a project.
            <span class="why-team-lic">Photo: Unsplash (royalty-free).</span>
          </figcaption>
        </figure>
        <a href="/contact" class="btn btn-primary">Talk to us</a>
      </div>

      <div class="whyus-right">
        {#each pillars as p}
          <div class="pillar">
            <div class="pillar-body">
              <h4 class="pillar-title">{p.title}</h4>
              <p class="pillar-desc">{p.desc}</p>
            </div>
          </div>
        {/each}

        <div class="inline-quote">
          <p class="iq-text">
            "I didn't know a thing about DNS or hosting. They walked through what we'd built in plain language, handed over access, and I left knowing what I was paying for and what I'd own. I hadn't gotten that level of clarity from anyone before."
          </p>
          <span class="iq-cite">L. Kwan</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .process-section {
    background: var(--bg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .split-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: end;
    margin-bottom: 64px;
  }

  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    line-height: 1.12;
    margin-top: 14px;
  }

  .split-sub {
    font-size: 15px;
    color: #475569;
    line-height: 1.7;
    max-width: 400px;
    align-self: end;
  }

  .process-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }

  .process-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 18px 16px 20px;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    background: var(--bg);
    box-shadow: var(--shadow-tile);
    min-height: 100%;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .process-item:hover {
    box-shadow: var(--shadow-tile-hover);
    transform: translateY(-2px);
  }

  .process-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .process-step-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .process-step-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    line-height: 1;
  }

  .process-item[data-step='1'] .process-step-num {
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
  }

  .process-item[data-step='2'] .process-step-num {
    background: linear-gradient(135deg, #06b6d4, #0e7490);
  }

  .process-item[data-step='3'] .process-step-num {
    background: linear-gradient(135deg, #14b8a6, #0f766e);
  }

  .process-item[data-step='4'] .process-step-num {
    background: linear-gradient(135deg, #10b981, #047857);
  }

  .process-item-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin: 0;
  }

  .process-item-desc {
    font-size: 13.5px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  :global([data-theme='dark']) .process-item {
    background: rgb(15 23 42 / 0.35);
    border-color: rgb(51 65 85 / 0.85);
  }

  :global([data-theme='dark']) .process-item:hover {
    border-color: rgb(71 85 105 / 0.95);
  }

  @media (prefers-reduced-motion: reduce) {
    .process-item {
      transition: none;
    }

    .process-item:hover {
      transform: none;
    }
  }

  .whyus-section {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .whyus-layout {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 80px;
    align-items: start;
  }

  .whyus-left {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 100px;
  }

  .why-sub {
    font-size: 15px;
    color: #475569;
    line-height: 1.7;
    max-width: 360px;
  }

  .why-team-fig {
    margin: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    overflow: hidden;
    box-shadow: var(--shadow-tile);
    background: var(--bg-subtle);
  }

  .why-team-img {
    display: block;
    width: 100%;
    height: auto;
    vertical-align: top;
  }

  .why-team-cap {
    margin: 0;
    padding: 10px 12px 12px;
    font-size: 12.5px;
    line-height: 1.5;
    color: #475569;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: var(--bg);
  }

  .why-team-lic {
    display: block;
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
    color: #94a3b8;
  }

  .whyus-right {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .pillar {
    padding: 24px 0;
    border-bottom: 1px solid #e2e8f0;
    transition: background 0.15s;
  }

  .pillar:first-child {
    padding-top: 0;
  }

  .pillar-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin-bottom: 5px;
  }

  .pillar-desc {
    font-size: 14px;
    color: #475569;
    line-height: 1.6;
  }

  .inline-quote {
    margin-top: 24px;
    padding: 20px 24px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-tile);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .iq-text {
    font-size: 15px;
    color: #374151;
    font-style: italic;
    line-height: 1.6;
  }

  .iq-cite {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  @media (max-width: 960px) {
    .split-header {
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 48px;
    }

    .process-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px 18px;
    }

    .whyus-layout {
      grid-template-columns: 1fr;
      gap: 48px;
    }

    .whyus-left {
      position: static;
    }
  }

  @media (max-width: 600px) {
    .process-list {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
</style>
