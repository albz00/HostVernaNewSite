<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  /** LCP candidate: preloaded in index.html + fetchpriority="high" on the img */
  const founderPortraitUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/895c60d8-8b2b-4b97-96d9-add7a9432300/public';

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
      name: 'Harrow & Co.',
      logo: 'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/7b3fece0-f62b-4504-d3c3-83397b333200/public',
    },
  ];

  const chartPresets: number[][] = [
    [38, 52, 44, 67, 55, 78, 62, 85, 71, 90, 76, 94],
    [22, 28, 35, 42, 48, 55, 62, 70, 78, 82, 86, 91],
    [72, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
  ];

  const chartTabLabels = ['Fees', 'Control', 'Clarity'];

  const sidebarPages = ['Overview', 'Analytics', 'Clients', 'Settings'];

  let chartTabI = 0;
  let sidebarI = 0;
  let barHover: number | null = null;
  let projHover: number | null = null;

  $: chartBars = chartPresets[chartTabI];

  /** Pain → how we fix it (mock list, not client names) */
  const painOutcomes = [
    { pain: 'Rent, never own it', fix: 'Title + code → you' },
    { pain: 'Ticket roulette', fix: 'Same team answers' },
    { pain: 'Can’t edit a word alone', fix: 'You control content' },
  ];

  const activity = [
    { label: 'Scope & price locked in writing', time: 'Before build' },
    { label: 'Walkthrough: your admin, your keys', time: 'At launch' },
    { label: 'Ownership milestone reached', time: 'On schedule' },
  ];
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
      <div class="hero-mockup" aria-label="Interactive dashboard preview">
        <div class="mockup-bar">
          <span class="mockup-url">hostverna.com/dashboard</span>
        </div>
        <div class="mockup-body">
          <div class="mockup-sidebar">
            <div class="sb-logo"></div>
            <nav class="sb-nav" aria-label="Preview navigation">
              {#each sidebarPages as label, i}
                <button
                  type="button"
                  class="snav"
                  class:active={sidebarI === i}
                  on:click={() => (sidebarI = i)}
                  aria-current={sidebarI === i ? 'page' : undefined}
                  aria-label={label}
                >
                  <span class="snav-glyph" aria-hidden="true">
                    <span class="snav-label" class:short={i % 2 === 1}></span>
                  </span>
                </button>
              {/each}
            </nav>
            <div class="sb-footer">
              <div class="sb-avatar"></div>
            </div>
          </div>
          <div class="mockup-main">
            <div class="mm-topbar">
              <span class="mm-page-title-text">{sidebarPages[sidebarI]}</span>
              <div class="mm-actions">
                <div class="mm-btn"></div>
                <div class="mm-btn filled"></div>
              </div>
            </div>

            <div class="kpi-row">
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val gradient-text">$0</span>
                  <div class="kpi-delta up">Target</div>
                </div>
                <span class="kpi-label">Rent after you own it</span>
                <div class="kpi-sparkline">
                  {#each [55, 48, 40, 32, 22, 0] as h}
                    <div class="sp-bar" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val gradient-text">1</span>
                  <div class="kpi-delta up">Direct</div>
                </div>
                <span class="kpi-label">Team you reach first</span>
                <div class="kpi-sparkline">
                  {#each [22, 22, 22, 22, 22, 22] as h}
                    <div class="sp-bar" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val" style="color:#0f172a">0</span>
                  <div class="kpi-delta neutral">Scoped</div>
                </div>
                <span class="kpi-label">Surprise invoices</span>
                <div class="kpi-sparkline">
                  {#each [48, 38, 28, 18, 8, 2] as h}
                    <div class="sp-bar alt" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val kpi-val--tight" style="color:#16a34a">You</span>
                  <div class="kpi-delta up">Ship copy</div>
                </div>
                <span class="kpi-label">Who updates the site</span>
                <div class="kpi-sparkline">
                  {#each [0, 0, 0, 0, 0, 0] as _}
                    <div class="sp-bar green" style="height: 4px"></div>
                  {/each}
                </div>
              </div>
            </div>

            <div class="chart-panel">
              <div class="cp-header">
                <div class="cp-title-block">
                  <div class="cp-title-line"></div>
                  <div class="cp-sub-line"></div>
                  <span class="cp-chart-label">{chartTabLabels[chartTabI]}</span>
                </div>
                <div class="cp-tabs" role="tablist" aria-label="Chart range">
                  {#each chartTabLabels as _, t}
                    <button
                      type="button"
                      role="tab"
                      class="cp-tab"
                      class:active={chartTabI === t}
                      aria-selected={chartTabI === t}
                      on:click={() => (chartTabI = t)}
                    ></button>
                  {/each}
                </div>
              </div>
              <div class="chart-area">
                <div class="chart-y-labels">
                  {#each ['100', '75', '50', '25'] as l}
                    <span class="cy-label">{l}</span>
                  {/each}
                </div>
                <div class="chart-bars-wrap">
                  <div class="chart-grid">
                    {#each [0,1,2,3] as _}
                      <div class="grid-line"></div>
                    {/each}
                  </div>
                  <div class="chart-bars">
                    {#each chartBars as h, i}
                    <div
                        class="bar"
                        class:highlight={i === chartBars.length - 1}
                        class:bar--hover={barHover === i}
                        style="height:{h}%"
                        on:mouseenter={() => (barHover = i)}
                        on:mouseleave={() => (barHover = null)}
                        role="presentation"
                      ></div>
                    {/each}
                  </div>
                </div>
              </div>
              <div class="chart-x-labels">
                {#each ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as m}
                  <span class="cx-label">{m}</span>
                {/each}
              </div>
            </div>

            <div class="bottom-panels">
              <div class="projects-panel">
                <div class="panel-header">
                  <div class="ph-title"></div>
                </div>
                {#each painOutcomes as row, pi}
                  <div
                    class="proj-row"
                    class:proj-row--hover={projHover === pi}
                    on:mouseenter={() => (projHover = pi)}
                    on:mouseleave={() => (projHover = null)}
                    role="presentation"
                  >
                    <div class="proj-avatar"></div>
                    <div class="proj-info">
                      <div class="proj-name">{row.pain}</div>
                      <div class="proj-type">{row.fix}</div>
                    </div>
                    <div class="proj-outcome" aria-hidden="true">→</div>
                  </div>
                {/each}
              </div>
              <div class="activity-panel">
                <div class="panel-header">
                  <div class="ph-title"></div>
                </div>
                {#each activity as a}
                  <div class="act-row">
                    <div class="act-dot"></div>
                    <div class="act-info">
                      <div class="act-label">{a.label}</div>
                      <div class="act-time">{a.time}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

          </div>
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

    .bar {
      transition: none;
    }

    .kpi:hover {
      transform: none;
    }

    .snav:active,
    .cp-tab:active {
      transform: none;
    }

    .proj-row--hover {
      transform: none;
    }
  }

  .mockup-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 9px 14px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .mockup-url {
    font-size: 10px;
    color: #94a3b8;
    margin-left: 6px;
    font-family: 'DM Mono', monospace;
    flex: 1;
  }

  .mockup-body {
    display: flex;
    height: 380px;
  }

  .mockup-sidebar {
    width: 52px;
    background: #0f172a;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sb-logo {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-tile-sm);
    background: var(--primary);
    margin: 0 auto 10px;
  }

  .sb-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .snav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 6px 4px;
    border-radius: 3px;
    cursor: pointer;
    border: none;
    background: transparent;
    font: inherit;
    width: 100%;
    color: inherit;
    transition:
      background 0.18s ease,
      transform 0.18s ease;
  }

  .snav:focus-visible {
    outline: 2px solid rgb(56 189 248 / 0.55);
    outline-offset: 1px;
  }

  .snav:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .snav.active {
    background: rgba(255, 255, 255, 0.12);
  }

  .snav:active {
    transform: scale(0.97);
  }

  .snav-glyph {
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }

  .snav-label {
    width: 24px;
    height: 3px;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.15);
    transition: background 0.18s ease;
  }

  .snav.active .snav-label {
    background: rgba(255, 255, 255, 0.42);
  }

  .snav-label.short {
    width: 16px;
  }

  .sb-footer {
    display: flex;
    justify-content: center;
    padding-top: 8px;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: auto;
  }

  .sb-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: 1.5px solid rgba(255,255,255,0.2);
  }

  .mockup-main {
    flex: 1;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    background: #f8fafc;
  }

  .mm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg);
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 8px 12px;
  }

  .mm-page-title-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
    line-height: 1.2;
    transition: opacity 0.2s ease;
  }

  .mm-actions {
    display: flex;
    gap: 5px;
  }

  .mm-btn {
    width: 40px;
    height: 20px;
    border-radius: 2px;
    background: #e2e8f0;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease,
      background 0.15s ease;
  }

  .mm-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgb(15 23 42 / 0.08);
  }

  .mm-btn.filled {
    background: var(--primary);
  }

  .mm-btn.filled:hover {
    filter: brightness(1.06);
  }

  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .kpi {
    background: var(--bg);
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
    cursor: default;
  }

  .kpi:hover {
    transform: translateY(-2px);
    border-color: rgb(3 105 161 / 0.22);
    box-shadow: 0 6px 16px rgb(15 23 42 / 0.07);
  }

  .kpi-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .kpi-val {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .kpi-val--tight {
    font-size: 13px;
    letter-spacing: -0.04em;
  }

  .kpi-delta {
    font-size: 8px;
    font-family: 'DM Mono', monospace;
    border-radius: 2px;
    padding: 1px 4px;
  }

  .kpi-delta.up {
    background: #dcfce7;
    color: #16a34a;
  }

  .kpi-delta.neutral {
    background: #f1f5f9;
    color: #64748b;
  }

  .kpi-label {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #64748b;
    letter-spacing: 0.02em;
    line-height: 1.35;
    text-transform: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 18px;
  }

  .kpi-sparkline {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 18px;
    margin-top: 5px;
  }

  .sp-bar {
    flex: 1;
    background: linear-gradient(180deg, #0369a1, #0d9488);
    border-radius: 1px 1px 0 0;
    opacity: 0.5;
    min-height: 2px;
  }

  /* Second sparkline series: cyan emphasis (same brand family as keyword/string bars) */
  .sp-bar.alt {
    background: linear-gradient(180deg, #0891b2, #0e7490);
    opacity: 0.85;
  }

  .sp-bar.green {
    background: #16a34a;
    height: 4px !important;
  }

  .chart-panel {
    background: var(--bg);
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 10px 12px 6px;
  }

  .cp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .cp-title-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cp-title-line {
    width: 80px;
    height: 6px;
    background: #0f172a;
    opacity: 0.7;
    border-radius: 1px;
  }

  .cp-sub-line {
    width: 50px;
    height: 4px;
    background: #e2e8f0;
    border-radius: 1px;
  }

  .cp-chart-label {
    font-family: 'DM Mono', monospace;
    font-size: 7px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
    margin-top: 2px;
    transition: color 0.2s ease;
  }

  .cp-tabs {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .cp-tab {
    width: 28px;
    height: 16px;
    border-radius: 2px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 0;
    cursor: pointer;
    flex-shrink: 0;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease,
      filter 0.15s ease;
  }

  .cp-tab:hover {
    border-color: rgb(3 105 161 / 0.25);
    box-shadow: 0 1px 4px rgb(15 23 42 / 0.06);
  }

  .cp-tab:focus-visible {
    outline: 2px solid rgb(3 105 161 / 0.45);
    outline-offset: 1px;
  }

  .cp-tab.active {
    background: linear-gradient(90deg, #0369a1, #0d9488);
    border-color: transparent;
    box-shadow: 0 1px 6px rgb(3 105 161 / 0.25);
  }

  .cp-tab:active {
    transform: scale(0.96);
  }

  .chart-area {
    display: flex;
    gap: 6px;
    height: 68px;
  }

  .chart-y-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 2px;
  }

  .cy-label {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #cbd5e1;
  }

  .chart-bars-wrap {
    flex: 1;
    position: relative;
  }

  .chart-grid {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }

  .grid-line {
    width: 100%;
    height: 1px;
    background: #f1f5f9;
  }

  .chart-bars {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 3px;
    align-items: flex-end;
  }

  .bar {
    position: relative;
    flex: 1;
    background: linear-gradient(180deg, rgba(3, 105, 161, 0.4), rgba(13, 148, 136, 0.3));
    border-radius: 2px 2px 0 0;
    min-height: 3px;
    cursor: crosshair;
    transform-origin: bottom center;
    transition:
      height 0.45s cubic-bezier(0.33, 1, 0.68, 1),
      transform 0.18s ease,
      filter 0.18s ease,
      opacity 0.18s ease;
  }

  .bar:hover,
  .bar.bar--hover {
    transform: scaleX(1.12);
    filter: saturate(1.15) brightness(1.05);
    z-index: 1;
  }

  .bar.highlight {
    background: linear-gradient(180deg, #0369a1, #0d9488);
    opacity: 1;
  }

  .bar.highlight.bar--hover {
    box-shadow: 0 -2px 10px rgb(3 105 161 / 0.35);
  }

  .chart-x-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
  }

  .cx-label {
    font-size: 6.5px;
    font-family: 'DM Mono', monospace;
    color: #cbd5e1;
  }

  .bottom-panels {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 8px;
    flex: 1;
  }

  .projects-panel,
  .activity-panel {
    background: var(--bg);
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
  }

  .panel-header {
    padding-bottom: 5px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 2px;
  }

  .ph-title {
    width: 60px;
    height: 5px;
    border-radius: 1px;
    background: #0f172a;
    opacity: 0.5;
  }

  .proj-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 5px;
    margin: 0 -5px;
    border-radius: 3px;
    cursor: default;
    transition:
      background 0.18s ease,
      transform 0.18s ease;
  }

  .proj-row--hover {
    background: rgb(241 245 249);
    transform: translateX(2px);
  }

  .proj-row--hover .proj-avatar {
    box-shadow: 0 0 0 1px rgb(3 105 161 / 0.15);
  }

  .proj-avatar {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
    flex-shrink: 0;
    transition: box-shadow 0.18s ease;
  }

  .proj-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .proj-name {
    font-size: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #0f172a;
  }

  .proj-type {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
  }

  .proj-outcome {
    flex-shrink: 0;
    font-size: 10px;
    font-weight: 700;
    color: #94a3b8;
    line-height: 1;
    opacity: 0.85;
  }

  .proj-row--hover .proj-outcome {
    color: #0d9488;
    opacity: 1;
  }

  .act-row {
    display: flex;
    align-items: flex-start;
    gap: 6px;
  }

  .act-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0369a1, #0d9488);
    flex-shrink: 0;
    margin-top: 3px;
  }

  .act-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .act-label {
    font-size: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #0f172a;
  }

  .act-time {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
  }

  @media (max-width: 760px) {
    .hero {
      padding-top: calc(110px + var(--hv-promo-h));
    }
  }
</style>
