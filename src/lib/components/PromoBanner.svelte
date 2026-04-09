<a href="/events/free-website-july" class="promo-strip" aria-label="Free website offer, ends July 1 — Learn more">
  <div class="promo-strip__bg" aria-hidden="true"></div>
  <div class="promo-strip__inner">
    <span class="promo-strip__badge">Limited</span>
    <span class="promo-strip__title">Free website offer</span>
    <span class="promo-strip__dot" aria-hidden="true"></span>
    <span class="promo-strip__meta">Ends July 1</span>
    <span class="promo-strip__cta">
      Learn more
      <span class="promo-strip__arrow" aria-hidden="true">→</span>
    </span>
  </div>
</a>

<style>
  .promo-strip {
    position: relative;
    display: block;
    width: 100%;
    margin-top: 4px;
    padding: 5px 16px 6px;
    text-decoration: none;
    color: #f8fafc;
    overflow: hidden;
    border-radius: 0;
    border: none;
    border-top: 1px solid rgb(255 255 255 / 0.14);
    box-shadow:
      0 1px 0 rgb(0 0 0 / 0.12),
      inset 0 1px 0 rgb(255 255 255 / 0.06);
    transition:
      filter 0.15s ease,
      box-shadow 0.15s ease;
  }

  .promo-strip:hover {
    filter: brightness(1.06) saturate(1.05);
    box-shadow:
      0 2px 12px rgb(3 105 161 / 0.35),
      inset 0 1px 0 rgb(255 255 255 / 0.1);
  }

  .promo-strip__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #0369a1 0%, #0e7490 42%, #0d9488 72%, #0f766e 100%);
    pointer-events: none;
  }

  .promo-strip__bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 120% at 100% 50%, rgb(255 255 255 / 0.16), transparent 55%),
      radial-gradient(ellipse 60% 100% at 0% 100%, rgb(45 212 191 / 0.12), transparent 45%);
    pointer-events: none;
  }

  .promo-strip__inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px 12px;
    text-align: center;
  }

  @media (min-width: 640px) {
    .promo-strip__inner {
      flex-wrap: nowrap;
      justify-content: center;
      gap: 10px 16px;
    }
  }

  .promo-strip__badge {
    flex-shrink: 0;
    font-size: 9px;
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgb(255 255 255 / 0.92);
    background: rgb(0 0 0 / 0.28);
    padding: 2px 7px;
    border-radius: var(--radius-tile-sm);
    border: 1px solid rgb(255 255 255 / 0.12);
  }

  .promo-strip__title {
    font-family: var(--font-display);
    font-size: clamp(13px, 2vw, 15px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
  }

  .promo-strip__dot {
    display: none;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.5);
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    .promo-strip__dot {
      display: block;
    }
  }

  .promo-strip__meta {
    font-size: 11px;
    font-weight: 600;
    opacity: 0.96;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .promo-strip__cta {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 3px 10px;
    border-radius: var(--radius-tile-sm);
    background: rgb(255 255 255 / 0.18);
    border: 1px solid rgb(255 255 255 / 0.32);
  }

  .promo-strip:hover .promo-strip__cta {
    background: rgb(255 255 255 / 0.28);
  }

  .promo-strip__arrow {
    display: inline-block;
    margin-left: 1px;
    transition: transform 0.15s ease;
  }

  .promo-strip:hover .promo-strip__arrow {
    transform: translateX(3px);
  }
</style>
