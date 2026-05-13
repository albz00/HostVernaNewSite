<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const pillars = [
    {
      title: 'We answer the phone',
      desc: 'A real person who knows your account picks up.',
    },
    {
      title: 'We\'re not a marketing company',
      desc: 'We build useful sites and tools, not generic funnels.',
    },
    {
      title: 'You own what you paid for',
      desc: 'After a set number of months, the site transfers to you.',
    },
    {
      title: 'We guide, not overwhelm',
      desc: 'We walk you through your site until you feel comfortable.',
    },
    {
      title: 'No surprises, ever',
      desc: 'Scope, pricing, and timeline are agreed before anything starts.',
    },
    {
      title: 'Proactive communication',
      desc: 'We check in, flag issues early, and keep you updated.',
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
        You shouldn't have to become a web expert.
        <ContentHighlight tone="keyword">Here is the simple flow.</ContentHighlight>
      </p>
    </div>

    <figure class="process-figure">
      <picture>
        <source
          media="(max-width: 700px)"
          srcset="https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/79895079-829c-4848-6a7c-20b17b358a00/public"
        />
        <img
          class="process-image"
          src="https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/c20a0bfc-fb40-4b90-c639-5e816a73aa00/public"
          width="1024"
          height="341"
          alt="Four-step HostVerna process: discovery call, clear proposal, build and launch, handoff and support"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>
  </div>
</section>

<section class="section whyus-section">
  <div class="container">
    <div class="whyus-layout">
      <div class="whyus-left">
        <h2 class="section-title">Why businesses<br />stay with us</h2>
        <p class="why-sub">
          We handle the technical work without leaving you out of the loop.
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
            "They walked me through the handoff, and I knew what I owned before launch."
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

  .process-figure {
    margin: 0;
    border-radius: var(--radius-tile);
    overflow: hidden;
    background: var(--bg-subtle);
    box-shadow: var(--shadow-tile);
  }

  .process-image {
    display: block;
    width: 100%;
    height: auto;
  }

  /*
   * Process path: four steps connected by a drawn line through numbered nodes,
   * sitting above card bodies. On desktop the line runs horizontally across
   * all four; on narrow screens it flips to a vertical spine so the steps
   * read top-to-bottom instead of side-by-side.
   */

  .process-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0 24px;
    position: relative;
  }

  .process-item {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    position: relative;
    min-height: 100%;
  }

  /* Track holds the connector line + the numbered node on one row. */
  .process-track {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }

  .process-connector {
    position: absolute;
    top: 50%;
    height: 2px;
    width: 50%;
    transform: translateY(-50%);
    background: linear-gradient(
      90deg,
      rgb(3 105 161 / 0.18),
      rgb(13 148 136 / 0.35)
    );
    border-radius: 2px;
  }

  .process-connector--in {
    left: 0;
  }

  .process-connector--out {
    right: 0;
  }

  /* Hide the incoming connector on the first step and the outgoing on the last. */
  .process-item[data-step='1'] .process-connector--in,
  .process-item[data-step='4'] .process-connector--out {
    background: transparent;
  }

  /* Tint the connectors with a gradient that shifts across the path. */
  .process-item[data-step='1'] .process-connector--out,
  .process-item[data-step='2'] .process-connector--in {
    background: linear-gradient(90deg, rgb(14 165 233 / 0.45), rgb(6 182 212 / 0.5));
  }

  .process-item[data-step='2'] .process-connector--out,
  .process-item[data-step='3'] .process-connector--in {
    background: linear-gradient(90deg, rgb(6 182 212 / 0.5), rgb(20 184 166 / 0.5));
  }

  .process-item[data-step='3'] .process-connector--out,
  .process-item[data-step='4'] .process-connector--in {
    background: linear-gradient(90deg, rgb(20 184 166 / 0.5), rgb(16 185 129 / 0.5));
  }

  .process-node {
    position: relative;
    z-index: 1;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    border: 1.5px solid rgb(3 105 161 / 0.2);
    box-shadow: 0 2px 6px rgb(15 23 42 / 0.06), 0 0 0 4px var(--bg);
  }

  .process-node::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    z-index: 0;
  }

  .process-item[data-step='2'] .process-node::after {
    background: linear-gradient(135deg, #06b6d4, #0e7490);
  }

  .process-item[data-step='3'] .process-node::after {
    background: linear-gradient(135deg, #14b8a6, #0f766e);
  }

  .process-item[data-step='4'] .process-node::after {
    background: linear-gradient(135deg, #10b981, #047857);
  }

  .process-node-num {
    position: relative;
    z-index: 1;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #fff;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  /* Card body sits under the node. No hard card frame, just a subtle bed
     with a short bracket line so it reads as a moment on the path, not a
     free-standing tile. */
  .process-body {
    position: relative;
    padding: 4px 2px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .process-meta {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .process-kicker {
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #0369a1;
    opacity: 0.8;
  }

  .process-role {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    text-transform: uppercase;
    position: relative;
    padding-left: 14px;
  }

  .process-role::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 8px;
    height: 1px;
    background: currentColor;
    opacity: 0.4;
  }

  .process-item-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.025em;
    line-height: 1.25;
    margin: 0;
  }

  .process-item-desc {
    font-size: 13.5px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .process-duration {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    margin-top: 2px;
    padding: 4px 10px 4px 9px;
    border-radius: 999px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.04em;
  }

  .process-duration svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  :global([data-theme='dark']) .process-node {
    background: #0b1322;
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.35), 0 0 0 4px var(--bg);
    border-color: rgb(56 189 248 / 0.24);
  }

  :global([data-theme='dark']) .process-kicker {
    color: #7dd3fc;
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
      gap: 28px 18px;
    }

    /* Kill the horizontal rail between pairs when they wrap to two rows,
       since the line would cross empty vertical space awkwardly. */
    .process-item[data-step='2'] .process-connector--out,
    .process-item[data-step='3'] .process-connector--in {
      background: transparent;
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
    .split-header {
      margin-bottom: 34px;
    }

    .process-list {
      grid-template-columns: 1fr;
      gap: 0;
    }

    /* Flip to a vertical path: each step sits below the last, connected by
       a vertical spine that runs through the numbered nodes. */
    .process-item {
      flex-direction: row;
      align-items: stretch;
      gap: 16px;
      padding-bottom: 24px;
    }

    .process-track {
      flex-direction: column;
      width: 44px;
      height: auto;
      flex-shrink: 0;
    }

    .process-connector {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      transform: translateX(-50%);
      width: 2px;
      height: 50%;
    }

    .process-connector--in {
      top: 0;
      bottom: auto;
    }

    .process-connector--out {
      top: auto;
      bottom: 0;
    }

    .process-body {
      flex: 1;
      padding-top: 8px;
    }

    .process-meta {
      flex-wrap: wrap;
      row-gap: 4px;
    }

    .process-item-title {
      font-size: 16px;
    }

    .process-item-desc {
      font-size: 13px;
      line-height: 1.6;
    }

    .whyus-layout {
      gap: 34px;
    }

    .why-sub {
      max-width: none;
      font-size: 14.5px;
      line-height: 1.65;
    }

    .pillar {
      padding: 20px 0;
    }

    .inline-quote {
      padding: 18px 16px;
    }

    .whyus-left .btn {
      width: 100%;
    }
  }

  @media (max-width: 380px) {
    .process-item {
      gap: 12px;
    }

    .process-track {
      width: 38px;
    }

    .process-node {
      width: 38px;
      height: 38px;
    }
  }
</style>
