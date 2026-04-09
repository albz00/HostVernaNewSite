<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const points = [
    {
      heading: 'Sub-second load times',
      body: 'We build on a compiled, near-zero overhead runtime. Your site ships as optimized static output with no server waiting and no rendering delay. Most of our sites score 99 to 100 on performance benchmarks out of the box.',
      accent: '#0369a1',
    },
    {
      heading: 'Hosted at the edge, not on a single server',
      body: 'Your site lives on a globally distributed network. It loads from a node close to wherever your visitor is. Not a data center in Virginia serving someone in Phoenix. Fast everywhere, by default.',
      accent: '#0d9488',
    },
    {
      heading: 'No platform lock-in',
      body: 'We don\'t tie your site to a proprietary platform you can never leave. When you own your site, you own the actual codebase: portable, documented, and not dependent on us staying in business.',
      accent: '#0369a1',
    },
    {
      heading: 'Secure by architecture',
      body: 'The way we build eliminates entire categories of vulnerabilities that plague traditional CMS platforms. No database exposure to the public web. No legacy plugin ecosystem. Smaller attack surface from day one.',
      accent: '#0d9488',
    },
  ];
</script>

<section class="tech-section" id="how-we-build">
  <div class="container">
    <div class="tech-header">
      <h2 class="tech-title">
        The fastest site you've ever had.<br />
        <span class="gradient-text">without you lifting a finger.</span>
      </h2>
      <p class="tech-sub">
        We won't bore you with framework names.
        <ContentHighlight tone="string">Here's what it means for your business in plain language.</ContentHighlight>
      </p>
    </div>

    <div class="tech-grid">
      {#each points as p, i}
        <div class="tech-card" style="--accent: {p.accent}">
          <div class="tc-accent-line"></div>
          <div class="tc-number">{String(i + 1).padStart(2, '0')}</div>
          <h3 class="tc-heading">{p.heading}</h3>
          <p class="tc-body">{p.body}</p>
        </div>
      {/each}
    </div>

    <div class="tech-callout">
      <div class="callout-content">
        <div class="callout-text">
          <span class="callout-label">The result</span>
          <p class="callout-statement">
            A site that loads instantly, ranks well,
            <ContentHighlight tone="keyword">costs nothing extra to run once you own it</ContentHighlight>, and doesn't
            depend on a subscription to keep existing.
          </p>
        </div>
        <a href="/contact" class="btn btn-white-outline">Ask us about it</a>
      </div>
    </div>
  </div>
</section>

<style>
  .tech-section {
    background: #0f172a;
    padding: 80px 0;
    position: relative;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .tech-header {
    text-align: center;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .tech-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #f1f5f9;
    line-height: 1.1;
  }

  .tech-sub {
    font-size: 15px;
    color: #64748b;
    max-width: 440px;
    line-height: 1.65;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: var(--radius-tile);
    overflow: hidden;
    margin-bottom: 32px;
  }

  .tech-card {
    position: relative;
    background: #0d1f35;
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    transition: background 0.2s;
  }

  .tech-card:hover {
    background: #0f2540;
  }

  .tc-accent-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent);
    opacity: 0.85;
  }

  .tc-number {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.1em;
  }

  .tc-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #e2e8f0;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }

  .tc-body {
    font-size: 14px;
    color: #64748b;
    line-height: 1.75;
    flex: 1;
  }

  .tech-callout {
    position: relative;
    border-radius: var(--radius-tile);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
  }

  .callout-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    padding: 28px 36px;
    flex-wrap: wrap;
  }

  .callout-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .callout-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0d9488;
    opacity: 0.85;
  }

  .callout-statement {
    font-size: 15px;
    color: #cbd5e1;
    line-height: 1.65;
    max-width: 580px;
  }

  .btn-white-outline {
    display: inline-flex;
    align-items: center;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Space Grotesk', sans-serif;
    color: #e2e8f0;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: var(--radius-tile);
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    transform: translateY(0);
    transition:
      transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.2s ease,
      border-color 0.2s ease,
      filter 0.2s ease;
    flex-shrink: 0;
    letter-spacing: 0.01em;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
  }

  .btn-white-outline:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.38);
    box-shadow: 0 6px 22px rgb(0 0 0 / 0.25);
    filter: brightness(1.05);
  }

  .btn-white-outline:active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgb(0 0 0 / 0.2);
  }

  @media (max-width: 768px) {
    .tech-grid {
      grid-template-columns: 1fr;
    }
    .callout-content {
      flex-direction: column;
      align-items: flex-start;
      padding: 24px;
    }
  }
</style>
