<script lang="ts">
  const services = [
    {
      number: '01',
      title: 'Website Design & Development',
      description: `Most business websites are templates with your logo swapped in. We don't do that.\n\nEvery site we build is designed from scratch around your specific business: how you work, who you serve, and what actually needs to be said. No generic layouts. No filler copy. No features you didn't ask for.\n\nAnd when it's done, it's yours. Not ours to hold over you with a monthly fee.`,
      tags: ['Custom Design', 'Full Ownership', 'No Templates', 'Fastest Load Times'],
      placeholder: 'Website Redesign, Apex Realty',
      quote: '"Finally a site that actually looks like my business, not a theme."',
      quoteName: 'J. Harrow, Apex Realty',
      flip: false,
    },
    {
      number: '02',
      title: 'Business Software & Tools',
      description: `Off-the-shelf software almost fits. Almost. The remaining gap is where time gets wasted and frustration builds.\n\nWe build internal tools, client portals, and web applications tailored to your exact workflow. You stop bending your process around someone else's product and start using something built specifically for how you operate.`,
      tags: ['Custom Workflow Tools', 'Client Portals', 'Integrations', 'SaaS Builds'],
      placeholder: 'Internal Ops Platform, NorthTide Co.',
      quote: '"We stopped paying for 4 tools and replaced them with one that actually fits."',
      quoteName: 'M. Torres, NorthTide Co.',
      flip: true,
    },
    {
      number: '03',
      title: 'CRM & Client Management',
      description: `A CRM that nobody uses is just a database with a price tag. The problem is usually setup: the wrong fields, missing automation, no training, no buy-in.\n\nWe configure your CRM around your actual sales process and make sure your team knows how to use it. Then we stay involved so it doesn't fall apart a month later.`,
      tags: ['Pipeline Setup', 'Automations', 'Team Onboarding', 'Ongoing Management'],
      placeholder: 'CRM Dashboard, Beacon Labs',
      quote: '"Everyone on my team actually uses it now. That\'s never happened before."',
      quoteName: 'S. Okafor, Beacon Labs',
      flip: false,
    },
    {
      number: '04',
      title: 'Managed IT Support',
      description: `You shouldn't need a computer science degree to run your business. But you also shouldn't be on hold for 40 minutes every time something breaks.\n\nWe act as your IT department: monitoring, responding, and fixing things before you notice them. You call, we answer. No ticket queue. No outsourced support desk.`,
      tags: ['Direct Support Line', 'Proactive Monitoring', 'Infrastructure', 'Security'],
      placeholder: 'Infrastructure Overview, GridFlow',
      quote: '"I called on a Saturday morning and someone picked up. That\'s it. That sold me."',
      quoteName: 'R. Patel, GridFlow',
      flip: true,
    },
  ];
</script>

<section class="section services" id="services">
  <div class="container">
    <div class="section-header">
      <span class="badge badge-gradient">What We Do</span>
      <h2 class="section-title">Built for your business.<br />Not built for everyone.</h2>
    </div>

    <div class="services-list">
      {#each services as svc}
        <div class="service-row" class:flip={svc.flip}>
          <div class="service-visual">
            <div class="svc-placeholder">
              <span class="ph-label">{svc.placeholder}</span>
            </div>
          </div>

          <div class="service-text">
            <div class="svc-number">{svc.number}</div>
            <h3 class="svc-title">{svc.title}</h3>
            <div class="svc-desc">
              {#each svc.description.split('\n\n') as para}
                <p>{para}</p>
              {/each}
            </div>
            <div class="svc-tags">
              {#each svc.tags as tag}
                <span class="svc-tag">{tag}</span>
              {/each}
            </div>
            <blockquote class="svc-quote">
              <p class="quote-text">{svc.quote}</p>
              <cite class="quote-cite">{svc.quoteName}</cite>
            </blockquote>
            <a href="#contact" class="btn btn-outline-primary" style="align-self:flex-start; margin-top: 8px;">
              Learn more →
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .section-header {
    text-align: center;
    margin-bottom: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    line-height: 1.15;
  }

  .services-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .service-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
    padding: 64px 0;
    border-bottom: 1px solid var(--border);
  }

  .service-row:last-child {
    border-bottom: none;
  }

  .service-row.flip {
    direction: rtl;
  }

  .service-row.flip > * {
    direction: ltr;
  }

  .service-visual {
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: var(--shadow-lg);
    aspect-ratio: 16/10;
  }

  .svc-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e0f2fe 0%, #ccfbf1 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  .ph-label {
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    color: #0369a1;
    text-align: center;
    padding: 16px;
    letter-spacing: 0.04em;
    opacity: 0.7;
  }

  .service-text {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .svc-number {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    color: #0369a1;
    letter-spacing: 0.1em;
    opacity: 0.7;
  }

  .svc-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  .svc-desc {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .svc-desc p {
    font-size: 14.5px;
    color: #475569;
    line-height: 1.75;
  }

  .svc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .svc-tag {
    font-size: 11px;
    font-weight: 500;
    color: #64748b;
    background: #fff;
    border: 1px solid #e2e8f0;
    padding: 3px 8px;
    border-radius: 2px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.03em;
  }

  .svc-quote {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #0369a1;
    border-radius: 0 3px 3px 0;
    padding: 12px 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .quote-text {
    font-size: 13.5px;
    color: #374151;
    font-style: italic;
    line-height: 1.5;
  }

  .quote-cite {
    font-size: 11px;
    color: #94a3b8;
    font-style: normal;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  @media (max-width: 820px) {
    .service-row {
      grid-template-columns: 1fr;
      gap: 32px;
      direction: ltr;
    }
    .service-row.flip {
      direction: ltr;
    }
    .service-visual {
      order: -1;
      aspect-ratio: 16/8;
    }
  }
</style>
