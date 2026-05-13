<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';

  let name = '';
  let email = '';
  let phone = '';
  let submitted = false;

  function emailOk(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !emailOk(email)) return;
    submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>Quick contact | HostVerna</title>
  <meta
    name="description"
    content="Reach out in a few fields for a fast response from HostVerna."
  />
</svelte:head>

<Navbar />

<main class="qc-page">
  <div class="container qc-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Quick contact</span>
    </nav>

    {#if submitted}
      <div class="qc-card qc-success" role="status">
        <div class="qc-badge">Request received</div>
        <h1 class="qc-h1">Got it</h1>
        <p class="qc-lede">
          Thanks for reaching out. Our team will review your details and follow up shortly.
        </p>
        <p class="qc-lede qc-lede-tight">
          Prefer voice? <a href={phoneHref}>{phoneDisplay}</a>
        </p>
        <div class="qc-actions">
          <button type="button" class="btn btn-secondary" on:click={() => (submitted = false)}>Edit details</button>
          <a href="/" class="btn btn-primary">Home</a>
        </div>
        <p class="qc-footnote">
          Need the full guided form? <a href="/contact">Full contact</a>
        </p>
      </div>
    {:else}
      <header class="qc-header">
        <h1 class="qc-h1">Quick contact</h1>
        <p class="qc-lede">
          Name, email, and phone. That is it.
        </p>
      </header>

      <form class="qc-card" on:submit={handleSubmit} novalidate>
        <div class="field-stack">
          <label class="field">
            <span class="field-label">Name <span class="req">*</span></span>
            <input class="field-input" type="text" name="name" autocomplete="name" bind:value={name} required />
          </label>
          <label class="field">
            <span class="field-label">Email <span class="req">*</span></span>
            <input class="field-input" type="email" name="email" autocomplete="email" bind:value={email} required />
          </label>
          <label class="field">
            <span class="field-label">Phone <span class="opt">(optional)</span></span>
            <input class="field-input" type="tel" name="phone" autocomplete="tel" bind:value={phone} />
          </label>
        </div>
        <div class="qc-actions qc-actions-form">
          <button type="submit" class="btn btn-primary" disabled={!name.trim() || !emailOk(email)}>Send</button>
        </div>
        <p class="qc-footnote">
          Or call <a href={phoneHref}>{phoneDisplay}</a> · <a href="/contact">Full contact form</a>
        </p>
      </form>
    {/if}
  </div>
</main>

<Footer />

<style>
  .qc-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 80px;
    min-height: 60vh;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
  }

  @media (min-width: 901px) {
    .qc-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .qc-inner {
    max-width: 520px;
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

  .qc-header {
    margin-bottom: 28px;
    text-align: center;
  }

  .qc-h1 {
    font-family: var(--font-display);
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .qc-lede {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .qc-lede-tight {
    margin-top: 12px;
  }

  .qc-lede a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .qc-lede a:hover {
    text-decoration: underline;
  }

  .qc-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 32px 36px;
    box-shadow: var(--shadow-sm);
  }

  .qc-success .qc-h1 {
    margin-bottom: 10px;
  }

  .qc-badge {
    display: inline-block;
    font-size: 11px;
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .field-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .req {
    color: var(--primary);
  }

  .opt {
    font-weight: 400;
    color: var(--text-muted);
  }

  .field-input {
    font: inherit;
    font-size: 15px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg);
    color: var(--text-primary);
    width: 100%;
  }

  .field-input:focus {
    outline: 2px solid rgb(3 105 161 / 0.25);
    border-color: var(--primary);
  }

  .qc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-top: 24px;
  }

  .qc-actions-form {
    margin-top: 20px;
  }

  .qc-footnote {
    margin: 20px 0 0;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .qc-footnote a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .qc-footnote a:hover {
    text-decoration: underline;
  }

  @media (max-width: 560px) {
    .qc-card {
      padding: 24px 20px;
    }
  }
</style>
