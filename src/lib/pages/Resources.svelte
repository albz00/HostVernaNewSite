<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import ComplianceResources from '../components/ComplianceResources.svelte';
</script>

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
        Practical guidance for accounting and tax firms evaluating security safeguards, written plans, and their
        responsibilities for protecting taxpayer information.
      </p>
    </header>

    <div class="res-grid">
      <a href="/services/irs-security-six" class="res-tile">
        <span class="res-tile-title">IRS Security Six</span>
        <span class="res-tile-desc">Review the six baseline safeguards and how HostVerna helps implement them.</span>
      </a>
      <a href="/services/wisp-services" class="res-tile">
        <span class="res-tile-title">WISP services</span>
        <span class="res-tile-desc">Understand the process for creating or updating a firm-specific written plan.</span>
      </a>
      <a href="/faq" class="res-tile">
        <span class="res-tile-title">Common questions</span>
        <span class="res-tile-desc">Straight answers about Security Six, WISPs, managed IT, and how projects start.</span>
      </a>
    </div>
  </div>

  <ComplianceResources />
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

  @media (max-width: 560px) {
    .res-grid {
      grid-template-columns: 1fr;
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

</style>
