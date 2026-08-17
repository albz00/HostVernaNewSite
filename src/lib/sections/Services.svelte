<script lang="ts">
  import { onMount } from 'svelte';
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const services = [
    {
      title: 'Managed IT Services',
      ctaLabel: 'How We Support Accounting Firms',
      learnMoreHref: '/services/it-solutions',
      visualUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/a01968f3-730e-4a92-27aa-8b9eb15c0100/public',
      visualLabel: 'Managed IT collaboration and support',
      description: `Your IT department, without building one in-house. Help desk, user support, device administration, patching, Microsoft 365 or Google Workspace, vendor coordination, backups, and ongoing technology management.`,
      placeholder: 'Managed IT Services',
      quote: '"A real person picked up."',
      quoteName: 'R. Patel',
      flip: false,
    },
    {
      title: 'IRS Security Six Setup',
      ctaLabel: 'How We Support Accounting Firms',
      learnMoreHref: '/services/irs-security-six',
      visualUrl: '/images/irs-security-six.jpg',
      visualLabel: 'Laptop showing a secured connection and lock symbol',
      description: `Practical implementation of anti-malware, firewall review, multi-factor authentication, backups, drive encryption, and secure remote access for tax professionals.`,
      placeholder: 'IRS Security Six',
      quote: '"The safeguards are configured and clearly documented."',
      quoteName: 'Security Six project',
      flip: true,
    },
    {
      title: 'WISP Creation & Updates',
      ctaLabel: 'How We Support Accounting Firms',
      learnMoreHref: '/services/wisp-services',
      visualUrl: '/images/wisp-documentation.jpg',
      visualLabel: 'Professionals reviewing a written security plan together',
      description: `A firm-specific Written Information Security Plan that reflects your systems, staff, vendors, safeguards, and review process—not a generic template with your name pasted in.`,
      placeholder: 'WISP Documentation',
      quote: '"The plan now matches how the firm actually operates."',
      quoteName: 'WISP project',
      flip: false,
    },
  ];

  let rowEls: (HTMLElement | null)[] = [];
  let visibleRows: boolean[] = services.map(() => false);

  onMount(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 760px)').matches;

    let observer: IntersectionObserver | undefined;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      visibleRows = services.map(() => true);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const idx = Number((entry.target as HTMLElement).dataset.rowIndex);
            if (!Number.isNaN(idx)) {
              visibleRows[idx] = true;
              visibleRows = visibleRows;
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );

      for (const el of rowEls) {
        if (el) observer.observe(el);
      }
    }

    return () => {
      observer?.disconnect();
    };
  });
</script>

