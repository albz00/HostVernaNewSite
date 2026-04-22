<script lang="ts">
  type Stat = {
    id: string;
    value: string;
    label: string;
    sub: string;
    detail: string;
  };

  const stats: Stat[] = [
    {
      id: 'served',
      value: '100+',
      label: 'Businesses Served',
      sub: '3 years and counting',
      detail:
        'That is around 33 businesses a year and counting, and we are growing every year.',
    },
    {
      id: 'experience',
      value: '12+',
      label: 'Years Experience',
      sub: 'in digital services',
      detail:
        'Real years of experience: Alex earned this depth across many projects like yours.',
    },
    {
      id: 'retention',
      value: '98%',
      label: 'Client Retention',
      sub: 'year over year',
      detail: 'This number is real. Our customers love us and we take care of them.',
    },
    {
      id: 'response',
      value: '< 4hr',
      label: 'Support Response',
      sub: 'average time',
      detail: 'We typically respond faster. Under four hours is the worst case.',
    },
  ];

  const marqueeQuotes = [
    {
      text: '"I called on a Saturday. I didn’t expect an answer. Someone actually picked up."',
      author: 'R. Patel',
    },
    {
      text: '"Eight months after handoff I’m not writing another check for hosting on that site. That was the point."',
      author: 'J. Harrow',
    },
    {
      text: '"They walked me through the admin once. I can change hours and photos myself. I don’t have to open a ticket for every typo."',
      author: 'L. Kwan',
    },
    {
      text: '"We had four different logins for stuff that should talk to each other. Now it’s one workflow we actually trained people on."',
      author: 'M. Torres',
    },
    {
      text: '"I’m not technical. They didn’t talk down to me when I asked basic questions. That shouldn’t be unusual, but it was."',
      author: 'A. Chen',
    },
    {
      text: '"I was at three hundred a month for something I still didn’t feel like I owned. The arrangement now is what we agreed on on paper."',
      author: 'D. Ross',
    },
    {
      text: '"When something in the CRM breaks I’m not opening a generic help desk ticket. I get a person who knows our build."',
      author: 'S. Okafor',
    },
  ];

  const doubled = [...marqueeQuotes, ...marqueeQuotes];
</script>

<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat-item">
          <div class="stat-value gradient-text">{stat.value}</div>
          <p class="stat-label">{stat.label}</p>
          <p class="stat-sub">{stat.sub}</p>
          <details class="stat-more">
            <summary class="stat-more-btn">What this means</summary>
            <p class="stat-more-text">{stat.detail}</p>
          </details>
          {#if stat.id === 'response'}
            <a href="/quick-contact" class="btn btn-outline-primary stat-prove-it">Prove it</a>
          {/if}
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
    padding: 56px 0 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 48px;
    position: relative;
    z-index: 1;
  }

  .stat-item {
    position: relative;
    text-align: center;
    padding: 16px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
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
    font-family: 'Space Grotesk', sans-serif;
    margin: 0 0 3px;
    line-height: 1.3;
  }

  .stat-sub {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
    margin: 0;
  }

  .stat-more {
    margin-top: 10px;
    width: 100%;
    max-width: 280px;
  }

  .stat-more-btn {
    list-style: none;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid var(--border, #e2e8f0);
    background: var(--bg-subtle, #f8fafc);
    color: var(--text-muted, #64748b);
    font-size: 11px;
    font-weight: 600;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .stat-more-btn::-webkit-details-marker {
    display: none;
  }

  .stat-more-btn::marker {
    content: '';
  }

  .stat-more[open] .stat-more-btn {
    background: var(--bg, #fff);
    color: var(--primary, #0ea5e9);
    border-color: var(--primary, #0ea5e9);
  }

  .stat-more-btn:hover,
  .stat-more-btn:focus-visible {
    color: var(--primary, #0ea5e9);
    border-color: rgb(14 165 233 / 0.45);
    outline: none;
  }

  .stat-more-text {
    margin: 10px 0 0;
    padding: 0 2px;
    font-size: 12.5px;
    line-height: 1.5;
    color: #334155;
    font-family: system-ui, sans-serif;
    text-align: center;
  }

  :global([data-theme='dark']) .stat-label {
    color: #f1f5f9;
  }

  :global([data-theme='dark']) .stat-more-btn {
    border-color: rgb(51 65 85);
    background: rgb(15 23 42 / 0.8);
    color: #94a3b8;
  }

  :global([data-theme='dark']) .stat-more[open] .stat-more-btn {
    background: rgb(30 41 59);
  }

  :global([data-theme='dark']) .stat-more-text {
    color: #e2e8f0;
  }

  .stat-prove-it {
    margin-top: 12px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 600;
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
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
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
      padding: 20px 16px 22px;
    }
  }
</style>
