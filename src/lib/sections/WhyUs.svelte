<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const steps = [
    {
      title: 'Discovery Call',
      desc: 'A focused 30-minute conversation about your business, what you need, and what\'s been frustrating you. No pitch. No pressure.',
    },
    {
      title: 'Clear Proposal',
      desc: 'You get scope, timeline, and pricing in plain language before any work starts. No moving goalposts.',
    },
    {
      title: 'Build & Launch',
      desc: 'We build it, you get check-ins along the way. When it launches, we walk you through everything so you\'re never left guessing.',
    },
    {
      title: 'Handoff & Support',
      desc: 'You leave with your site, your tools, and your documentation. We stay available without ever being required.',
    },
  ];

  const pillars = [
    {
      title: 'We answer the phone',
      desc: 'Not a ticket system. Not a chatbot. A real person who knows your account picks up. We\'re genuinely easy to get ahold of.',
    },
    {
      title: 'We\'re not a marketing company',
      desc: 'We won\'t talk you into conversion hacks or SEO packages. We build real, properly designed things that work for your specific business. Not generic funnels.',
    },
    {
      title: 'You own what you paid for',
      desc: 'After a set number of months, the site transfers to you completely. No subscriptions. No fees for something you\'ve already bought.',
    },
    {
      title: 'We guide, not overwhelm',
      desc: 'We walk you through your own site until you\'re confident. You should never feel like a stranger on your own web property.',
    },
    {
      title: 'No surprises, ever',
      desc: 'Scope, pricing, and timeline are agreed before anything starts. If something changes, we tell you immediately. No bill shock, no silent scope creep.',
    },
    {
      title: 'Proactive communication',
      desc: 'You won\'t be chasing us for updates. We check in, flag issues before they become problems, and stay in your corner without needing to be asked.',
    },
  ];
</script>

