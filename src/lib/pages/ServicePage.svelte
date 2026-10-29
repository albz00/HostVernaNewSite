<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import ComplianceResources from '../components/ComplianceResources.svelte';
  import { getServicePage } from '../data/servicePages';

  /** e.g. `it-solutions` */
  export let slug: string;

  $: page = getServicePage(slug);
  let activeStep = 0;
  let lastSlug = '';

  $: if (slug !== lastSlug) {
    lastSlug = slug;
    activeStep = 0;
  }
</script>

<Navbar />

{#if page}
  <main class="service-page">
    <section class="service-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span class="breadcrumb-sep" aria-hidden="true">/</span>
          <a href="/#services">IT Services</a>
          <span class="breadcrumb-sep" aria-hidden="true">/</span>
          <span class="breadcrumb-current">{page.title}</span>
        </nav>

        <div class="hero-grid">
          <div class="hero-copy">
            <h1 class="service-h1">{page.title}</h1>
            <p class="service-lede">{page.lede}</p>
            <div class="hero-actions">
              <a href="/qualification" class="btn btn-primary btn-lg">Start Firm Qualification</a>
              <a href="#next-steps" class="btn btn-secondary btn-lg">See Next Steps</a>
            </div>
          </div>
          <div class="hero-visual">
            <img src={page.imageUrl} alt={page.imageAlt} width="1200" height="800" />
          </div>
        </div>
      </div>
    </section>

    <section class="coverage-section">
      <div class="container coverage-grid">
        <div class="checklist-panel">
          <h2>{page.checklistHeading}</h2>
          <div class="checklist">
            {#each page.checklist as item}
              <div class="check-item">
                <span class="check" aria-hidden="true">✓</span>
                <span>{item}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="details-panel">
          {#each page.sections as block, index}
            <details open={index === 0}>
              <summary>{block.heading}<span aria-hidden="true">+</span></summary>
              <div class="detail-copy">
                {#each block.body as para}
                  <p>{para}</p>
                {/each}
              </div>
            </details>
          {/each}
        </div>
      </div>
    </section>

    <ComplianceResources />

    <section class="next-section" id="next-steps">
      <div class="container">
        <div class="next-heading">
          <h2>What happens next</h2>
          <p>Start with qualification. HostVerna handles discovery, recommendations, and scope.</p>
        </div>

        <div class="step-layout">
          <div class="step-buttons" role="tablist" aria-label="Service next steps">
            {#each page.nextSteps as step, index}
              <button
                type="button"
                class:active={activeStep === index}
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="step-panel"
                on:click={() => (activeStep = index)}
              >
                <span class="step-marker" aria-hidden="true"></span>
                {step.title}
              </button>
            {/each}
          </div>

          <div class="step-panel" id="step-panel" role="tabpanel">
            <h3>{page.nextSteps[activeStep].title}</h3>
            <p>{page.nextSteps[activeStep].body}</p>
            {#if activeStep === 0}
              <a href="/qualification" class="btn btn-primary">Start Firm Qualification</a>
            {:else if activeStep === page.nextSteps.length - 1}
              <a href="/contact" class="btn btn-primary">Request a Discovery Meeting</a>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <section class="service-cta">
      <div class="container cta-inner">
        <div>
          <h2>Ready to give HostVerna the current picture?</h2>
          <p>Complete the qualification checklist so the discovery meeting starts with useful context.</p>
        </div>
        <a href="/qualification" class="btn btn-white btn-lg">Start Firm Qualification</a>
      </div>
    </section>
  </main>
{:else}
  <main class="service-page service-page--missing">
    <div class="container service-inner">
      <h1 class="service-h1">Page not found</h1>
      <p class="service-lede">That service page doesn’t exist.</p>
      <a href="/" class="btn btn-primary">Back to home</a>
    </div>
  </main>
{/if}

<Footer />

<style>
  .service-page {
    background: var(--bg);
  }

  .service-hero {
    padding: calc(132px + var(--hv-promo-h)) 0 84px;
    border-bottom: 1px solid var(--border);
    background:
      radial-gradient(ellipse 58% 65% at 12% 30%, rgb(var(--primary-rgb) / 0.08), transparent 68%),
      var(--bg);
  }

  @media (min-width: 901px) {
    .service-hero {
      padding-top: calc(164px + var(--hv-promo-h));
    }
  }

  .breadcrumb {
    margin-bottom: 34px;
    font-size: 13px;
    color: var(--text-muted);
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--radius-tile-sm);
    padding: 2px 4px;
    margin: -2px -4px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .breadcrumb a:hover {
    color: var(--primary);
    background: rgba(3, 105, 161, 0.06);
  }

  .breadcrumb-sep {
    margin: 0 6px;
    color: #cbd5e1;
  }

  .breadcrumb-current {
    color: var(--text-secondary);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(360px, 0.75fr);
    gap: clamp(44px, 7vw, 92px);
    align-items: center;
  }

  .service-h1 {
    font-family: var(--font-display);
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 1.04;
    margin: 0 0 22px;
    color: var(--text-primary);
  }

  .service-lede {
    max-width: 680px;
    font-size: clamp(16px, 1.7vw, 19px);
    line-height: 1.72;
    color: var(--text-secondary);
    margin: 0;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }

  .hero-visual {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg-subtle);
    box-shadow: var(--shadow-xl);
  }

  .hero-visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, transparent 55%, rgb(var(--night-rgb) / 0.28)),
      radial-gradient(80% 70% at 15% 0%, rgb(255 255 255 / 0.18), transparent 58%);
    pointer-events: none;
  }

  .hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .coverage-section,
  .next-section {
    padding: 100px 0;
  }

  .coverage-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.68fr);
    gap: clamp(36px, 6vw, 84px);
    align-items: start;
  }

  .checklist-panel h2,
  .next-heading h2,
  .service-cta h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.1;
    letter-spacing: -0.035em;
  }

  .checklist-panel h2,
  .next-heading h2 {
    color: var(--text-primary);
  }

  .checklist {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 32px;
  }

  .check-item {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 10px;
    align-items: start;
    padding: 15px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-secondary);
    background: var(--bg-subtle);
    font-size: 14px;
    line-height: 1.5;
    transition: border-color 0.15s ease, transform 0.15s ease, background 0.15s ease;
  }

  .check-item:hover {
    transform: translateY(-2px);
    border-color: rgb(var(--primary-rgb) / 0.35);
    background: var(--bg);
  }

  .check {
    color: #0f9f8f;
    font-weight: 800;
  }

  .details-panel {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg);
    box-shadow: var(--shadow-md);
  }

  details + details {
    border-top: 1px solid var(--border);
  }

  summary {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    padding: 22px 24px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
    cursor: pointer;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary span {
    color: var(--primary);
    font-family: system-ui, sans-serif;
    font-size: 24px;
    font-weight: 400;
    transition: transform 0.18s ease;
  }

  details[open] summary span {
    transform: rotate(45deg);
  }

  .detail-copy {
    padding: 0 24px 24px;
  }

  .detail-copy p {
    margin: 0 0 14px;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.75;
  }

  .detail-copy p:last-child {
    margin-bottom: 0;
  }

  .next-section {
    border-block: 1px solid var(--border);
    background: var(--bg-subtle);
    scroll-margin-top: 110px;
  }

  .next-heading {
    max-width: 720px;
    margin-bottom: 42px;
  }

  .next-heading p {
    margin: 16px 0 0;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 1.7;
  }

  .step-layout {
    display: grid;
    grid-template-columns: minmax(300px, 0.7fr) minmax(0, 1fr);
    gap: 24px;
  }

  .step-buttons {
    display: grid;
    gap: 9px;
  }

  .step-buttons button {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 12px;
    align-items: center;
    width: 100%;
    padding: 17px 18px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-secondary);
    background: var(--bg);
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
  }

  .step-buttons button:hover,
  .step-buttons button.active {
    border-color: var(--primary);
    color: var(--text-primary);
    transform: translateX(4px);
  }

  .step-buttons button.active {
    box-shadow: inset 3px 0 0 var(--primary);
  }

  .step-marker {
    width: 8px;
    height: 8px;
    border: 1px solid var(--text-muted);
    border-radius: 50%;
    transition: width 0.18s ease, border-color 0.18s ease, border-radius 0.18s ease, background 0.18s ease;
  }

  .step-buttons button.active .step-marker {
    width: 20px;
    border-color: var(--primary);
    border-radius: 999px;
    background: var(--primary);
  }

  .step-panel {
    min-height: 300px;
    padding: clamp(30px, 5vw, 54px);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background:
      radial-gradient(ellipse 80% 90% at 100% 0%, rgb(var(--teal-rgb) / 0.08), transparent 66%),
      var(--bg);
    box-shadow: var(--shadow-md);
  }

  .step-panel h3 {
    margin: 0 0 16px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: clamp(26px, 3.4vw, 38px);
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .step-panel p {
    max-width: 650px;
    margin: 0;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 1.75;
  }

  .step-panel .btn {
    margin-top: 28px;
  }

  .service-cta {
    padding: 74px 0;
    background: var(--gradient);
  }

  .cta-inner {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    align-items: center;
  }

  .service-cta h2 {
    color: #fff;
  }

  .service-cta p {
    max-width: 680px;
    margin: 12px 0 0;
    color: rgb(255 255 255 / 0.78);
    font-size: 15px;
    line-height: 1.65;
  }

  .service-cta .btn-white {
    background: #fff;
    border-color: #fff;
    color: var(--primary);
    font-weight: 700;
  }

  .service-cta .btn-white:hover {
    background: #f8fafc;
    border-color: #f8fafc;
    color: var(--primary-dark);
  }

  .service-page--missing .service-lede {
    margin-bottom: 24px;
  }

  .service-page--missing {
    min-height: 60vh;
    padding: calc(150px + var(--hv-promo-h)) 0 80px;
  }

  .service-page--missing .service-inner {
    max-width: 720px;
  }

  @media (max-width: 900px) {
    .hero-grid,
    .coverage-grid,
    .step-layout {
      grid-template-columns: 1fr;
    }

    .hero-visual {
      max-width: 680px;
    }

    .details-panel {
      order: -1;
    }
  }

  @media (max-width: 680px) {
    .service-hero {
      padding-bottom: 64px;
    }

    .coverage-section,
    .next-section {
      padding: 72px 0;
    }

    .checklist {
      grid-template-columns: 1fr;
    }

    .cta-inner {
      align-items: flex-start;
      flex-direction: column;
    }

    .service-cta .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
