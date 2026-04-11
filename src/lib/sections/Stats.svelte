<script lang="ts">
  import { onMount } from 'svelte';

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

  let openId: string | null = null;

  function toggleStat(id: string, e: MouseEvent) {
    e.stopPropagation();
    openId = openId === id ? null : id;
  }

  function onDocClick(e: MouseEvent) {
    if (openId === null) return;
    const root = document.querySelector(`[data-stat-root="${openId}"]`);
    if (root?.contains(e.target as Node)) return;
    openId = null;
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') openId = null;
  }

  onMount(() => {
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  });

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

<svelte:window on:keydown={onKeydown} />

<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat-item" data-stat-root={stat.id}>
          <div class="stat-value gradient-text">{stat.value}</div>
          <div class="stat-label-row">
            <span class="stat-label">{stat.label}</span>
            <button
              type="button"
              class="stat-help"
              aria-label={`More about ${stat.label}`}
              aria-expanded={openId === stat.id}
              aria-controls={`stat-detail-${stat.id}`}
              id={`stat-help-${stat.id}`}
              on:click={(e) => toggleStat(stat.id, e)}
            >
              ?
            </button>
          </div>
          <div class="stat-sub">{stat.sub}</div>
          {#if stat.id === 'response'}
            <a href="/quick-contact" class="btn btn-outline-primary stat-prove-it">Prove it</a>
          {/if}
          {#if openId === stat.id}
            <div
              class="stat-popover"
              id={`stat-detail-${stat.id}`}
              role="region"
              aria-labelledby={`stat-help-${stat.id}`}
            >
              <p class="stat-popover-text">{stat.detail}</p>
            </div>
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
    overflow: visible;
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

  .stat-label-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 3px;
    flex-wrap: wrap;
  }

  .stat-label {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    font-family: 'Space Grotesk', sans-serif;
  }

  .stat-help {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid var(--border, #e2e8f0);
    background: var(--bg-subtle, #f8fafc);
    color: var(--text-muted, #64748b);
    font-size: 12px;
    font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1;
    padding: 0;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .stat-help:hover,
  .stat-help:focus-visible {
    background: var(--bg, #fff);
    color: var(--primary, #0ea5e9);
    border-color: var(--primary, #0ea5e9);
    outline: none;
  }

  .stat-popover {
    position: absolute;
    left: 50%;
    top: calc(100% - 8px);
    transform: translateX(-50%);
    z-index: 20;
    width: max-content;
    max-width: min(300px, calc(100vw - 48px));
    padding: 12px 14px;
    text-align: left;
    border-radius: 10px;
    border: 1px solid var(--border, #e2e8f0);
    background: var(--bg, #fff);
    box-shadow: 0 12px 40px rgb(15 23 42 / 0.12);
  }

  .stat-popover-text {
    margin: 0;
    font-size: 13px;
    line-height: 1.45;
    color: #334155;
    font-family: system-ui, sans-serif;
  }

  :global([data-theme='dark']) .stat-label {
    color: #f1f5f9;
  }

  :global([data-theme='dark']) .stat-help {
    border-color: rgb(51 65 85);
    background: rgb(15 23 42 / 0.8);
    color: #94a3b8;
  }

  :global([data-theme='dark']) .stat-popover {
    background: rgb(15 23 42);
    border-color: rgb(51 65 85);
    box-shadow: 0 12px 40px rgb(0 0 0 / 0.45);
  }

  :global([data-theme='dark']) .stat-popover-text {
    color: #e2e8f0;
  }

  .stat-sub {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
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
