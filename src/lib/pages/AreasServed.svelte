<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { wvCityPages } from '../data/wvCityPages';

  const countyAndRegionPages = [
    {
      title: 'Greenbrier County, WV',
      href: '/greenbrier-county-wv',
      blurb:
        'Coverage details, town list, and scheduling notes for websites, hosting, software, and IT support in Greenbrier County.',
    },
  ] as const;
</script>

<Navbar />

<main class="as-page">
  <div class="container as-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/#who-we-serve">Who we serve</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Areas served</span>
    </nav>

    <header class="as-header">
      <h1 class="as-h1">Areas served</h1>
      <p class="as-lede">
        HostVerna supports clients nationwide across the United States. This page indexes location-specific coverage pages,
        with West Virginia pages featured where we have active local routing and references.
      </p>
    </header>

    <section class="as-block as-block--highlight" aria-labelledby="nationwide-heading">
      <h2 id="nationwide-heading" class="as-h2">Nationwide coverage</h2>
      <p class="as-p">
        If your city or state is not listed yet, you can still work with us. We handle website projects, managed hosting,
        software workflows, and IT support planning for businesses across the U.S.
      </p>
      <div class="as-cta">
        <a href="/contact" class="btn btn-primary btn-lg">Discuss your location</a>
        <a href="/quick-contact" class="btn btn-secondary btn-lg">Quick contact</a>
      </div>
    </section>

    <section class="as-block" aria-labelledby="county-pages-heading">
      <h2 id="county-pages-heading" class="as-h2">County and regional pages</h2>
      <ul class="as-list">
        {#each countyAndRegionPages as area}
          <li class="as-card">
            <h3 class="as-card-title"><a href={area.href}>{area.title}</a></h3>
            <p class="as-card-copy">{area.blurb}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section class="as-block" aria-labelledby="city-pages-heading">
      <h2 id="city-pages-heading" class="as-h2">Featured West Virginia city pages</h2>
      <ul class="as-list">
        {#each wvCityPages as city}
          <li class="as-card">
            <h3 class="as-card-title"><a href={'/areas-served/' + city.slug}>{city.city}, WV</a></h3>
            <p class="as-card-copy">{city.lede}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section class="as-block as-block--highlight" aria-labelledby="add-area-heading">
      <h2 id="add-area-heading" class="as-h2">Need your area listed?</h2>
      <p class="as-p">
        If your county or region is not shown yet, contact us and share your location. We add pages based on active service
        demand and practical scheduling coverage.
      </p>
      <div class="as-cta">
        <a href="/contact" class="btn btn-primary btn-lg">Contact HostVerna</a>
        <a href="/quick-contact" class="btn btn-secondary btn-lg">Quick contact</a>
      </div>
    </section>
  </div>
</main>

<Footer />

<style>
  .as-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .as-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .as-inner {
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

  .as-header {
    margin-bottom: 30px;
  }

  .as-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .as-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .as-block {
    margin-bottom: 28px;
  }

  .as-block--highlight {
    padding: 22px 20px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .as-h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .as-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0;
  }

  .as-list {
    list-style: none;
    margin: 12px 0 0;
    padding: 0;
    display: grid;
    gap: 14px;
  }

  .as-card {
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 16px;
    background: var(--surface);
  }

  .as-card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.05rem;
    letter-spacing: -0.01em;
  }

  .as-card-title a {
    color: var(--text-primary);
    text-decoration: none;
  }

  .as-card-title a:hover {
    color: var(--primary);
  }

  .as-card-copy {
    margin: 10px 0 0;
    color: var(--text-secondary);
    font-size: 14.5px;
    line-height: 1.65;
  }

  .as-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }
</style>