<section class="section process-section" id="use-cases">
  <div class="container">
    <div class="split-header">
      <div>
        <h2 class="section-title">Simple process.<br />Real results.</h2>
      </div>
      <p class="split-sub">
        You shouldn't have to become a web expert to have a good website.
        <ContentHighlight tone="keyword">Here's how we handle the whole thing, start to finish.</ContentHighlight>
      </p>
    </div>

    <div class="process-xp-block">
      <div
        class="xp-panel"
        role="img"
        aria-label="Four-step process: full timeline complete"
      >
        <div class="xp-strip-head">
          <span class="xp-strip-title">Timeline</span>
          <span class="xp-strip-meta">4 / 4</span>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar-glow" aria-hidden="true"></div>
          <div class="xp-bar-fill" aria-hidden="true"></div>
          <div class="xp-bar-cells">
            {#each steps as _}
              <div class="xp-cell"></div>
            {/each}
          </div>
        </div>
        <div class="xp-ruler" aria-hidden="true">
          {#each steps as _, i}
            <span class="xp-ruler-num">{String(i + 1).padStart(2, '0')}</span>
          {/each}
        </div>
      </div>

      <div class="process-journey" role="list">
        {#each steps as step, i}
          <article class="process-stop" role="listitem" data-stage={i + 1}>
            <div class="process-card">
              <div class="process-card-accent" aria-hidden="true"></div>
              <div class="process-card-hud">
                <span class="process-stage-id">Stage {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 class="step-title">{step.title}</h3>
              <p class="step-desc">{step.desc}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="section whyus-section">
  <div class="container">
    <div class="whyus-layout">
      <div class="whyus-left">
        <h2 class="section-title">Why businesses<br />stay with us</h2>
        <p class="why-sub">
          We built HostVerna for business owners who are too busy, too stretched, or too new to this to want to manage a tech vendor relationship. We handle it, and we do it without making you feel out of the loop.
        </p>
        <div class="why-image-placeholder">
          <span class="ph-label">Team at Work, HostVerna HQ</span>
        </div>
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
            "I didn't know a thing about DNS or hosting. They walked through what we'd built in plain language, handed over access, and I left knowing what I was paying for and what I'd own. I hadn't gotten that level of clarity from anyone before."
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

  .process-xp-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .xp-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
  }

  .xp-strip-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 2px;
  }

  .xp-strip-title {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .xp-strip-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 999px;
    background: rgb(241 245 249);
    border: 1px solid var(--border);
  }

  .xp-bar-wrap {
    position: relative;
    height: 11px;
    border-radius: 999px;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgb(255 255 255 / 0.85) 0%,
      rgb(226 232 240 / 0.9) 100%
    );
    border: 1px solid rgb(203 213 225 / 0.85);
    box-shadow:
      0 1px 0 rgb(255 255 255 / 0.9) inset,
      0 10px 28px rgb(15 23 42 / 0.06);
  }

  .xp-bar-glow {
    position: absolute;
    inset: -6px -4px -4px;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      rgb(3 105 161 / 0.12) 0%,
      rgb(13 148 136 / 0.14) 50%,
      rgb(16 185 129 / 0.1) 100%
    );
    filter: blur(12px);
    opacity: 0.85;
    z-index: 0;
    pointer-events: none;
    animation: xp-glow-breathe 5s ease-in-out infinite;
  }

  @keyframes xp-glow-breathe {
    0%,
    100% {
      opacity: 0.65;
    }
    50% {
      opacity: 0.95;
    }
  }

  .xp-bar-fill {
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      #0ea5e9 0%,
      #0284c7 18%,
      #0d9488 52%,
      #10b981 100%
    );
    box-shadow:
      0 1px 0 rgb(255 255 255 / 0.35) inset,
      inset 0 -1px 0 rgb(0 0 0 / 0.08);
  }

  .xp-bar-cells {
    position: absolute;
    inset: 1px;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-radius: inherit;
    overflow: hidden;
  }

  .xp-cell {
    min-width: 0;
    border-right: 1px solid rgb(255 255 255 / 0.22);
    transition: background 0.22s ease;
  }

  .xp-cell:last-child {
    border-right: none;
  }

  .xp-ruler {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    padding: 0 4px;
    margin-top: -2px;
  }

  .xp-ruler-num {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    text-align: center;
    opacity: 0.85;
    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .process-journey {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    align-items: stretch;
    padding: 0 4px;
    margin-top: 2px;
  }

  .process-stop {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  .process-xp-block:has(.process-stop:nth-child(1):hover) .xp-cell:nth-child(1),
  .process-xp-block:has(.process-stop:nth-child(2):hover) .xp-cell:nth-child(2),
  .process-xp-block:has(.process-stop:nth-child(3):hover) .xp-cell:nth-child(3),
  .process-xp-block:has(.process-stop:nth-child(4):hover) .xp-cell:nth-child(4) {
    background: rgb(255 255 255 / 0.14);
    box-shadow: inset 0 0 20px rgb(255 255 255 / 0.12);
  }

  .process-xp-block:has(.process-stop:nth-child(1):hover) .xp-ruler-num:nth-child(1),
  .process-xp-block:has(.process-stop:nth-child(2):hover) .xp-ruler-num:nth-child(2),
  .process-xp-block:has(.process-stop:nth-child(3):hover) .xp-ruler-num:nth-child(3),
  .process-xp-block:has(.process-stop:nth-child(4):hover) .xp-ruler-num:nth-child(4) {
    color: var(--primary);
    opacity: 1;
  }

  .process-xp-block:has(.process-stop:nth-child(1):hover) .process-stop:nth-child(1) .process-stage-id,
  .process-xp-block:has(.process-stop:nth-child(2):hover) .process-stop:nth-child(2) .process-stage-id,
  .process-xp-block:has(.process-stop:nth-child(3):hover) .process-stop:nth-child(3) .process-stage-id,
  .process-xp-block:has(.process-stop:nth-child(4):hover) .process-stop:nth-child(4) .process-stage-id {
    color: var(--primary);
    opacity: 1;
  }

  .process-card {
    position: relative;
    flex: 1;
    overflow: hidden;
    padding: 0 14px 15px;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    box-shadow: 0 1px 0 rgb(15 23 42 / 0.04);
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease,
      background 0.2s ease;
  }

  .process-card-accent {
    height: 3px;
    width: calc(100% + 2px);
    margin: -1px -1px 10px;
    flex-shrink: 0;
    opacity: 0.95;
    border-radius: var(--chamfer) 0 0 0;
    transition:
      filter 0.22s ease,
      box-shadow 0.22s ease;
  }

  .process-stop[data-stage='1'] .process-card-accent {
    background: linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%);
    box-shadow: 0 0 16px rgb(14 165 233 / 0.28);
  }

  .process-stop[data-stage='2'] .process-card-accent {
    background: linear-gradient(90deg, #06b6d4 0%, #0e7490 100%);
    box-shadow: 0 0 16px rgb(6 182 212 / 0.26);
  }

  .process-stop[data-stage='3'] .process-card-accent {
    background: linear-gradient(90deg, #14b8a6 0%, #0f766e 100%);
    box-shadow: 0 0 16px rgb(20 184 166 / 0.24);
  }

  .process-stop[data-stage='4'] .process-card-accent {
    background: linear-gradient(90deg, #10b981 0%, #047857 100%);
    box-shadow: 0 0 16px rgb(16 185 129 / 0.26);
  }

  .process-stop[data-stage='1'] .process-card {
    background: linear-gradient(180deg, rgb(14 165 233 / 0.07) 0%, var(--bg) 42%);
  }

  .process-stop[data-stage='2'] .process-card {
    background: linear-gradient(180deg, rgb(6 182 212 / 0.07) 0%, var(--bg) 42%);
  }

  .process-stop[data-stage='3'] .process-card {
    background: linear-gradient(180deg, rgb(20 184 166 / 0.07) 0%, var(--bg) 42%);
  }

  .process-stop[data-stage='4'] .process-card {
    background: linear-gradient(180deg, rgb(16 185 129 / 0.07) 0%, var(--bg) 42%);
  }

  .process-card-hud {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 2px;
  }

  .process-stage-id {
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .process-stop:hover .process-card-accent {
    filter: brightness(1.06);
  }

  .process-stop:hover .process-card {
    border-color: rgb(3 105 161 / 0.16);
    box-shadow: var(--shadow-tile);
    transform: translateY(-1px);
  }

  .process-stop[data-stage='1']:hover .process-card {
    border-color: rgb(14 165 233 / 0.28);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(14 165 233 / 0.06),
      0 12px 36px rgb(14 165 233 / 0.08);
  }

  .process-stop[data-stage='2']:hover .process-card {
    border-color: rgb(6 182 212 / 0.28);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(6 182 212 / 0.06),
      0 12px 36px rgb(6 182 212 / 0.07);
  }

  .process-stop[data-stage='3']:hover .process-card {
    border-color: rgb(20 184 166 / 0.28);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(20 184 166 / 0.06),
      0 12px 36px rgb(20 184 166 / 0.07);
  }

  .process-stop[data-stage='4']:hover .process-card {
    border-color: rgb(16 185 129 / 0.28);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(16 185 129 / 0.06),
      0 12px 36px rgb(16 185 129 / 0.08);
  }

  .step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16.5px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    line-height: 1.25;
  }

  .step-desc {
    font-size: 13.5px;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  :global([data-theme='dark']) .xp-strip-meta {
    background: rgb(30 41 59 / 0.65);
    border-color: rgb(51 65 85 / 0.95);
    color: rgb(203 213 225);
  }

  :global([data-theme='dark']) .xp-bar-wrap {
    background: linear-gradient(180deg, rgb(51 65 85 / 0.5) 0%, rgb(15 23 42 / 0.95) 100%);
    border-color: rgb(51 65 85 / 0.95);
    box-shadow:
      0 1px 0 rgb(255 255 255 / 0.04) inset,
      0 12px 40px rgb(0 0 0 / 0.35);
  }

  :global([data-theme='dark']) .xp-bar-fill {
    background: linear-gradient(
      90deg,
      #38bdf8 0%,
      #0ea5e9 22%,
      #2dd4bf 58%,
      #34d399 100%
    );
    box-shadow:
      0 1px 0 rgb(255 255 255 / 0.2) inset,
      inset 0 -2px 8px rgb(0 0 0 / 0.25);
  }

  :global([data-theme='dark']) .xp-cell {
    border-right-color: rgb(15 23 42 / 0.35);
  }

  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(1):hover) .xp-cell:nth-child(1),
  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(2):hover) .xp-cell:nth-child(2),
  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(3):hover) .xp-cell:nth-child(3),
  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(4):hover) .xp-cell:nth-child(4) {
    background: rgb(255 255 255 / 0.1);
    box-shadow: inset 0 0 24px rgb(56 189 248 / 0.15);
  }

  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(1):hover) .xp-ruler-num:nth-child(1),
  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(2):hover) .xp-ruler-num:nth-child(2),
  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(3):hover) .xp-ruler-num:nth-child(3),
  :global([data-theme='dark']) .process-xp-block:has(.process-stop:nth-child(4):hover) .xp-ruler-num:nth-child(4) {
    color: rgb(125 211 252);
  }

  :global([data-theme='dark']) .process-card {
    border-color: rgb(51 65 85 / 0.85);
  }

  :global([data-theme='dark']) .process-stop[data-stage='1'] .process-card {
    background: linear-gradient(180deg, rgb(56 189 248 / 0.1) 0%, rgb(15 23 42 / 0.88) 48%);
  }

  :global([data-theme='dark']) .process-stop[data-stage='2'] .process-card {
    background: linear-gradient(180deg, rgb(34 211 238 / 0.09) 0%, rgb(15 23 42 / 0.88) 48%);
  }

  :global([data-theme='dark']) .process-stop[data-stage='3'] .process-card {
    background: linear-gradient(180deg, rgb(45 212 191 / 0.09) 0%, rgb(15 23 42 / 0.88) 48%);
  }

  :global([data-theme='dark']) .process-stop[data-stage='4'] .process-card {
    background: linear-gradient(180deg, rgb(52 211 153 / 0.1) 0%, rgb(15 23 42 / 0.88) 48%);
  }

  :global([data-theme='dark']) .process-stop[data-stage='1'] .process-card-accent {
    background: linear-gradient(90deg, #38bdf8 0%, #0284c7 100%);
    box-shadow: 0 0 18px rgb(56 189 248 / 0.35);
  }

  :global([data-theme='dark']) .process-stop[data-stage='2'] .process-card-accent {
    background: linear-gradient(90deg, #22d3ee 0%, #0e7490 100%);
    box-shadow: 0 0 18px rgb(34 211 238 / 0.3);
  }

  :global([data-theme='dark']) .process-stop[data-stage='3'] .process-card-accent {
    background: linear-gradient(90deg, #2dd4bf 0%, #0f766e 100%);
    box-shadow: 0 0 18px rgb(45 212 191 / 0.28);
  }

  :global([data-theme='dark']) .process-stop[data-stage='4'] .process-card-accent {
    background: linear-gradient(90deg, #34d399 0%, #047857 100%);
    box-shadow: 0 0 18px rgb(52 211 153 / 0.3);
  }

  :global([data-theme='dark']) .process-stop:hover .process-card {
    border-color: rgb(71 85 105 / 0.95);
  }

  :global([data-theme='dark']) .process-stop[data-stage='1']:hover .process-card {
    border-color: rgb(56 189 248 / 0.35);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(56 189 248 / 0.1),
      0 14px 40px rgb(56 189 248 / 0.12);
  }

  :global([data-theme='dark']) .process-stop[data-stage='2']:hover .process-card {
    border-color: rgb(34 211 238 / 0.32);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(34 211 238 / 0.08),
      0 14px 40px rgb(34 211 238 / 0.1);
  }

  :global([data-theme='dark']) .process-stop[data-stage='3']:hover .process-card {
    border-color: rgb(45 212 191 / 0.32);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(45 212 191 / 0.08),
      0 14px 40px rgb(45 212 191 / 0.1);
  }

  :global([data-theme='dark']) .process-stop[data-stage='4']:hover .process-card {
    border-color: rgb(52 211 153 / 0.35);
    box-shadow:
      var(--shadow-tile),
      0 0 0 1px rgb(52 211 153 / 0.1),
      0 14px 40px rgb(52 211 153 / 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    .process-card {
      transition: none;
    }

    .process-stop:hover .process-card {
      transform: none;
    }

    .xp-bar-glow {
      animation: none;
      opacity: 0.75;
    }
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

  .why-image-placeholder {
    aspect-ratio: 4/3;
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

    .process-xp-block {
      gap: 16px;
    }

    .process-journey {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px 20px;
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
    .xp-strip-title {
      letter-spacing: 0.14em;
    }

    .xp-strip-meta {
      font-size: 10px;
      padding: 3px 8px;
    }

    .xp-bar-wrap {
      height: 10px;
    }

    .xp-ruler-num {
      font-size: 9px;
    }

    .process-journey {
      grid-template-columns: 1fr;
      gap: 22px;
    }
  }
</style>
