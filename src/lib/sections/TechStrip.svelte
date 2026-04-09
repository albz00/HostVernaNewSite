<script lang="ts">
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

<section class="tech-section">
  <div class="tech-gradient-bar"></div>
  <div class="container">
    <div class="tech-header">
      <span class="badge badge-gradient">Why it performs</span>
      <h2 class="tech-title">
        The fastest site you've ever had.<br />
        <span class="gradient-text">without you lifting a finger.</span>
      </h2>
      <p class="tech-sub">
        We won't bore you with framework names. Here's what it means for your business in plain language.
      </p>
    </div>

    <div class="tech-grid">
      {#each points as p, i}
        <div class="tech-card" style="--accent: {p.accent}">
          <div class="tc-accent-line"></div>
          <div class="tc-number">{String(i + 1).padStart(2, '0')}</div>
          <h3 class="tc-heading">{p.heading}</h3>
          <p class="tc-body">{p.body}</p>
          <div class="tc-glow"></div>
        </div>
      {/each}
    </div>

    <div class="tech-callout">
      <div class="callout-gradient"></div>
      <div class="callout-content">
        <div class="callout-text">
          <span class="callout-label">The result</span>
          <p class="callout-statement">
            A site that loads instantly, ranks well, costs nothing extra to run once you own it, and doesn't depend on a subscription to keep existing.
          </p>
        </div>
        <a href="#contact" class="btn btn-white-outline">Ask us about it</a>
      </div>
    </div>
  </div>
  <div class="tech-gradient-bar bottom"></div>
</section>

<style>
  .tech-section {
    background: #0a1628;
    padding: 96px 0;
    position: relative;
    overflow: hidden;
  }

  .tech-gradient-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0369a1, #0d9488, transparent);
  }

  .tech-gradient-bar.bottom {
    top: auto;
    bottom: 0;
    background: linear-gradient(90deg, transparent, #0d9488, #0369a1, transparent);
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
    border-radius: 6px;
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
    background: linear-gradient(90deg, var(--accent), transparent);
  }

  .tc-glow {
    position: absolute;
    top: -40px;
    left: -40px;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%);
    pointer-events: none;
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
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .callout-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(3,105,161,0.18) 0%, rgba(13,148,136,0.14) 100%);
    pointer-events: none;
  }

  .callout-content {
    position: relative;
    z-index: 1;
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
    border-radius: 8px 0 8px 0;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    transition: all 0.15s ease;
    flex-shrink: 0;
    letter-spacing: 0.01em;
  }

  .btn-white-outline:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.3);
    transform: translateY(-1px);
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
