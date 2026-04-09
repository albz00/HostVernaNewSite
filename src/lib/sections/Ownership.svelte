<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

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
      detail: 'Custom designed and developed for your business. We handle every technical detail so you can focus on your work.',
    },
    {
      step: 'You use it',
      detail: 'Your site launches. We provide onboarding, walk you through the tools, and answer every question without making you feel dumb for asking.',
    },
    {
      step: 'You own it',
      detail: 'After a set number of months, the site is yours. No more hosting fees, no subscriptions, no strings. We transfer everything.',
    },
    {
      step: 'We stay available',
      detail: 'You\'re never on your own. Updates, support, and new work are available whenever you need us, without being locked in.',
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
            <span class="fix-marker">How we fix it</span>
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
        <div class="ownership-steps">
          {#each ownership as item, i}
            <div class="own-step">
              <div class="own-step-track">
                <div class="own-dot"></div>
                {#if i < ownership.length - 1}
                  <div class="own-line"></div>
                {/if}
              </div>
              <div class="own-step-body">
                <h4 class="own-step-title">{item.step}</h4>
                <p class="own-step-detail">{item.detail}</p>
              </div>
            </div>
          {/each}
        </div>

        <div class="own-placeholder">
          <span class="ph-label">Site Ownership Transfer, Harrow & Co.</span>
        </div>
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
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    overflow: hidden;
  }

  .pain-card {
    background: var(--bg);
    padding: 28px 32px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
    transition: background 0.15s;
  }

  .pain-card:hover {
    background: #fafcff;
  }

  .pain-problem,
  .pain-solution {
    display: flex;
    flex-direction: column;
    gap: 6px;
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
    border-left: 3px solid #0369a1;
    border-radius: var(--radius-tile-quote);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
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

  .ownership-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .own-step {
    display: flex;
    gap: 16px;
    padding-bottom: 24px;
  }

  .own-step:last-child {
    padding-bottom: 0;
  }

  .own-step-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-top: 3px;
  }

  .own-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary);
    flex-shrink: 0;
  }

  .own-line {
    width: 1px;
    flex: 1;
    min-height: 28px;
    background: var(--border);
    margin-top: 4px;
  }

  .own-step-body {
    padding-bottom: 4px;
  }

  .own-step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .own-step-detail {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.65;
  }

  .own-placeholder {
    aspect-ratio: 16/9;
    background: #f1f5f9;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ph-label {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: #0369a1;
    text-align: center;
    padding: 16px;
    letter-spacing: 0.04em;
    opacity: 0.7;
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
