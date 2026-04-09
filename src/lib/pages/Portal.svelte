<script lang="ts">
  /**
   * Flip to `true` when real login URLs are ready (set `VITE_*` in `.env`).
   * Until then this route is a layout-only mockup.
   */
  const live = false;

  const clientPortalUrl = (import.meta.env.VITE_CLIENT_PORTAL_URL ?? '').trim();
  const honeybookPortalUrl = (
    import.meta.env.VITE_HONEYBOOK_PORTAL_URL ?? 'https://app.honeybook.com/login'
  ).trim();

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
</script>

<svelte:head>
  <title>Portal | HostVerna</title>
  <meta name="description" content="HostVerna client portal and Honeybook sign-in (preview)." />
</svelte:head>

<div class="portal">
  <header class="portal-header">
    <a href="/" class="logo">
      <span class="logo-host">Host</span><span class="logo-verna">Verna</span>
    </a>
    <div class="portal-header-right">
      <a href={phoneHref} class="portal-phone">{phoneDisplay}</a>
      <a href="/contact" class="portal-help">Need help?</a>
    </div>
  </header>

  <main class="portal-main">
    <div class="portal-intro">
      <p class="portal-mock">Preview only: layout mockup, not connected to live logins yet.</p>
      <h1 class="portal-title">Portal</h1>
      <p class="portal-lead">Choose where you’ll sign in: HostVerna directly or Honeybook.</p>
    </div>

    <div class="portal-cards">
      <article class="portal-card">
        <h2 class="portal-card-title">HostVerna client portal</h2>
        <p class="portal-card-desc">
          Direct HostVerna access for project updates, files, and anything we host for you outside of
          Honeybook.
        </p>
        {#if live && clientPortalUrl}
          <a
            href={clientPortalUrl}
            class="btn btn-primary portal-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open client portal
          </a>
        {:else}
          <button type="button" class="btn btn-primary portal-cta" disabled aria-disabled="true">
            Open client portal
          </button>
          <p class="portal-note">Placeholder: wiring comes when this goes live.</p>
        {/if}
      </article>

      <article class="portal-card portal-card--alt">
        <h2 class="portal-card-title">Honeybook workspace</h2>
        <p class="portal-card-desc">
          For engagements that run through Honeybook: contracts, invoices, and messages in one place.
        </p>
        {#if live}
          <a
            href={honeybookPortalUrl}
            class="btn btn-secondary portal-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Honeybook
          </a>
        {:else}
          <button type="button" class="btn btn-secondary portal-cta" disabled aria-disabled="true">
            Open Honeybook
          </button>
          <p class="portal-note">Placeholder: wiring comes when this goes live.</p>
        {/if}
      </article>
    </div>

    <p class="portal-back">
      <a href="/">← Back to HostVerna</a>
    </p>
  </main>
</div>

<style>
  .portal {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text-primary);
  }

  .portal-header {
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
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .portal-header-right {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: flex-end;
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

  .portal-phone {
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

  .portal-phone:hover {
    background: rgba(3, 105, 161, 0.08);
  }

  .portal-help {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: var(--radius-tile-sm);
    transition: color 0.15s ease, background 0.15s ease;
  }

  .portal-help:hover {
    color: var(--text-primary);
    background: var(--bg-subtle);
  }

  .portal-main {
    max-width: 720px;
    margin: 0 auto;
    padding: clamp(32px, 6vw, 56px) 20px 48px;
  }

  .portal-intro {
    text-align: center;
    margin-bottom: clamp(28px, 5vw, 40px);
  }

  .portal-mock {
    display: inline-block;
    margin: 0 0 14px;
    padding: 6px 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    color: var(--text-muted);
    background: var(--bg-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
  }

  .portal-title {
    font-family: var(--font-display);
    font-size: clamp(28px, 5vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0 0 12px;
    color: var(--text-primary);
  }

  .portal-lead {
    margin: 0;
    font-size: clamp(15px, 1.6vw, 17px);
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  .portal-cards {
    display: grid;
    gap: 20px;
  }

  @media (min-width: 640px) {
    .portal-cards {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: stretch;
    }
  }

  .portal-card {
    padding: 24px 22px 26px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .portal-card--alt {
    background: var(--bg);
  }

  .portal-card-title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
    color: var(--text-primary);
  }

  .portal-card-desc {
    margin: 0 0 20px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-secondary);
    flex: 1;
  }

  .portal-cta {
    width: 100%;
    justify-content: center;
    margin-top: auto;
  }

  .portal-cta:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .portal-note {
    margin: 12px 0 0;
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
  }

  .portal-back {
    margin: clamp(32px, 5vw, 44px) 0 0;
    text-align: center;
    font-size: 14px;
  }

  .portal-back a {
    color: var(--text-secondary);
    font-weight: 500;
    text-decoration: none;
    border-radius: var(--radius-tile-sm);
    padding: 4px 8px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .portal-back a:hover {
    color: var(--primary);
    background: rgba(3, 105, 161, 0.06);
  }
</style>
