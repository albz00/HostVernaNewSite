<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<Navbar />

<main class="careers-page">
  <div class="container careers-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Careers</span>
    </nav>

    <header class="careers-header">
      <h1 class="careers-h1">Careers at HostVerna</h1>
      <p class="careers-lede">
        We value builders who care about quality, reliability, and straightforward communication.
      </p>
    </header>

    <section class="status-card" aria-live="polite">
      <p class="status-eyebrow">Current status</p>
      <h2 class="status-title">No jobs posted right now</h2>
      <p class="status-text">
        As of today, we do not have any active job openings. When positions become available, this page will be updated
        first.
      </p>
      <div class="status-actions">
        <a href="/contact" class="btn btn-primary">Contact us</a>
        <a href="/" class="btn btn-secondary">Back to home</a>
      </div>
    </section>
  </div>
</main>

<Footer />

<style>
  .careers-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 80px;
    min-height: 55vh;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
  }

  @media (min-width: 901px) {
    .careers-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .careers-inner {
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

  .careers-header {
    margin-bottom: 30px;
  }

  .careers-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 12px;
    line-height: 1.15;
  }

  .careers-lede {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  .status-card {
    border: 1px solid var(--border);
    background: var(--bg);
    border-radius: var(--radius-tile);
    padding: 30px;
    box-shadow: var(--shadow-sm);
  }

  .status-eyebrow {
    margin: 0 0 10px;
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .status-title {
    margin: 0 0 12px;
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .status-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    max-width: 64ch;
  }

  .status-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
  }

  @media (max-width: 640px) {
    .status-card {
      padding: 24px 20px;
    }
  }
</style>
