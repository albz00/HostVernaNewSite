<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { learnDocs } from '../data/learnPages';
</script>

<svelte:head>
  <title>Resources | HostVerna</title>
  <meta
    name="description"
    content="Blog, documentation, and guides from HostVerna: domains, performance, and how we work with clients."
  />
</svelte:head>

<Navbar />

<main class="res-page">
  <div class="container res-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Resources</span>
    </nav>

    <header class="res-header">
      <h1 class="res-h1">Resources</h1>
      <p class="res-lede">
        Articles, documentation, and the occasional long-form note. Start with the blog or jump into a specific guide.
      </p>
    </header>

    <div class="res-grid">
      <a href="/blog" class="res-tile">
        <span class="res-tile-label">Blog</span>
        <span class="res-tile-title">Ideas &amp; updates</span>
        <span class="res-tile-desc">Notes from the shop on builds, performance, and practical growth.</span>
      </a>
      <a href="/learn" class="res-tile">
        <span class="res-tile-label">Learn</span>
        <span class="res-tile-title">Documentation</span>
        <span class="res-tile-desc">Domains, images &amp; CDN, and how solutions stay tailored to you.</span>
      </a>
      <a href="/greenbrier-county-wv" class="res-tile res-tile--wide">
        <span class="res-tile-label">Local</span>
        <span class="res-tile-title">Greenbrier County, WV</span>
        <span class="res-tile-desc"
          >Areas we serve in the county and how local businesses can request a line on this community page.</span
        >
      </a>
    </div>

    <section class="res-docs">
      <h2 class="res-h2">Guides</h2>
      <ul class="res-doc-list">
        {#each learnDocs as doc}
          <li>
            <a href={`/learn/${doc.slug}`} class="res-doc-link">{doc.title}</a>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</main>

<Footer />

<style>
  .res-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .res-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .res-inner {
    max-width: 800px;
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

  .res-header {
    margin-bottom: 32px;
  }

  .res-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .res-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
    max-width: 560px;
  }

  .res-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-bottom: 44px;
  }

  .res-tile--wide {
    grid-column: 1 / -1;
  }

  @media (max-width: 560px) {
    .res-grid {
      grid-template-columns: 1fr;
    }

    .res-tile--wide {
      grid-column: auto;
    }
  }

  .res-tile {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px 22px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    text-decoration: none;
    transition:
      border-color 0.15s ease,
      background 0.15s ease;
  }

  .res-tile:hover {
    border-color: #cbd5e1;
    background: var(--bg);
  }

  .res-tile-label {
    font-size: 11px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--primary);
  }

  .res-tile-title {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  .res-tile-desc {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .res-h2 {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 14px;
  }

  .res-doc-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .res-doc-link {
    font-size: 15px;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
  }

  .res-doc-link:hover {
    text-decoration: underline;
  }
</style>
