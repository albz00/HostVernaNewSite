<script lang="ts">
  const testimonials = [
    {
      quote: "I'd been paying $280 a month for a website I was terrified to touch. HostVerna built us something from scratch, walked me through everything, and I own it now. I can't overstate how different that feels.",
      author: "Sarah M.",
      role: "Founder, Meridian Consulting",
      result: "Owns her site outright",
    },
    {
      quote: "I'm not a tech person. I've never been a tech person. They never once made me feel that way. Every question I had, even the dumb ones, got a real answer.",
      author: "James T.",
      role: "Operations Director, Pinnacle Group",
      result: "No IT background required",
    },
    {
      quote: "We had a different agency for the website, a different one for software, and IT was handled by whoever picked up the phone that day. Now it's one team. One email. One call.",
      author: "Layla K.",
      role: "CEO, BrightPath Realty",
      result: "One partner, everything handled",
    },
  ];
</script>

<section class="section testimonials-section" id="pricing">
  <div class="container">
    <div class="t-header">
      <span class="badge badge-gradient">Client Results</span>
      <h2 class="t-title">From business owners like you</h2>
      <p class="t-sub">Not case studies. Not metrics. What it actually felt like to work with us.</p>
    </div>
    <div class="testimonials-grid">
      {#each testimonials as t}
        <div class="t-card">
          <div class="t-result">{t.result}</div>
          <p class="t-quote">{t.quote}</p>
          <div class="t-author">
            <div class="t-avatar"></div>
            <div>
              <div class="t-name">{t.author}</div>
              <div class="t-role">{t.role}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="cta-section" id="contact">
  <div class="cta-bg-glow-1"></div>
  <div class="cta-bg-glow-2"></div>
  <div class="container cta-content">
    <div class="cta-inner">
      <span class="cta-eyebrow">Ready to grow?</span>
      <h2 class="cta-title">
        Stop renting.<br />Start owning.
      </h2>
      <p class="cta-sub">
        If you're tired of paying for something you don't own, dealing with vendors who don't pick up, or having a site that looks like everyone else's, let's talk.
      </p>
      <div class="cta-actions">
        <a href="#contact" class="btn btn-white btn-lg">Book a Free Call</a>
        <a href="mailto:hello@hostverna.com" class="btn btn-ghost btn-lg">hello@hostverna.com</a>
      </div>
      <div class="cta-proof">
        <span class="cp-item">No commitment required</span>
        <span class="cp-dot"></span>
        <span class="cp-item">Response within 24 hours</span>
        <span class="cp-dot"></span>
        <span class="cp-item">Free discovery call</span>
        <span class="cp-dot"></span>
        <span class="cp-item">Financing available</span>
        <span class="cp-dot"></span>
        <span class="cp-item">WV Licensed &amp; Insured</span>
      </div>
    </div>
  </div>
</section>

<style>
  .testimonials-section {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .t-header {
    text-align: center;
    margin-bottom: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .t-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
  }

  .t-sub {
    font-size: 15px;
    color: #475569;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .t-card {
    background: #fff;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: background 0.15s;
  }

  .t-card:hover {
    background: #fafcff;
  }

  .t-result {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #0369a1;
    background: linear-gradient(135deg, #e0f2fe, #ccfbf1);
    border: 1px solid #bae6fd;
    border-radius: 2px;
    padding: 4px 10px;
    display: inline-block;
    width: fit-content;
    letter-spacing: 0.01em;
  }

  .t-quote {
    font-size: 14.5px;
    color: #374151;
    line-height: 1.7;
    font-style: italic;
    flex: 1;
  }

  .t-author {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }

  .t-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0369a1, #0d9488);
    flex-shrink: 0;
    opacity: 0.25;
  }

  .t-name {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    font-family: 'Space Grotesk', sans-serif;
  }

  .t-role {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.03em;
  }

  .cta-section {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0369a1 0%, #0d9488 100%);
    padding: 96px 0;
  }

  .cta-bg-glow-1 {
    position: absolute;
    top: -80px;
    left: -80px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .cta-bg-glow-2 {
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .cta-content {
    position: relative;
    z-index: 1;
  }

  .cta-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .cta-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 2px;
  }

  .cta-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.04em;
    line-height: 1.08;
    max-width: 600px;
  }

  .cta-sub {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.72);
    max-width: 440px;
    line-height: 1.7;
  }

  .cta-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 4px;
  }

  .btn-white {
    background: #fff;
    color: #0369a1;
    border-color: #fff;
    font-weight: 700;
  }

  .btn-white:hover {
    background: #f0f9ff;
    border-color: #f0f9ff;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }

  .btn-ghost {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.88);
    border: 1px solid rgba(255,255,255,0.22);
  }

  .btn-ghost:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.35);
    transform: translateY(-1px);
  }

  .cta-proof {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 4px;
  }

  .cp-item {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  .cp-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
    .cta-section {
      padding: 64px 0;
    }
    .cta-proof {
      flex-direction: column;
      gap: 6px;
    }
    .cp-dot {
      display: none;
    }
  }
</style>
