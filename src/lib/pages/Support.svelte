<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { CLIENT_PORTAL_LOGIN_URL } from '../data/siteUrls';

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
</script>

<svelte:head>
  <title>Support | HostVerna</title>
  <meta
    name="description"
    content="Get help with hosting, your site, or software we built for you. Call, email, or open a request through the portal when you have access."
  />
</svelte:head>

<Navbar />

<main class="support-page">
  <div class="container support-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Support</span>
    </nav>

    <h1 class="support-h1">Support</h1>
    <p class="support-lede">
      If something’s down, misbehaving, or unclear, we want to hear about it. Use the options below, and include your
      business name and the fastest way to reach you.
    </p>

    <section class="support-block">
      <h2 class="support-h2">Call</h2>
      <p class="support-p">
        <a href={phoneHref} class="support-phone">{phoneDisplay}</a>
        <span class="support-note"> Same number as sales; say you’re calling for support and we’ll route you.</span>
      </p>
    </section>

    <section class="support-block">
      <h2 class="support-h2">Email</h2>
      <p class="support-p">
        <a href="mailto:support@hostverna.co" class="support-mail">support@hostverna.co</a>
        <span class="support-note">
          For non-urgent issues; include URLs, screenshots, and what you expected to happen.</span
        >
      </p>
    </section>

    <section class="support-block">
      <h2 class="support-h2">Client portal</h2>
      <p class="support-p">
        If your project includes portal access,
        <a href={CLIENT_PORTAL_LOGIN_URL}>log in to the client portal</a> for tickets, files, and status.
      </p>
    </section>

    <section class="support-block">
      <h2 class="support-h2">New projects or pricing</h2>
      <p class="support-p">
        For new work or a consult, use our <a href="/contact">contact form</a> so it lands with the right person.
      </p>
    </section>

    <div class="support-cta">
      <a href="/contact" class="btn btn-primary btn-lg">Contact</a>
      <a href="/" class="btn btn-secondary btn-lg">Home</a>
    </div>
  </div>
</main>

<Footer />

<style>
  .support-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .support-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .support-inner {
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
    border-radius: var(--radius-tile-sm);
    padding: 2px 4px;
    margin: -2px -4px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .breadcrumb a:hover {
    color: var(--primary);
    background: rgba(3, 105, 161, 0.06);
  }

  .breadcrumb-sep {
    margin: 0 6px;
    color: #cbd5e1;
  }

  .breadcrumb-current {
    color: var(--text-secondary);
  }

  .support-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4.5vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 16px;
    color: var(--text-primary);
  }

  .support-lede {
    font-size: clamp(16px, 1.5vw, 18px);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 32px;
  }

  .support-block {
    margin-bottom: 24px;
  }

  .support-h2 {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
    color: var(--text-primary);
  }

  .support-p {
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0;
  }

  .support-p a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .support-p a:hover {
    text-decoration: underline;
  }

  .support-phone,
  .support-mail {
    font-family: var(--font-mono);
    letter-spacing: 0.03em;
  }

  .support-note {
    color: var(--text-muted);
  }

  .support-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
</style>