<section class="section services" id="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        Your IT department,<br />
        <ContentHighlight tone="accent">without building one in-house.</ContentHighlight>
      </h2>
    </div>

    <div class="services-list">
      {#each services as svc, rowIndex}
        <div
          class="service-row"
          class:flip={svc.flip}
          class:in-view={visibleRows[rowIndex]}
          data-row-index={rowIndex}
          bind:this={rowEls[rowIndex]}
        >
          <div class="service-visual">
            {#if svc.visualUrl && svc.visualLabel}
              <div class="svc-visual" role="img" aria-label={svc.visualLabel}>
                <img
                  src={svc.visualUrl}
                  alt=""
                  class="svc-visual-img"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            {:else}
              <div class="svc-placeholder">
                <span class="ph-label">{svc.placeholder}</span>
              </div>
            {/if}
          </div>

          <div class="service-text">
            <div class="svc-title-block">
              <span class="svc-check" aria-hidden="true">
                <svg
                  class="svc-check-svg"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle class="svc-check-circle" cx="26" cy="26" r="22" />
                  <path class="svc-check-path" d="M14.5 26.5 L23 35 L38 18.5" />
                </svg>
              </span>
              <h3 class="svc-title">{svc.title}</h3>
            </div>
            <div class="svc-desc">
              {#each svc.description.split('\n\n') as para}
                <p>{para}</p>
              {/each}
            </div>
            <blockquote class="svc-quote">
              <p class="quote-text">{svc.quote}</p>
              <cite class="quote-cite">{svc.quoteName}</cite>
            </blockquote>
            <a
              href={svc.learnMoreHref}
              class="btn btn-outline-primary"
              style="align-self:flex-start; margin-top: 8px;"
              aria-label={`Learn more about ${svc.title}`}
            >
              {svc.ctaLabel}
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
    gap: 24px;
  }

  .service-row {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 5vw, 64px);
    align-items: center;
    padding: clamp(32px, 4vw, 48px) clamp(28px, 3vw, 40px);
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    background: var(--bg);
    box-shadow: var(--shadow-tile);
    transition: box-shadow 0.22s ease, transform 0.22s ease;
    isolation: isolate;
    overflow: hidden;
  }

  /* Soft side-fade decoration on each tile: a tinted glow bleeding in from
     one edge. Alternating rows pull their glow from the opposite side so the
     rhythm reads intentional when you scan the stack. */
  .service-row::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 55% 90% at 0% 50%,
        rgb(3 105 161 / 0.08),
        transparent 65%
      );
    transition: opacity 0.3s ease;
    opacity: 0.9;
  }

  /* Small framing accent in the same corner: a thin gradient bar that
     grounds the fade visually without looking like a pill or button. */
  .service-row::after {
    content: '';
    position: absolute;
    top: 18%;
    bottom: 18%;
    left: 0;
    width: 3px;
    z-index: -1;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgb(3 105 161 / 0.45) 30%,
      rgb(13 148 136 / 0.45) 70%,
      transparent 100%
    );
    border-radius: 0 3px 3px 0;
    opacity: 0.85;
  }

  .service-row.flip::before {
    background:
      radial-gradient(
        ellipse 55% 90% at 100% 50%,
        rgb(13 148 136 / 0.08),
        transparent 65%
      );
  }

  .service-row.flip::after {
    left: auto;
    right: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgb(13 148 136 / 0.45) 30%,
      rgb(3 105 161 / 0.45) 70%,
      transparent 100%
    );
    border-radius: 3px 0 0 3px;
  }

  .service-row:hover {
    box-shadow: var(--shadow-tile-hover);
    transform: translateY(-2px);
  }

  .service-row:hover::before {
    opacity: 1;
  }

  :global([data-theme='dark']) .service-row::before {
    background:
      radial-gradient(
        ellipse 55% 90% at 0% 50%,
        rgb(56 189 248 / 0.1),
        transparent 65%
      );
  }

  :global([data-theme='dark']) .service-row.flip::before {
    background:
      radial-gradient(
        ellipse 55% 90% at 100% 50%,
        rgb(45 212 191 / 0.1),
        transparent 65%
      );
  }

  @media (prefers-reduced-motion: reduce) {
    .service-row {
      transition: none;
    }

    .service-row:hover {
      transform: none;
    }
  }

  .service-row.flip {
    direction: rtl;
  }

  .service-row.flip > * {
    direction: ltr;
  }

  .service-visual {
    position: relative;
    border-radius: var(--radius-tile);
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    box-shadow: var(--shadow-sm);
    aspect-ratio: 16/10;
  }

  .svc-visual {
    position: absolute;
    inset: 0;
    background: #0f172a;
  }

  .svc-gallery-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    opacity: 0;
    transition: opacity 0.7s ease;
  }

  .svc-gallery-img.active {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .svc-gallery-img {
      transition-duration: 0.01ms;
    }
  }

  .svc-visual-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .svc-placeholder {
    width: 100%;
    height: 100%;
    background: #f1f5f9;
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

  .svc-title-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: clamp(14px, 3vw, 28px);
    width: 100%;
  }

  .svc-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin: 0;
    flex: 1;
    min-width: 0;
  }

  .svc-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: clamp(56px, 9vw, 76px);
    aspect-ratio: 1;
    border-radius: 999px;
    background: radial-gradient(
      circle at 50% 50%,
      rgb(3 105 161 / 0.08) 0%,
      rgb(13 148 136 / 0.04) 60%,
      transparent 100%
    );
  }

  .svc-check-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .svc-check-circle,
  .svc-check-path {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .svc-check-circle {
    stroke: rgb(3 105 161 / 0.45);
    stroke-width: 2.25;
    stroke-dasharray: 138.23;
    stroke-dashoffset: 138.23;
    transform-origin: 26px 26px;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .svc-check-path {
    stroke: #0369a1;
    stroke-width: 3.5;
    stroke-dasharray: 44;
    stroke-dashoffset: 44;
    transition: stroke-dashoffset 0.45s cubic-bezier(0.65, 0, 0.45, 1) 0.4s;
    filter: drop-shadow(0 1px 4px rgb(3 105 161 / 0.18));
  }

  .service-row.in-view .svc-check-circle {
    stroke-dashoffset: 0;
  }

  .service-row.in-view .svc-check-path {
    stroke-dashoffset: 0;
  }

  :global([data-theme='dark']) .svc-check {
    background: radial-gradient(
      circle at 50% 50%,
      rgb(56 189 248 / 0.12) 0%,
      rgb(45 212 191 / 0.06) 60%,
      transparent 100%
    );
  }

  :global([data-theme='dark']) .svc-check-circle {
    stroke: rgb(125 211 252 / 0.55);
  }

  :global([data-theme='dark']) .svc-check-path {
    stroke: #7dd3fc;
    filter: drop-shadow(0 1px 6px rgb(56 189 248 / 0.35));
  }

  @media (prefers-reduced-motion: reduce) {
    .svc-check-circle,
    .svc-check-path {
      transition: none;
      stroke-dashoffset: 0;
    }
  }

  @media (max-width: 420px) {
    .svc-title-block {
      align-items: flex-start;
    }

    .svc-check {
      width: clamp(48px, 13vw, 60px);
      margin-top: 2px;
    }
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

  .svc-quote {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 12px 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: var(--shadow-sm);
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

  @media (max-width: 640px) {
    .section-header {
      margin-bottom: 36px;
    }

    .service-row {
      gap: 22px;
      padding: 22px 18px;
    }

    .service-visual {
      aspect-ratio: 4 / 3;
      border-radius: var(--radius-tile-sm);
    }

    .svc-title-block {
      gap: 14px;
    }

    .svc-title {
      font-size: clamp(19px, 7vw, 24px);
    }

    .svc-desc {
      gap: 10px;
    }

    .svc-desc p {
      font-size: 14px;
      line-height: 1.65;
    }

    .svc-quote {
      padding: 12px 14px;
    }

    .quote-text {
      font-size: 13px;
    }

    .service-text .btn {
      width: 100%;
      justify-content: center;
      white-space: normal;
      text-align: center;
    }
  }

  @media (max-width: 380px) {
    .service-row {
      padding: 20px 14px;
    }

    .svc-check {
      width: 48px;
    }
  }
</style>
