<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { getServicePage } from '../data/servicePages';

  /** e.g. `web-design` */
  export let slug: string;

  $: page = getServicePage(slug);
</script>

<svelte:head>
  {#if page}
    <title>{page.metaTitle}</title>
    <meta name="description" content={page.lede} />
  {:else}
    <title>Not found | HostVerna</title>
  {/if}
</svelte:head>

<Navbar />

{#if page}
  <main class="service-page">
    <div class="container service-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/#services">Services</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <span class="breadcrumb-current">{page.title}</span>
      </nav>

      <h1 class="service-h1">{page.title}</h1>
      <p class="service-lede">{page.lede}</p>

      {#each page.sections as block}
        <section class="service-block">
          <h2 class="service-h2">{block.heading}</h2>
          {#each block.body as para}
            <p class="service-p">{para}</p>
          {/each}
        </section>
      {/each}

      <div class="service-cta">
        <a href="/contact" class="btn btn-primary btn-lg">Get in touch</a>
        <a href="/#services" class="btn btn-secondary btn-lg">All services</a>
      </div>
    </div>
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
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .service-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .service-inner {
    max-width: 720px;
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

  .service-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4.5vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 16px;
    color: var(--text-primary);
  }

  .service-lede {
    font-size: clamp(16px, 1.5vw, 18px);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 36px;
  }

  .service-block {
    margin-bottom: 32px;
  }

  .service-h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 12px;
    color: var(--text-primary);
  }

  .service-p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0 0 14px;
  }

  .service-p:last-child {
    margin-bottom: 0;
  }

  .service-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }

  .service-page--missing .service-lede {
    margin-bottom: 24px;
  }
</style>
