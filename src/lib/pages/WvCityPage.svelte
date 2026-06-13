<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { getWvCityPage } from '../data/wvCityPages';

  export let slug: string;

  $: page = getWvCityPage(slug);
</script>

<Navbar />

{#if page}
  <main class="city-page">
    <div class="container city-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/#who-we-serve">Who we serve</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/areas-served">Areas served</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <span class="breadcrumb-current">{page.city}, WV</span>
      </nav>

      <header class="city-header">
        <h1 class="city-h1">{page.h1Title}</h1>
        <p class="city-lede">{page.lede}</p>
      </header>

      <section class="city-block">
        <h2 class="city-h2">Common local service references</h2>
        <p class="city-p">
          Customers typically use these area names and corridors when describing where support is needed:
        </p>
        <ul class="city-list">
          {#each page.localAreas as area}
            <li>{area}</li>
          {/each}
        </ul>
      </section>

      <section class="city-block">
        <h2 class="city-h2">What businesses in {page.city} usually need</h2>
        <ul class="city-list">
          {#each page.commonNeeds as need}
            <li>{need}</li>
          {/each}
        </ul>
      </section>

      <section class="city-block city-block--highlight">
        <h2 class="city-h2">Related resources</h2>
        <p class="city-p">
          Start with the service page that matches your priority, then use quick contact for next-step planning.
        </p>
        <ul class="city-links">
          <li><a href="/services/web-design">Web design services</a></li>
          <li><a href="/services/managed-web-services">Managed web services</a></li>
          <li><a href="/services/business-software-crm">Business software and CRM</a></li>
          <li><a href="/services/it-solutions">IT solutions</a></li>
          <li><a href="/support">Support options</a></li>
          <li><a href="/quick-contact">Quick contact</a></li>
        </ul>
      </section>

      <div class="city-cta">
        <a href="/contact" class="btn btn-primary btn-lg">Contact HostVerna</a>
        <a href="/areas-served" class="btn btn-secondary btn-lg">All service areas</a>
      </div>
    </div>
  </main>
{:else}
  <main class="city-page">
    <div class="container city-inner">
      <h1 class="city-h1">City page not found</h1>
      <p class="city-p">
        We could not find that city coverage page. Return to the <a href="/areas-served">areas served index</a>.
      </p>
    </div>
  </main>
{/if}

<Footer />

<style>
  .city-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .city-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .city-inner {
    max-width: 760px;
  }

  .breadcrumb {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--primary);
  }

  .breadcrumb-sep {
    margin: 0 8px;
    opacity: 0.5;
  }

  .breadcrumb-current {
    color: var(--text-muted);
  }

  .city-header {
    margin-bottom: 30px;
  }

  .city-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .city-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .city-block {
    margin-bottom: 24px;
  }

  .city-block--highlight {
    padding: 20px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .city-h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .city-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0;
  }

  .city-list {
    margin: 12px 0 0;
    padding-left: 1.25rem;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }

  .city-list li {
    margin-bottom: 6px;
  }

  .city-links {
    margin: 12px 0 0;
    padding-left: 1.25rem;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }

  .city-links li {
    margin-bottom: 6px;
  }

  .city-links a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
  }

  .city-links a:hover {
    text-decoration: underline;
  }

  .city-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 34px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
</style>
