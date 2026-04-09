<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { getAudienceSegment } from '../data/audienceSegments';

  export let slug: string;

  $: page = getAudienceSegment(slug);
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

      {#each page.sections as block}
        <section class="sector-block">
          <h2 class="sector-h2">{block.heading}</h2>
          {#each block.body as para}
            <p class="sector-p">{para}</p>
          {/each}
        </section>
      {/each}

      <div class="sector-cta">
        <a href="/contact" class="btn btn-primary btn-lg">Get in touch</a>
        <a href="/#who-we-serve" class="btn btn-secondary btn-lg">Qualifier</a>
      </div>
    </div>
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
    font-size: clamp(16px, 1.5vw, 18px);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 36px;
  }

  .sector-block {
    margin-bottom: 28px;
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

  .sector-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }
</style>
