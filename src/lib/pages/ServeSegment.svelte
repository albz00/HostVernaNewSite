<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import ComplianceResources from '../components/ComplianceResources.svelte';
  import { getAudienceSegment } from '../data/audienceSegments';

  export let slug: string;

  $: page = getAudienceSegment(slug);
</script>

<Navbar />

{#if page}
  <main class="sector-page">
    <div class="container sector-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/#who-we-serve">Who we serve</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <span class="breadcrumb-current">{page.navTitle}</span>
      </nav>

      <h1 class="sector-h1">{page.title}</h1>
      <p class="sector-lede">{page.lede}</p>

      <section class="coverage-panel">
        <h2 class="coverage-heading">{page.checklistHeading}</h2>
        <div class="coverage-list">
          {#each page.checklist as item}
            <div class="coverage-item"><span aria-hidden="true">✓</span>{item}</div>
          {/each}
        </div>
      </section>

      {#each page.sections as block}
        <section class="sector-block">
          <h2 class="sector-h2">{block.heading}</h2>
          {#each block.body as para}
            <p class="sector-p">{para}</p>
          {/each}
        </section>
      {/each}

      <section class="service-panel">
        <h2 class="sector-h2">Start with the need in front of you.</h2>
        <div class="service-links">
          <a href="/services/it-solutions">Managed IT Services <span>→</span></a>
          <a href="/services/irs-security-six">IRS Security Six <span>→</span></a>
          <a href="/services/wisp-services">WISP Services <span>→</span></a>
        </div>
      </section>

      <section class="next-panel">
        <h2 class="sector-h2">What happens next</h2>
        <div class="next-grid">
          {#each page.nextSteps as step, index}
            <article>
              <span class="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          {/each}
        </div>
      </section>

      <div class="sector-cta">
        <a href="/qualification" class="btn btn-primary btn-lg">Start Firm Qualification</a>
        <a href="/contact" class="btn btn-secondary btn-lg">Request a Discovery Meeting</a>
      </div>
    </div>

    <ComplianceResources />
  </main>
{:else}
  <main class="sector-page">
    <div class="container sector-inner">
      <h1 class="sector-h1">Page not found</h1>
      <p class="sector-p"><a href="/">Back to home</a></p>
    </div>
  </main>
{/if}

<Footer />

<style>
  .sector-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .sector-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .sector-inner {
    max-width: 1040px;
  }

  .breadcrumb {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
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

  .sector-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4.5vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 16px;
    color: var(--text-primary);
  }

  .sector-lede {
    max-width: 760px;
    font-size: clamp(16px, 1.5vw, 18px);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 44px;
  }

  .coverage-panel,
  .service-panel,
  .next-panel {
    margin-bottom: 48px;
    padding: clamp(24px, 4vw, 40px);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg-subtle);
  }

  .coverage-heading {
    max-width: 720px;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: clamp(25px, 3.5vw, 38px);
    line-height: 1.12;
    letter-spacing: -0.03em;
  }

  .coverage-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 28px;
  }

  .coverage-item {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 9px;
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-secondary);
    background: var(--bg);
    font-size: 14px;
    line-height: 1.5;
  }

  .coverage-item span {
    color: #0f9f8f;
    font-weight: 800;
  }

  .sector-block {
    max-width: 820px;
    margin: 0 0 34px;
  }

  .sector-h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 12px;
    color: var(--text-primary);
  }

  .sector-p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0 0 14px;
  }

  .service-panel {
    margin-top: 52px;
    background:
      radial-gradient(ellipse 70% 120% at 100% 0%, rgb(var(--primary-rgb) / 0.09), transparent 70%),
      var(--bg-subtle);
  }

  .service-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 22px;
  }

  .service-links a {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-primary);
    background: var(--bg);
    font-weight: 700;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }

  .service-links a:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  .service-links span,
  .step-number {
    color: var(--primary);
  }

  .next-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 22px;
  }

  .next-grid article {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    background: var(--bg);
  }

  .step-number {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 800;
  }

  .next-grid h3 {
    margin: 8px 0 10px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 18px;
  }

  .next-grid p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.65;
  }

  .sector-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    margin-bottom: 72px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }

  @media (max-width: 700px) {
    .coverage-list,
    .service-links,
    .next-grid {
      grid-template-columns: 1fr;
    }

    .sector-cta {
      margin-bottom: 52px;
    }
  }
</style>
