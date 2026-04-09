<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

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

<section class="section testimonials-section" id="case-studies">
  <div class="container">
    <div class="t-header">
      <h2 class="t-title">From business owners like you</h2>
      <p class="t-sub">
        Not case studies. Not metrics.
        <ContentHighlight tone="string">What it actually felt like to work with us.</ContentHighlight>
      </p>
    </div>
    <div class="testimonials-grid">
      {#each testimonials as t}
        <div class="t-card">
          <div class="t-result">{t.result}</div>
          <div class="t-stars" role="img" aria-label="5 out of 5 stars">
            {#each [0, 1, 2, 3, 4] as _}
              <span class="t-star" aria-hidden="true">★</span>
            {/each}
          </div>
          <p class="t-quote">{t.quote}</p>
          <div class="t-author">
            <div class="t-avatar" aria-hidden="true"></div>
            <div class="t-author-meta">
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
  <div class="container cta-content">
    <div class="cta-inner">
      <span class="cta-eyebrow">Ready to grow?</span>
      <h2 class="cta-title">
        Stop renting.<br />Start owning.
      </h2>
      <p class="cta-sub">
        If you're tired of
        <ContentHighlight tone="accent">paying for something you don't own</ContentHighlight>, dealing with vendors who
        don't pick up, or having a site that looks like everyone else's, let's talk.
      </p>
      <div class="cta-actions">
        <a href="/contact" class="btn btn-white btn-lg">Book a Free Call</a>
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
    color: var(--text-primary);
  }

  .t-sub {
    font-size: 15px;
    color: var(--text-secondary);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    overflow: hidden;
  }

  .t-card {
    background: var(--bg);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: background 0.15s;
  }

  .t-card:hover {
    background: var(--bg-muted);
  }

  .t-result {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--primary);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 4px 10px;
    display: inline-block;
    width: fit-content;
    letter-spacing: 0.01em;
  }

  .t-stars {
    display: flex;
    align-items: center;
    gap: 2px;
    letter-spacing: 0;
  }

  .t-star {
    font-size: 15px;
    line-height: 1;
    color: #f59e0b;
    text-shadow: 0 0 0.5px rgba(180, 83, 9, 0.35);
  }

  .t-quote {
    font-size: 14.5px;
    color: var(--text-secondary);
    line-height: 1.7;
    font-style: italic;
    flex: 1;
  }

  .t-author {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }

  /* Generic blank “profile photo” placeholder (silhouette, not an icon glyph) */
  .t-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(180deg, #e8edf2 0%, #cbd5e1 100%);
    border: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
  }

  .t-avatar::before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #94a3b8;
    top: 9px;
    left: 50%;
    transform: translateX(-50%);
  }

  .t-avatar::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 18px;
    border-radius: 15px 15px 0 0;
    background: #94a3b8;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .t-author-meta {
    min-width: 0;
  }

  .t-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
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
    background: var(--primary);
    padding: 80px 0;
  }

  .cta-content {
    position: relative;
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
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
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
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
  }

  .btn-white:hover:not(:disabled):not([aria-disabled='true']) {
    transform: translateY(-2px);
    background: #fff;
    border-color: #fff;
    box-shadow:
      0 6px 20px rgb(0 0 0 / 0.14),
      0 2px 8px rgb(3 105 161 / 0.12);
    filter: brightness(1.02);
  }

  .btn-white:active:not(:disabled):not([aria-disabled='true']) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  }

  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,255,255,0.35);
    box-shadow: none;
  }

  .btn-ghost:hover:not(:disabled):not([aria-disabled='true']) {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.55);
    box-shadow: 0 6px 20px rgb(0 0 0 / 0.2);
  }

  .btn-ghost:active:not(:disabled):not([aria-disabled='true']) {
    transform: translateY(0);
    box-shadow: none;
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
      padding: 56px 0;
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
