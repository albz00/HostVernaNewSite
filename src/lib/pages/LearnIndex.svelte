<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { learnDocs } from '../data/learnPages';
</script>

<svelte:head>
  <title>Learn | HostVerna</title>
  <meta
    name="description"
    content="Documentation: domain transfers, images and CDN on Cloudflare, and how solutions stay tailored to you."
  />
</svelte:head>

<Navbar />

<main class="learn-page">
  <div class="container learn-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/resources">Resources</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Learn</span>
    </nav>

    <header class="learn-header">
      <h1 class="learn-h1">Learn</h1>
      <p class="learn-lede">
        Straightforward write-ups on how we work: domains, performance, and how projects stay specific to you. More articles
        will land here over time.
      </p>
    </header>

    <ul class="learn-list">
      {#each learnDocs as doc}
        <li class="learn-card">
          <a href="/learn/{doc.slug}" class="learn-card-link">
            <span class="learn-card-title">{doc.title}</span>
            <span class="learn-card-lede">{doc.lede}</span>
          </a>
        </li>
      {/each}
    </ul>

    <p class="learn-back">
      <a href="/blog" class="learn-inline-link">Blog</a>
      <span class="learn-back-sep" aria-hidden="true">·</span>
      <a href="/" class="learn-inline-link">Home</a>
    </p>
  </div>
</main>

<Footer />

<style>
  .learn-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .learn-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .learn-inner {
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

  .learn-header {
    margin-bottom: 32px;
  }

  .learn-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .learn-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .learn-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .learn-card {
    margin: 0;
  }

  .learn-card-link {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 22px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    text-decoration: none;
    transition:
      border-color 0.15s ease,
      background 0.15s ease;
  }

  .learn-card-link:hover {
    border-color: #cbd5e1;
    background: var(--bg);
  }

  .learn-card-title {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  .learn-card-lede {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .learn-back {
    margin-top: 36px;
    font-size: 14px;
    color: var(--text-muted);
  }

  .learn-inline-link {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .learn-inline-link:hover {
    text-decoration: underline;
  }

  .learn-back-sep {
    margin: 0 8px;
  }
</style>
