<script lang="ts">
  export let documentTitle: string;
  export let metaDescription: string;
  export let heading: string;
  export let lead: string;

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
</script>

<svelte:head>
  <title>{documentTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="locked-placeholder">
  <header class="locked-placeholder-header">
    <a href="/" class="logo">
      <span class="logo-host">Host</span><span class="logo-verna">Verna</span>
    </a>
    <a href={phoneHref} class="locked-placeholder-phone">{phoneDisplay}</a>
  </header>

  <main class="locked-placeholder-main">
    <div class="locked-placeholder-inner" role="status">
      <h1 class="locked-placeholder-title">{heading}</h1>
      <p class="locked-placeholder-lead">{lead}</p>
      <a href="/" class="btn btn-primary locked-placeholder-cta">Return to site</a>
    </div>
  </main>
</div>

<style>
  .locked-placeholder {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text-primary);
  }

  .locked-placeholder-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 20px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
  }

  .logo-host {
    color: #0369a1;
  }

  .logo-verna {
    color: #0d9488;
  }

  .locked-placeholder-phone {
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
    color: var(--primary);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: var(--radius-tile-sm);
    transition: background 0.15s ease;
  }

  .locked-placeholder-phone:hover {
    background: rgba(3, 105, 161, 0.08);
  }

  .locked-placeholder-main {
    max-width: 520px;
    margin: 0 auto;
    padding: clamp(40px, 10vh, 80px) 20px 48px;
  }

  .locked-placeholder-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .locked-placeholder-title {
    font-family: var(--font-display);
    font-size: clamp(26px, 5vw, 36px);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--text-primary);
  }

  .locked-placeholder-lead {
    margin: 0;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .locked-placeholder-cta {
    margin-top: 8px;
  }
</style>
