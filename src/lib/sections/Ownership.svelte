<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  /** 3D checkmark for “How we fix it” column (Cloudflare Images) */
  const fixCheckUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/4a6230bc-c95d-4397-d74e-279c8e028800/public';

  const painPoints = [
    {
      pain: 'Paying every month for a site you don\'t own',
      fix: 'You own it outright after a set number of months. No perpetual license. No ransom.',
    },
    {
      pain: 'Can\'t update a single word without hiring someone',
      fix: 'We hand you your site with the tools built in. Update text, images, and pages yourself, or we do it. Your call.',
    },
    {
      pain: 'Support tickets that disappear into a void',
      fix: 'You get a direct line to the team who built it. Real people, real responses.',
    },
    {
      pain: 'Your site looks like every other site in your industry',
      fix: 'We design from scratch around your business. No themes. No templates. Nothing recycled.',
    },
    {
      pain: 'You don\'t know how your own site works',
      fix: 'We walk you through everything. You\'ll know what you have, how to use it, and who to call when you don\'t.',
    },
    {
      pain: 'Hosting costs that quietly creep up year after year',
      fix: 'Once your site is paid off, the hosting fee goes with it. You\'re not renting. You own it.',
    },
  ];

  const ownership = [
    {
      step: 'We build it',
      eyebrow: 'Scope, design, and build',
      detail:
        'Custom designed and developed for your business. We handle every technical detail so you can focus on your work.',
      specifics: [
        'Information architecture and copy mapped to how you actually sell and operate, not a recycled theme.',
        'Hosting, DNS, SSL, and performance are squared away before launch so go-live isn’t a scramble.',
      ],
    },
    {
      step: 'You use it',
      eyebrow: 'Launch, training, and day-to-day use',
      detail:
        'Your site launches. We provide onboarding, walk you through the tools, and answer every question without making you feel dumb for asking.',
      specifics: [
        'Hands-on walkthroughs for updating pages, images, forms, and anything else you’ll touch.',
        'You reach the team who built it: no ticket roulette or outsourced “tier 1” script.',
      ],
    },
    {
      step: 'You own it',
      eyebrow: 'Title, assets, and hosting',
      detail:
        'After a set number of months, the site is yours. No more hosting fees, no subscriptions, no strings. We transfer everything.',
      specifics: [
        'Source code, repo or export, credentials, and documentation handed over in your name.',
        'The recurring hosting arrangement with us ends once your ownership milestone is met.',
      ],
    },
    {
      step: 'We stay available',
      eyebrow: 'Support and future work',
      detail:
        'You\'re never on your own. Updates, support, and new work are available whenever you need us, without being locked in.',
      specifics: [
        'Optional enhancements, troubleshooting, and new features when your business evolves.',
        'No mandatory retainer: you choose when to engage; we’re still the team that knows your build.',
      ],
    },
  ];
</script>

