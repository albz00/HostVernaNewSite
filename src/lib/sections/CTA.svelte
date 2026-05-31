<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  /** Default 3D avatar for testimonial cards */
  const testimonialAvatarUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/52207b03-2a80-4d87-9cff-0e3ea8315700/public';

  const femaleTestimonialAvatarUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/10d28c89-44ac-48d7-fdd8-f7df72fd4100/public';

  const testimonials = [
    {
      quote:
        'Alex was very quick to respond, professional and attentive to everything I needed worked on! Highly recommend him for any website/domain needs!',
      author: 'Brenley B.',
      result: 'Website & domain support',
      reviewUrl: 'https://share.google/nI0lP4shlDehrmocj',
      avatarUrl: femaleTestimonialAvatarUrl,
    },
    {
      quote:
        'Alex is super great to work with and very responsive to requests! He has a great eye for design and does awesome work!',
      author: 'Missy G.',
      result: 'Responsive design work',
      reviewUrl: 'https://share.google/zW457dDaYVtPVDDC9',
      avatarUrl: femaleTestimonialAvatarUrl,
    },
    {
      quote:
        'Fantastic work every time, has done three logos and two websites for me. Always very timely and professional highly recommend',
      author: 'John H.',
      result: 'Logos & websites',
      reviewUrl: 'https://share.google/m3cNjN3NOGc9jlWch',
      avatarUrl: testimonialAvatarUrl,
    },
  ];
</script>

<section class="section testimonials-section" id="case-studies">
  <div class="container">
    <div class="t-header">
      <h2 class="t-title">From business owners like you</h2>
      <p class="t-sub">
        Honest notes on
        <ContentHighlight tone="string">what it's actually like to work with us.</ContentHighlight>
      </p>
    </div>
    <div class="testimonials-grid">
      {#each testimonials as t}
        <a
          href={t.reviewUrl}
          class="t-card"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read {t.author}'s Google review"
        >
          <span class="t-external-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
          <div class="t-result">{t.result}</div>
          <span class="t-google-link">
            <svg class="t-google-logo" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span class="t-stars" aria-hidden="true">
              {#each [0, 1, 2, 3, 4] as _}
                <span class="t-star">★</span>
              {/each}
            </span>
          </span>
          <p class="t-quote">{t.quote}</p>
          <div class="t-author">
            <div class="t-avatar">
              <img
                src={t.avatarUrl}
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
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="cta-section" id="contact">
  <div class="container cta-content">
    <div class="cta-inner">
      <span class="cta-eyebrow">Ready when you are</span>
      <h2 class="cta-title">
        Stop renting.<br />Start owning.
      </h2>
      <p class="cta-sub">
        If you're done
        <ContentHighlight tone="accent">paying forever for something you don't own</ContentHighlight>,
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
    position: relative;
    background: var(--bg);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-tile);
    transition: box-shadow 0.22s ease, border-color 0.22s ease;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .t-card:hover {
    box-shadow: var(--shadow-tile-hover);
    border-color: color-mix(in srgb, var(--primary) 25%, var(--border));
  }

  .t-external-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    color: var(--text-secondary);
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .t-card:hover .t-external-icon {
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, var(--bg));
    border-color: color-mix(in srgb, var(--primary) 25%, var(--border));
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

  .t-google-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
  }

  .t-google-logo {
    flex-shrink: 0;
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
