<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  /** LCP candidate: preloaded in index.html + fetchpriority="high" on the img */
  const founderPortraitUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/895c60d8-8b2b-4b97-96d9-add7a9432300/public';

  const trustedBy = ['Apex Realty', 'NorthTide Co.', 'GridFlow', 'Beacon Labs', 'Harrow & Co.'];

  const chartBars = [38, 52, 44, 67, 55, 78, 62, 85, 71, 90, 76, 94];

  const projects = [
    { name: 'Apex Realty', type: 'Website', status: 'Live', uptime: '99.9%', ping: 12 },
    { name: 'GridFlow Inc.', type: 'Software', status: 'Live', uptime: '100%', ping: 8 },
    { name: 'NorthTide HVAC', type: 'Website', status: 'Live', uptime: '99.7%', ping: 24 },
  ];

  const activity = [
    { label: 'SSL renewed', time: '2m ago' },
    { label: 'Deploy pushed', time: '1h ago' },
    { label: 'Ticket closed', time: '3h ago' },
  ];
</script>

<section class="hero">
  <!-- Soft brand “spots” only; no grids/maps; stays behind copy -->
  <div class="hero-spots" aria-hidden="true"></div>

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
          {#each trustedBy as brand}
            <span class="proof-brand">{brand}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="hero-visual-row">
      <div class="hero-mockup">
        <div class="mockup-bar">
          <span class="mockup-url">hostverna.com/dashboard</span>
          <div class="mockup-bar-right">
            <div class="live-badge">
              <div class="live-dot"></div>
              <span>All systems live</span>
            </div>
          </div>
        </div>
        <div class="mockup-body">
          <div class="mockup-sidebar">
            <div class="sb-logo"></div>
            <div class="sb-nav">
              <div class="snav active">
                <div class="snav-label"></div>
              </div>
              <div class="snav">
                <div class="snav-label short"></div>
              </div>
              <div class="snav">
                <div class="snav-label"></div>
              </div>
              <div class="snav">
                <div class="snav-label short"></div>
              </div>
            </div>
            <div class="sb-footer">
              <div class="sb-avatar"></div>
            </div>
          </div>
          <div class="mockup-main">
            <div class="mm-topbar">
              <div class="mm-page-title"></div>
              <div class="mm-actions">
                <div class="mm-btn"></div>
                <div class="mm-btn filled"></div>
              </div>
            </div>

            <div class="kpi-row">
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val gradient-text">24</span>
                  <div class="kpi-delta up">+2</div>
                </div>
                <span class="kpi-label">Active Sites</span>
                <div class="kpi-sparkline">
                  {#each [30,45,38,52,44,60] as h}
                    <div class="sp-bar" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val gradient-text">99.9%</span>
                  <div class="kpi-delta up">Stable</div>
                </div>
                <span class="kpi-label">Avg Uptime</span>
                <div class="kpi-sparkline">
                  {#each [85,90,88,92,95,99] as h}
                    <div class="sp-bar" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val" style="color:#0f172a">2</span>
                  <div class="kpi-delta neutral">Open</div>
                </div>
                <span class="kpi-label">Tickets</span>
                <div class="kpi-sparkline">
                  {#each [8,5,6,3,4,2] as h}
                    <div class="sp-bar amber" style="height:{h * 10}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val" style="color:#16a34a">$0</span>
                  <div class="kpi-delta up">Saved</div>
                </div>
                <span class="kpi-label">Subscription Fees</span>
                <div class="kpi-sparkline">
                  {#each [0,0,0,0,0,0] as h}
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
                </div>
                <div class="cp-tabs">
                  <div class="cp-tab active"></div>
                  <div class="cp-tab"></div>
                  <div class="cp-tab"></div>
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
                      <div class="bar" style="height:{h}%" class:highlight={i === chartBars.length - 1}></div>
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
                {#each projects as p}
                  <div class="proj-row">
                    <div class="proj-avatar"></div>
                    <div class="proj-info">
                      <div class="proj-name">{p.name}</div>
                      <div class="proj-type">{p.type}</div>
                    </div>
                    <div class="proj-ping">{p.ping}ms</div>
                    <div class="proj-status live">{p.status}</div>
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
    gap: 28px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .proof-brand {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    letter-spacing: 0.02em;
    font-family: 'Space Grotesk', sans-serif;
  }

  .hero-visual-row {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 16px;
    align-items: flex-end;
    max-width: 980px;
    margin: 0 auto;
  }

  .hero-mockup {
    flex: 1;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
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

  .mockup-bar-right {
    display: flex;
    align-items: center;
  }

  .live-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    font-family: 'DM Mono', monospace;
    color: #0d9488;
    background: rgba(13,148,136,0.08);
    border: 1px solid rgba(13,148,136,0.18);
    border-radius: var(--radius-tile-sm);
    padding: 2px 8px;
    letter-spacing: 0.04em;
  }

  .live-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0d9488;
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
    gap: 3px;
    padding: 6px 4px;
    border-radius: 3px;
    cursor: pointer;
  }

  .snav.active {
    background: rgba(255,255,255,0.1);
  }

  .snav-label {
    width: 24px;
    height: 3px;
    border-radius: 1px;
    background: rgba(255,255,255,0.15);
  }

  .snav-label.short { width: 16px; }

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

  .mm-page-title {
    width: 90px;
    height: 8px;
    border-radius: 2px;
    background: #0f172a;
    opacity: 0.7;
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
  }

  .mm-btn.filled {
    background: var(--primary);
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
    background: var(--bg)7ed;
    color: #c2410c;
  }

  .kpi-label {
    font-size: 8px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
    letter-spacing: 0.04em;
    text-transform: uppercase;
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

  .sp-bar.amber {
    background: linear-gradient(180deg, #f59e0b, #f97316);
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

  .cp-tabs {
    display: flex;
    gap: 4px;
  }

  .cp-tab {
    width: 28px;
    height: 16px;
    border-radius: 2px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
  }

  .cp-tab.active {
    background: linear-gradient(90deg, #0369a1, #0d9488);
    border-color: transparent;
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
    flex: 1;
    background: linear-gradient(180deg, rgba(3,105,161,0.4), rgba(13,148,136,0.3));
    border-radius: 2px 2px 0 0;
    min-height: 3px;
  }

  .bar.highlight {
    background: linear-gradient(180deg, #0369a1, #0d9488);
    opacity: 1;
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
  }

  .proj-avatar {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
    flex-shrink: 0;
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

  .proj-ping {
    font-size: 7.5px;
    font-family: 'DM Mono', monospace;
    color: #64748b;
  }

  .proj-status {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    padding: 2px 5px;
    border-radius: 2px;
  }

  .proj-status.live {
    background: #dcfce7;
    color: #16a34a;
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