<section class="section pain-section" id="ownership">
  <div class="container">

    <div class="pain-header">
      <h2 class="pain-title">
        Built for the business owner<br />
        who has no time for this.
      </h2>
      <p class="pain-sub">
        If you've ever thought
        <ContentHighlight tone="comment">"I just want it to work and I don't want to think about it again,"</ContentHighlight>
        that's exactly who we built this for.
      </p>
    </div>

    <div class="pain-grid">
      {#each painPoints as item}
        <div class="pain-card">
          <div class="pain-problem">
            <span class="pain-marker">The problem</span>
            <p class="pain-text">{item.pain}</p>
          </div>
          <div class="pain-divider">
            <div class="divider-line-vertical"></div>
          </div>
          <div class="pain-solution">
            <div class="fix-head">
              <img
                src={fixCheckUrl}
                width="88"
                height="88"
                alt=""
                class="fix-check-img"
                loading="lazy"
                decoding="async"
              />
              <span class="fix-marker">How we fix it</span>
            </div>
            <p class="fix-text">{item.fix}</p>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>

<section class="section ownership-section">
  <div class="container">
    <div class="own-layout">
      <div class="own-left">
        <h2 class="own-title">
          You pay for it once.<br />
          Then it's yours.
        </h2>
        <p class="own-body">
          Most web agencies rent you a site and keep the keys.
          <ContentHighlight tone="accent">You pay monthly, forever, for something you never actually own.</ContentHighlight>
          We don't work that way.
        </p>
        <p class="own-body">
          We build your site. You use it. After a set number of months, ownership transfers to you, including the code, the tools, and the hosting. No more recurring fees for something you've already paid for.
        </p>
        <p class="own-body">
          You'll also have access to a simple management interface we provide so you can update your own content without needing to call us for every change. When you do need us, we're a message or call away.
        </p>
        <div class="own-callout">
          <span class="callout-label">What you get after ownership transfers</span>
          <ul class="callout-list">
            <li>Full source code and hosting access</li>
            <li>Management tools to update content yourself</li>
            <li>Documentation for everything we built</li>
            <li>Continued support, available on your terms</li>
          </ul>
        </div>
      </div>

      <div class="own-right">
        <div class="ownership-panels" aria-label="Ownership transfer steps">
          {#each ownership as item, i}
            <div class="own-panel-lift">
              <details class="own-phase" data-phase={i} open={i === 0}>
                <summary class="own-phase-summary">
                  <div class="own-phase-row">
                    <div class="own-vis" aria-hidden="true">
                      {#if i === 0}
                        <div class="ov-build">
                          <div class="ov-build-chrome">
                            <span class="ov-dot"></span>
                            <span class="ov-dot"></span>
                            <span class="ov-dot"></span>
                          </div>
                          <div class="ov-build-body">
                            <div class="ov-build-grid">
                              {#each [0, 1, 2, 3] as _}
                                <span class="ov-build-cell"></span>
                              {/each}
                            </div>
                          </div>
                        </div>
                      {:else if i === 1}
                        <div class="ov-use">
                          <div class="ov-use-fig">
                            <div class="ov-use-head"></div>
                            <div class="ov-use-body"></div>
                          </div>
                          <div class="ov-use-app">
                            <div class="ov-use-screen">
                              <span class="ov-use-bar"></span>
                              <span class="ov-use-bar short"></span>
                              <span class="ov-use-bar"></span>
                            </div>
                            <div class="ov-use-chin"></div>
                          </div>
                        </div>
                      {:else if i === 2}
                        <div class="ov-own">
                          <div class="ov-own-money">
                            <span class="ov-own-dollar">$</span>
                            <div class="ov-own-stack">
                              <span class="ov-own-line through">monthly rent</span>
                              <span class="ov-own-line strong">$0 owed</span>
                            </div>
                          </div>
                        </div>
                      {:else}
                        <div class="ov-stay">
                          <svg class="ov-stay-headset" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6 22c0-7.5 6.5-13 14-13s14 5.5 14 13"
                              stroke="currentColor"
                              stroke-width="1.75"
                              stroke-linecap="round"
                            />
                            <rect x="4" y="18" width="9" height="14" rx="3" fill="currentColor" opacity="0.2" />
                            <rect x="27" y="18" width="9" height="14" rx="3" fill="currentColor" opacity="0.2" />
                          </svg>
                          <div class="ov-stay-dots">
                            <span></span><span></span><span></span>
                          </div>
                        </div>
                      {/if}
                    </div>
                    <div class="own-phase-copy">
                      <p class="own-phase-eyebrow">{item.eyebrow}</p>
                      <h4 class="own-phase-title" id="own-step-{i}-title">{item.step}</h4>
                      <p class="own-phase-snippet">{item.detail}</p>
                    </div>
                    <span class="own-phase-chevron" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </summary>
                <div class="own-phase-expanded">
                  <p class="own-phase-detail">{item.detail}</p>
                  {#if item.specifics?.length}
                    <ul class="own-phase-bullets">
                      {#each item.specifics as line}
                        <li>{line}</li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              </details>
            </div>
          {/each}
        </div>

        <figure class="own-transfer-fig">
          <img
            class="own-transfer-img"
            src="/images/site-ownership-handshake.jpg"
            width="1400"
            height="935"
            alt="Two business people shaking hands across a table after agreeing on next steps"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="own-transfer-cap">
            Partnership and a documented handoff—clear terms, not a vague “we’ll send you a link.”
            <span class="own-transfer-lic">Photo: Unsplash (royalty-free; replace anytime).</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

<style>
  .pain-section {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .pain-header {
    text-align: center;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .pain-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    line-height: 1.12;
  }

  .pain-sub {
    font-size: 15px;
    color: #475569;
    max-width: 520px;
    line-height: 1.65;
  }

  .pain-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .pain-card {
    background: var(--bg);
    padding: 28px 32px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-tile);
    transition: box-shadow 0.22s ease;
  }

  .pain-card:hover {
    box-shadow: var(--shadow-tile-hover);
  }

  .pain-problem,
  .pain-solution {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fix-head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .fix-check-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .pain-marker {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ef4444;
    opacity: 0.7;
  }

  .pain-text {
    font-size: 13.5px;
    color: #374151;
    line-height: 1.55;
    font-weight: 500;
  }

  .pain-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .divider-line-vertical {
    width: 1px;
    min-height: 44px;
    background: var(--border);
  }

  .fix-marker {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0d9488;
    opacity: 0.8;
  }

  .fix-text {
    font-size: 13.5px;
    color: #374151;
    line-height: 1.55;
  }

  .ownership-section {
    background: var(--bg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .own-layout {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .own-left {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .own-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    line-height: 1.12;
    margin-top: 4px;
  }

  .own-body {
    font-size: 15px;
    color: #475569;
    line-height: 1.75;
  }

  .own-callout {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
    box-shadow: var(--shadow-tile);
  }

  .callout-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #0369a1;
    opacity: 0.8;
  }

  .callout-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
  }

  .callout-list li {
    font-size: 13.5px;
    color: #374151;
    line-height: 1.5;
    padding-left: 16px;
    position: relative;
  }

  .callout-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--primary);
  }

  .own-right {
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: sticky;
    top: 100px;
  }

  /*
   * Ownership steps: literal mini-scenes (build: app, use: person + UI, own: $, stay: headset).
   */
  .ownership-panels {
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 3vw, 24px);
    padding-top: 8px;
  }

  .own-panel-lift {
    position: relative;
  }

  .own-panel-lift::before,
  .own-panel-lift::after {
    content: '';
    position: absolute;
    z-index: 0;
    inset: 0;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    pointer-events: none;
    transition:
      transform 0.24s ease,
      opacity 0.24s ease;
  }

  .own-panel-lift::before {
    transform: translate(7px, 9px);
    box-shadow: var(--shadow-sm);
    opacity: 0.94;
  }

  .own-panel-lift::after {
    transform: translate(14px, 17px);
    opacity: 0.52;
    background: var(--bg);
  }

  .own-panel-lift:hover::before {
    transform: translate(5px, 6px);
    opacity: 0.88;
  }

  .own-panel-lift:hover::after {
    transform: translate(9px, 11px);
    opacity: 0.42;
  }

  @media (prefers-reduced-motion: reduce) {
    .own-panel-lift::before,
    .own-panel-lift::after {
      display: none;
    }
  }

  .own-phase {
    position: relative;
    z-index: 1;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    background: var(--bg);
    box-shadow: var(--shadow-tile-stack);
    overflow: hidden;
    transition:
      border-color 0.22s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .own-phase {
      box-shadow: var(--shadow-tile);
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }
  }

  .own-panel-lift:hover {
    z-index: 2;
  }

  .own-panel-lift:hover .own-phase {
    transform: translateY(-5px);
    border-color: rgb(3 105 161 / 0.22);
    box-shadow:
      0 2px 4px rgb(15 23 42 / 0.04),
      0 10px 28px rgb(3 105 161 / 0.1),
      0 26px 56px rgb(15 23 42 / 0.12),
      0 0 0 1px rgb(3 105 161 / 0.06);
  }

  .own-panel-lift:hover .own-phase[open] {
    border-color: rgb(3 105 161 / 0.26);
    box-shadow:
      0 4px 14px rgb(3 105 161 / 0.12),
      0 18px 44px rgb(15 23 42 / 0.11),
      0 0 0 1px rgb(3 105 161 / 0.1);
  }

  @media (prefers-reduced-motion: reduce) {
    .own-panel-lift:hover .own-phase {
      transform: none;
    }
  }

  :global([data-theme='dark']) .own-panel-lift:hover .own-phase {
    border-color: rgb(56 189 248 / 0.28);
    box-shadow:
      0 2px 6px rgb(0 0 0 / 0.35),
      0 12px 36px rgb(56 189 248 / 0.12),
      0 28px 64px rgb(0 0 0 / 0.45),
      0 0 0 1px rgb(56 189 248 / 0.12);
  }

  :global([data-theme='dark']) .own-panel-lift:hover .own-phase[open] {
    border-color: rgb(56 189 248 / 0.34);
    box-shadow:
      0 8px 24px rgb(56 189 248 / 0.14),
      0 22px 52px rgb(0 0 0 / 0.42),
      0 0 0 1px rgb(56 189 248 / 0.14);
  }

  .own-phase[open] {
    border-color: rgb(3 105 161 / 0.14);
    box-shadow: var(--shadow-tile-hover);
  }

  :global([data-theme='dark']) .own-phase {
    background: rgb(15 23 42 / 0.92);
  }

  :global([data-theme='dark']) .own-phase[open] {
    border-color: rgb(56 189 248 / 0.22);
  }

  .own-phase-summary {
    display: block;
    list-style: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .own-phase-summary::-webkit-details-marker {
    display: none;
  }

  .own-phase-summary:focus {
    outline: none;
  }

  .own-phase-summary:focus-visible {
    outline: 1px solid rgb(3 105 161 / 0.45);
    outline-offset: 2px;
    border-radius: var(--radius-tile);
  }

  :global([data-theme='dark']) .own-phase-summary:focus-visible {
    outline-color: rgb(56 189 248 / 0.45);
  }

  .own-phase-row {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    padding: 13px 14px 14px 16px;
  }

  .own-vis {
    flex-shrink: 0;
    width: 92px;
    height: 84px;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    padding: 6px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    box-shadow: 0 1px 0 rgb(255 255 255 / 0.65) inset;
  }

  :global([data-theme='dark']) .own-vis {
    background: rgb(30 41 59 / 0.5);
    box-shadow: none;
  }

  /* 0. We build it: app window + tiles */
  .ov-build {
    width: 72px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid rgb(226 232 240);
    background: #f8fafc;
  }

  :global([data-theme='dark']) .ov-build {
    border-color: rgb(51 65 85);
    background: rgb(15 23 42);
  }

  .ov-build-chrome {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 5px 8px;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
  }

  .ov-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #cbd5e1;
  }

  .ov-dot:nth-child(1) {
    background: #f87171;
  }
  .ov-dot:nth-child(2) {
    background: #fbbf24;
  }
  .ov-dot:nth-child(3) {
    background: #34d399;
  }

  .ov-build-body {
    padding: 6px 7px 7px;
    display: flex;
    justify-content: center;
  }

  .ov-build-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    width: 100%;
    max-width: 58px;
    margin: 0 auto;
  }

  .ov-build-cell {
    height: 16px;
    border-radius: 3px;
    background: linear-gradient(135deg, rgb(3 105 161 / 0.12), rgb(13 148 136 / 0.1));
    border: 1px solid rgb(3 105 161 / 0.12);
  }

  /* 1. You use it: person + app screen */
  .ov-use {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    padding: 0 2px;
  }

  .ov-use-fig {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    flex-shrink: 0;
  }

  .ov-use-head {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(180deg, #cbd5e1, #94a3b8);
    border: 1px solid rgb(148 163 184 / 0.5);
  }

  .ov-use-body {
    width: 22px;
    height: 18px;
    border-radius: 10px 10px 4px 4px;
    background: rgb(71 85 105 / 0.35);
  }

  .ov-use-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ov-use-screen {
    width: 44px;
    padding: 6px 7px;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, #0f172a, #1e293b);
    border: 1px solid rgb(51 65 85);
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .ov-use-bar {
    height: 3px;
    border-radius: 1px;
    background: rgb(56 189 248 / 0.45);
    width: 100%;
  }

  .ov-use-bar.short {
    width: 55%;
  }

  .ov-use-chin {
    width: 50px;
    height: 4px;
    border-radius: 0 0 4px 4px;
    background: #334155;
  }

  /* 2. You own it: money */
  .ov-own {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 2px;
  }

  .ov-own-money {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    line-height: 1;
    text-align: left;
  }

  .ov-own-dollar {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .ov-own-stack {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    max-width: 58px;
    flex-shrink: 0;
  }

  .ov-own-line {
    font-size: 8px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.02em;
    color: var(--text-muted);
    line-height: 1.2;
  }

  .ov-own-line.through {
    text-decoration: line-through;
    opacity: 0.65;
  }

  .ov-own-line.strong {
    font-weight: 700;
    color: var(--teal);
    font-size: 9px;
  }

  /* 3. We stay available: headset + typing dots */
  .ov-stay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    color: var(--primary);
  }

  .ov-stay-headset {
    display: block;
    width: 38px;
    height: 38px;
    margin: 0 auto;
    flex-shrink: 0;
    opacity: 0.88;
  }

  :global([data-theme='dark']) .ov-stay {
    color: #38bdf8;
  }

  .ov-stay-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .ov-stay-dots span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--teal);
    opacity: 0.55;
    animation: ov-stay-bounce 1.2s ease-in-out infinite;
  }

  .ov-stay-dots span:nth-child(2) {
    animation-delay: 0.15s;
  }
  .ov-stay-dots span:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes ov-stay-bounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.45;
    }
    50% {
      transform: translateY(-3px);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ov-stay-dots span {
      animation: none;
    }
  }

  .own-phase-copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .own-phase-eyebrow {
    margin: 0;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--text-secondary);
    line-height: 1.28;
  }

  .own-phase-title {
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16.5px;
    font-weight: 700;
    letter-spacing: -0.032em;
    line-height: 1.18;
    color: var(--text-primary);
  }

  .own-phase-snippet {
    margin: 0;
    margin-top: 1px;
    font-size: 12.75px;
    line-height: 1.52;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  .own-phase-chevron {
    flex: 0 0 26px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 4px;
    color: rgb(100 116 139 / 0.45);
    transition:
      transform 0.22s cubic-bezier(0.33, 1, 0.68, 1),
      color 0.18s ease;
  }

  .own-phase[open] .own-phase-chevron {
    transform: rotate(-180deg);
    color: rgb(3 105 161 / 0.55);
  }

  :global([data-theme='dark']) .own-phase-chevron {
    color: rgb(148 163 184 / 0.35);
  }

  :global([data-theme='dark']) .own-phase[open] .own-phase-chevron {
    color: rgb(56 189 248 / 0.65);
  }

  .own-phase-expanded {
    padding: 0 15px 14px 16px;
    border-top: 1px solid var(--border-subtle);
    background: rgb(248 250 252 / 0.55);
  }

  :global([data-theme='dark']) .own-phase-expanded {
    background: rgb(15 23 42 / 0.55);
    border-top-color: rgb(51 65 85 / 0.65);
  }

  .own-phase-detail {
    margin: 0;
    padding-top: 10px;
    font-size: 13.25px;
    line-height: 1.64;
    color: var(--text-secondary);
    max-width: 60ch;
  }

  .own-phase-bullets {
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 7px;
    max-width: 60ch;
  }

  .own-phase-bullets li {
    position: relative;
    padding-left: 14px;
    font-size: 12.5px;
    color: var(--text-muted);
    line-height: 1.55;
  }

  .own-phase-bullets li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--teal);
    opacity: 0.5;
  }

  @media (max-width: 520px) {
    .ownership-panels {
      padding-top: 4px;
    }

    .own-phase-row {
      flex-wrap: wrap;
      padding: 12px;
      gap: 11px;
    }

    .own-vis {
      width: 84px;
      height: 78px;
      padding: 5px;
    }

    .own-phase-title {
      font-size: 15.5px;
    }

    .own-phase-copy {
      flex: 1 1 calc(100% - 110px);
    }

    .own-phase-chevron {
      margin-left: auto;
    }

    .own-phase-expanded {
      padding: 0 12px 12px;
    }

    .own-phase-detail,
    .own-phase-bullets {
      max-width: none;
    }
  }

  .own-transfer-fig {
    margin: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    overflow: hidden;
    box-shadow: var(--shadow-tile);
    background: var(--bg-subtle);
  }

  .own-transfer-img {
    display: block;
    width: 100%;
    height: auto;
    vertical-align: top;
  }

  .own-transfer-cap {
    margin: 0;
    padding: 12px 14px 14px;
    font-size: 12.5px;
    line-height: 1.5;
    color: #475569;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--bg);
  }

  .own-transfer-lic {
    display: block;
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
    color: #94a3b8;
  }

  @media (max-width: 900px) {
    .pain-grid {
      grid-template-columns: 1fr;
    }

    .own-layout {
      grid-template-columns: 1fr;
      gap: 48px;
    }

    .own-right {
      position: static;
    }
  }

  @media (max-width: 600px) {
    .pain-card {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .divider-line-vertical {
      min-height: 1px;
      height: 1px;
      width: 100%;
      max-width: 140px;
      background: var(--border);
    }
  }
</style>
