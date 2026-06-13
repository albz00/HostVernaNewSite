<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { getGreenbrierPlace } from '../data/greenbrierPlaces';

  export let slug: string;

  $: place = getGreenbrierPlace(slug);
</script>

<Navbar />

{#if place}
  <main class="gp-page">
    <div class="container gp-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/#who-we-serve">Who we serve</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/areas-served">Areas served</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/greenbrier-county-wv">Greenbrier County, WV</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <span class="breadcrumb-current">{place.name}</span>
      </nav>

      <header class="gp-header">
        <h1 class="gp-h1">{place.h1Title}</h1>
        <p class="gp-lede">
          {place.localIntro}
        </p>
      </header>

      <section class="gp-block">
        <h2 class="gp-h2">Common {place.name} service-area references</h2>
        <p class="gp-p">
          Customers in this area usually describe their location using these routes, districts, and nearby community names.
        </p>
        <ul class="gp-list">
          {#each place.nearbyAreas as nearby}
            <li>{nearby}</li>
          {/each}
        </ul>
      </section>

      <section class="gp-block">
        <h2 class="gp-h2">Services local teams request most</h2>
        <ul class="gp-list">
          {#each place.serviceNotes as note}
            <li>{note}</li>
          {/each}
        </ul>
      </section>

      <section class="gp-block gp-block--highlight">
        <h2 class="gp-h2">Helpful resources for {place.name} businesses</h2>
        <p class="gp-p">
          Linking to relevant internal service pages helps visitors quickly find next steps and gives search engines clearer
          topic relationships across your local pages.
        </p>
        <ul class="gp-resource-list">
          <li><a href="/services/web-design">Web design services</a></li>
          <li><a href="/services/managed-web-services">Managed web services</a></li>
          <li><a href="/services/business-software-crm">Business software and CRM</a></li>
          <li><a href="/support">Support options</a></li>
          <li><a href="/learn">Documentation and guides</a></li>
          <li><a href="/contact">Project contact form</a></li>
        </ul>
      </section>

      <section class="gp-block">
        <h2 class="gp-h2">Part of Greenbrier County coverage</h2>
        <p class="gp-p">
          This location is one part of our county-level area map. For the full place list, return to the
          <a href="/greenbrier-county-wv">Greenbrier County page</a>.
        </p>
      </section>

      <div class="gp-cta">
        <a href="/contact" class="btn btn-primary btn-lg">Contact HostVerna</a>
        <a href="/quick-contact" class="btn btn-secondary btn-lg">Quick contact</a>
      </div>
    </div>
  </main>
{:else}
  <main class="gp-page">
    <div class="container gp-inner">
      <h1 class="gp-h1">Place not found</h1>
      <p class="gp-p">
        We could not find that Greenbrier place page. Use the <a href="/greenbrier-county-wv">county page</a> to pick a
        listed location.
      </p>
    </div>
  </main>
{/if}

<Footer />

<style>
  .gp-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .gp-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .gp-inner {
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

  .gp-header {
    margin-bottom: 30px;
  }

  .gp-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .gp-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .gp-block {
    margin-bottom: 24px;
  }

  .gp-block--highlight {
    padding: 20px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .gp-h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .gp-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0;
  }

  .gp-list {
    margin: 12px 0 0;
    padding-left: 1.25rem;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }

  .gp-list li {
    margin-bottom: 6px;
  }

  .gp-resource-list {
    margin: 12px 0 0;
    padding-left: 1.25rem;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }

  .gp-resource-list li {
    margin-bottom: 6px;
  }

  .gp-resource-list a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
  }

  .gp-resource-list a:hover {
    text-decoration: underline;
  }

  .gp-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 34px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
</style>
