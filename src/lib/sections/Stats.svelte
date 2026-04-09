<script lang="ts">
  const stats = [
    { value: '100+', label: 'Businesses Served', sub: '3 years and counting' },
    { value: '12+', label: 'Years Experience', sub: 'in digital services' },
    { value: '98%', label: 'Client Retention', sub: 'year over year' },
    { value: '< 4hr', label: 'Support Response', sub: 'average time' },
  ];

  const marqueeQuotes = [
    { text: '"I called on a Saturday and someone picked up. That alone sold me."', author: 'R. Patel, GridFlow' },
    { text: '"I\'ve owned my site for 8 months now. Zero hosting fees."', author: 'J. Harrow, Apex Realty' },
    { text: '"They explained my own website to me in plain English. First time that\'s happened."', author: 'L. Kwan, BrightPath Realty' },
    { text: '"We replaced 4 tools with one thing they built. It actually fits how we work."', author: 'M. Torres, NorthTide Co.' },
    { text: '"Nobody treats me like I\'m too dumb to understand my own business software."', author: 'A. Chen, Summit Digital' },
    { text: '"I was paying $300/month for a site I didn\'t own. That\'s done now."', author: 'D. Ross, Harrow & Co.' },
    { text: '"My CRM finally has actual humans behind it when something breaks."', author: 'S. Okafor, Beacon Labs' },
  ];

  const doubled = [...marqueeQuotes, ...marqueeQuotes];
</script>

<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat-item">
          <div class="stat-value gradient-text">{stat.value}</div>
          <div class="stat-label">{stat.label}</div>
          <div class="stat-sub">{stat.sub}</div>
        </div>
      {/each}
    </div>
  </div>

  <div class="marquee-wrap">
    <div class="marquee-track">
      {#each doubled as q}
        <div class="marquee-item">
          <span class="mq-text">{q.text}</span>
          <span class="mq-divider">/</span>
          <span class="mq-author">{q.author}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .stats-section {
    padding: 64px 0 0;
    background: #fff;
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    position: relative;
  }

  .stats-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0369a1 30%, #0d9488 70%, transparent);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 48px;
  }

  .stat-item {
    position: relative;
    text-align: center;
    padding: 16px 32px;
  }

  .stat-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 15%;
    height: 70%;
    width: 1px;
    background: var(--border);
  }

  .stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 3px;
    font-family: 'Space Grotesk', sans-serif;
  }

  .stat-sub {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  .marquee-wrap {
    overflow: hidden;
    border-top: 1px solid var(--border);
    background: var(--bg-subtle);
    padding: 12px 0;
  }

  .marquee-track {
    display: flex;
    gap: 0;
    width: max-content;
    animation: marquee 36s linear infinite;
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .marquee-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 32px;
    white-space: nowrap;
    border-right: 1px solid var(--border);
  }

  .mq-text {
    font-size: 13px;
    font-style: italic;
    color: #374151;
  }

  .mq-divider {
    color: #cbd5e1;
    font-size: 12px;
  }

  .mq-author {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.03em;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .stat-item:not(:last-child)::after {
      display: none;
    }
    .stat-item {
      border-bottom: 1px solid var(--border);
    }
    .stat-item:nth-child(odd) {
      border-right: 1px solid var(--border);
    }
    .stat-item:nth-last-child(1),
    .stat-item:nth-last-child(2) {
      border-bottom: none;
    }
    .stat-item {
      padding: 20px 16px;
    }
  }
</style>
