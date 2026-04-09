<script lang="ts">
  const steps = [
    {
      num: '01',
      title: 'Discovery Call',
      desc: 'A focused 30-minute conversation about your business, what you need, and what\'s been frustrating you. No pitch. No pressure.',
    },
    {
      num: '02',
      title: 'Clear Proposal',
      desc: 'You get scope, timeline, and pricing in plain language before any work starts. No moving goalposts.',
    },
    {
      num: '03',
      title: 'Build & Launch',
      desc: 'We build it, you get check-ins along the way. When it launches, we walk you through everything so you\'re never left guessing.',
    },
    {
      num: '04',
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

<section class="section process-section" id="solutions">
  <div class="container">
    <div class="split-header">
      <div>
        <span class="badge badge-gradient">How It Works</span>
        <h2 class="section-title">Simple process.<br />Real results.</h2>
      </div>
      <p class="split-sub">
        You shouldn't have to become a web expert to have a good website. Here's how we handle the whole thing, start to finish.
      </p>
    </div>

    <div class="process-timeline">
      {#each steps as step, i}
        <div class="timeline-step">
          <div class="step-track">
            <div class="step-dot"></div>
            {#if i < steps.length - 1}
              <div class="step-line"></div>
            {/if}
          </div>
          <div class="step-content">
            <span class="step-num">{step.num}</span>
            <h3 class="step-title">{step.title}</h3>
            <p class="step-desc">{step.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section whyus-section" id="about">
  <div class="container">
    <div class="whyus-layout">
      <div class="whyus-left">
        <span class="badge badge-gradient">Why HostVerna</span>
        <h2 class="section-title">Why businesses<br />stay with us</h2>
        <p class="why-sub">
          We built HostVerna for business owners who are too busy, too stretched, or too new to this to want to manage a tech vendor relationship. We handle it, and we do it without making you feel out of the loop.
        </p>
        <div class="why-image-placeholder">
          <span class="ph-label">Team at Work, HostVerna HQ</span>
        </div>
        <a href="#contact" class="btn btn-primary">Talk to us</a>
      </div>

      <div class="whyus-right">
        {#each pillars as p, i}
          <div class="pillar">
            <div class="pillar-num">{String(i + 1).padStart(2, '0')}</div>
            <div class="pillar-body">
              <h4 class="pillar-title">{p.title}</h4>
              <p class="pillar-desc">{p.desc}</p>
            </div>
          </div>
        {/each}

        <div class="inline-quote">
          <p class="iq-text">"I didn't know a thing about websites. They explained everything, handed it over, and I actually understood what I had. Nobody's ever done that for me."</p>
          <span class="iq-cite">L. Kwan, CEO, BrightPath Realty</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .process-section {
    background: #fff;
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

  .process-timeline {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }

  .timeline-step {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .step-track {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    height: 20px;
  }

  .step-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--gradient);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 3px rgba(3,105,161,0.12);
  }

  .step-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(3,105,161,0.3), rgba(13,148,136,0.15));
    margin-left: 0;
    position: absolute;
    left: 14px;
    right: -1px;
    top: 50%;
  }

  .step-content {
    padding-right: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .step-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #94a3b8;
    letter-spacing: 0.1em;
  }

  .step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .step-desc {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.65;
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
    background: linear-gradient(135deg, #e0f2fe 0%, #ccfbf1 100%);
    border: 1px solid #e2e8f0;
    border-radius: 4px;
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
    display: flex;
    gap: 20px;
    padding: 24px 0;
    border-bottom: 1px solid #e2e8f0;
    transition: background 0.15s;
  }

  .pillar:first-child {
    padding-top: 0;
  }

  .pillar-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    color: #94a3b8;
    letter-spacing: 0.08em;
    padding-top: 3px;
    flex-shrink: 0;
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
    background: #fff;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #0d9488;
    border-radius: 0 4px 4px 0;
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

    .process-timeline {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }

    .step-line {
      display: none;
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
    .process-timeline {
      grid-template-columns: 1fr;
    }
  }
</style>
