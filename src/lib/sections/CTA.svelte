<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  /** 3D avatar illustration, shared across testimonial cards */
  const testimonialAvatarUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/52207b03-2a80-4d87-9cff-0e3ea8315700/public';

  const testimonials = [
    {
      quote:
        "They rebuilt the site, showed me how to edit it, and put the ownership terms in writing.",
      author: 'Sarah M.',
      result: 'Owns her site outright',
    },
    {
      quote:
        "They answered my hosting questions plainly and handled the technical parts.",
      author: 'James T.',
      result: 'No IT background required',
    },
    {
      quote:
        "Now one team knows the setup, and our staff has one place to go.",
      author: 'Layla K.',
      result: 'One partner, everything handled',
    },
  ];
</script>

<section class="section testimonials-section" id="case-studies">
  <div class="container">
    <div class="t-header">
      <h2 class="t-title">From business owners like you</h2>
      <p class="t-sub">
        Short notes on
        <ContentHighlight tone="string">what it felt like to work with us.</ContentHighlight>
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
            <div class="t-avatar">
              <img
                src={testimonialAvatarUrl}
                width="88"
                height="88"
                alt=""
                class="t-avatar-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="t-author-meta">
              <div class="t-name">{t.author}</div>
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
        <ContentHighlight tone="accent">paying for something you don't own</ContentHighlight>,
        let's talk.
      </p>
      <div class="cta-actions">
        <a href="/contact" class="btn btn-white btn-lg">Book a Free Call</a>
        <a href="mailto:info@hostverna.com" class="btn btn-ghost btn-lg">info@hostverna.com</a>
      </div>
      <div class="cta-proof">
        <span class="cp-item">No commitment required</span>
        <span class="cp-dot"></span>
        <span class="cp-item">24-hour response</span>
        <span class="cp-dot"></span>
        <span class="cp-item">Free call</span>
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
    gap: 16px;
  }

  .t-card {
    background: var(--bg);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-tile);
    transition: box-shadow 0.22s ease;
  }

  .t-card:hover {
    box-shadow: var(--shadow-tile-hover);
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

  .t-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid var(--border);
    background: var(--bg-muted);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
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

  @media (max-width: 520px) {
    .t-header {
      margin-bottom: 34px;
    }

    .t-card {
      padding: 24px 18px;
    }

    .t-quote {
      font-size: 14px;
      line-height: 1.65;
    }

    .cta-inner {
      gap: 16px;
    }

    .cta-sub {
      font-size: 15px;
      line-height: 1.6;
    }

    .cta-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }

    .cta-actions .btn {
      width: 100%;
      white-space: normal;
    }
  }
</style>
