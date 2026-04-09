<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import DocMediaSlot from '../components/DocMediaSlot.svelte';
  import { getLearnDoc, type LearnSection } from '../data/learnPages';

  export let slug: string;

  $: doc = getLearnDoc(slug);

  function slotLabel(section: LearnSection, index: number): string {
    const labels = section.mediaLabels;
    if (labels && labels[index]) return labels[index];
    const n = section.mediaSlots ?? 0;
    if (n <= 1) return 'Add image or diagram';
    return `Add image or diagram (${index + 1} of ${n})`;
  }

  function range(n: number): number[] {
    return [...Array(Math.max(0, n))].map((_, i) => i);
  }
</script>

<svelte:head>
  {#if doc}
    <title>{doc.metaTitle}</title>
    <meta name="description" content={doc.lede} />
  {:else}
    <title>Not found | HostVerna</title>
  {/if}
</svelte:head>

<Navbar />

{#if doc}
  <main class="learn-doc-page">
    <div class="container learn-doc-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/resources">Resources</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <a href="/learn">Documentation</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <span class="breadcrumb-current">{doc.navTitle}</span>
      </nav>

      <article>
        <h1 class="learn-doc-h1">{doc.title}</h1>
        <p class="learn-doc-lede">{doc.lede}</p>

        {#each doc.sections as section}
          <section class="learn-doc-section">
            <h2 class="learn-doc-h2">{section.heading}</h2>
            {#each section.body as para}
              <p class="learn-doc-p">{para}</p>
            {/each}
            {#if section.mediaSlots && section.mediaSlots > 0}
              {#each range(section.mediaSlots) as i}
                <DocMediaSlot label={slotLabel(section, i)} />
              {/each}
            {/if}
          </section>
        {/each}
      </article>

      <p class="learn-doc-nav">
        <a href="/learn" class="learn-doc-back">All documentation</a>
        <span class="learn-doc-sep" aria-hidden="true">·</span>
        <a href="/resources" class="learn-doc-back">Resources</a>
      </p>
    </div>
  </main>
{:else}
  <main class="learn-doc-page learn-doc-page--missing">
    <div class="container learn-doc-inner">
      <h1 class="learn-doc-h1">Page not found</h1>
      <p class="learn-doc-p">That guide does not exist.</p>
      <a href="/learn" class="btn btn-primary">Documentation</a>
    </div>
  </main>
{/if}

<Footer />

<style>
  .learn-doc-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .learn-doc-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .learn-doc-inner {
    max-width: 720px;
  }

  .breadcrumb {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
    line-height: 1.5;
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--primary);
  }

  .breadcrumb-sep {
    margin: 0 6px;
    opacity: 0.5;
  }

  .breadcrumb-current {
    color: var(--text-muted);
  }

  .learn-doc-h1 {
    font-family: var(--font-display);
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .learn-doc-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0 0 32px;
  }

  .learn-doc-section {
    margin-bottom: 32px;
  }

  .learn-doc-h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 12px;
    letter-spacing: -0.02em;
  }

  .learn-doc-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0 0 14px;
  }

  .learn-doc-p:last-child {
    margin-bottom: 0;
  }

  .learn-doc-nav {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    font-size: 14px;
  }

  .learn-doc-back {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .learn-doc-back:hover {
    text-decoration: underline;
  }

  .learn-doc-sep {
    margin: 0 8px;
    color: var(--text-muted);
  }

  .learn-doc-page--missing .learn-doc-p {
    margin-bottom: 20px;
  }
</style>
