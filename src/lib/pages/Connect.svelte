<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  const mailTo = 'info@hostverna.com';
  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';

  const mailPeerHref = `mailto:${mailTo}?subject=${encodeURIComponent(
    'Hello from the Connect page'
  )}&body=${encodeURIComponent(
    'Hi HostVerna,\n\nI found you through a site you built (or I am reaching out as another shop). I would love to connect or ask a quick question:\n\n\n'
  )}`;
</script>

<svelte:head>
  <title>Connect | HostVerna</title>
  <meta
    name="description"
    content="Landed here from a site we built, or curious as a fellow web team? Say hello. We are happy to connect, collaborate, or answer questions."
  />
</svelte:head>

<Navbar />

<main class="connect-page">
  <div class="connect-glow" aria-hidden="true"></div>

  <div class="container connect-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Connect</span>
    </nav>

    <article class="business-card" aria-labelledby="connect-card-heading">
      <div class="business-card-top">
        <p class="business-card-kicker">Digital business card</p>
        <h1 id="connect-card-heading" class="connect-h1">HostVerna</h1>
        <p class="business-card-role">Web design, software, and managed IT for businesses that want reliability.</p>
      </div>

      <div class="business-card-grid">
        <section class="business-card-block" aria-label="Contact details">
          <p class="business-card-label">Email</p>
          <a href={mailPeerHref} class="business-card-value">{mailTo}</a>
          <p class="business-card-note">Opens a drafted message so you can edit and send quickly.</p>
        </section>

        <section class="business-card-block" aria-label="Phone details">
          <p class="business-card-label">Phone</p>
          <a href={phoneHref} class="business-card-value">{phoneDisplay}</a>
          <p class="business-card-note">Call or text us directly during business hours.</p>
        </section>

        <section class="business-card-block business-card-block--wide" aria-label="Work style">
          <p class="business-card-label">Built for</p>
          <p class="business-card-copy">
            People finding us through client sites, plus agencies and teams that need a sharp technical partner.
          </p>
        </section>
      </div>

      <div class="business-card-actions">
        <a href={mailPeerHref} class="btn btn-primary btn-lg">Email HostVerna</a>
        <a href="/contact" class="btn btn-secondary btn-lg">Open full contact form</a>
      </div>
    </article>

    <p class="connect-footnote">
      <a href="/" class="connect-footnote-link">Back home</a>
      <span class="connect-footnote-sep" aria-hidden="true">·</span>
      <a href="/about" class="connect-footnote-link">About HostVerna</a>
    </p>
  </div>
</main>

<Footer />

<style>
  .connect-page {
    position: relative;
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 72px;
    min-height: 55vh;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    overflow: hidden;
  }

  @media (min-width: 901px) {
    .connect-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .connect-glow {
    pointer-events: none;
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: min(900px, 100vw);
    height: 320px;
    background: radial-gradient(
      ellipse 70% 60% at 50% 0%,
      rgb(3 105 161 / 0.14) 0%,
      rgb(13 148 136 / 0.08) 45%,
      transparent 70%
    );
    filter: blur(2px);
  }

  .connect-inner {
    position: relative;
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

  .business-card {
    background: linear-gradient(158deg, rgb(255 255 255 / 0.98) 0%, rgb(248 250 252 / 0.96) 100%);
    border: 1px solid rgb(3 105 161 / 0.2);
    border-radius: 22px;
    box-shadow:
      0 24px 48px rgb(2 6 23 / 0.08),
      inset 0 1px 0 rgb(255 255 255 / 0.75);
    padding: clamp(24px, 4vw, 36px);
  }

  .business-card-top {
    border-bottom: 1px solid rgb(148 163 184 / 0.35);
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .business-card-kicker {
    margin: 0 0 10px;
    font-size: 11px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
  }

  .connect-h1 {
    font-family: var(--font-display);
    font-size: clamp(30px, 6vw, 48px);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--text-primary);
    line-height: 1.05;
    margin: 0 0 10px;
  }

  .business-card-role {
    margin: 0;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 560px;
  }

  .business-card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .business-card-block {
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--bg);
    padding: 14px 16px;
  }

  .business-card-block--wide {
    grid-column: 1 / -1;
  }

  .business-card-label {
    margin: 0 0 8px;
    font-size: 11px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--text-muted);
  }

  .business-card-value {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--primary);
    text-decoration: none;
    letter-spacing: -0.015em;
  }

  .business-card-value:hover {
    color: var(--teal-dark);
  }

  .business-card-note {
    margin: 8px 0 0;
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .business-card-copy {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .business-card-actions {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .connect-footnote {
    margin-top: 22px;
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
  }

  .connect-footnote-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
  }

  .connect-footnote-link:hover {
    color: var(--primary);
  }

  .connect-footnote-sep {
    margin: 0 10px;
    opacity: 0.45;
  }

  @media (max-width: 640px) {
    .business-card-grid {
      grid-template-columns: 1fr;
    }

    .business-card {
      border-radius: 18px;
    }
  }
</style>
