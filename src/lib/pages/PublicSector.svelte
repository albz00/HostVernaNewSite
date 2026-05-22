<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<Navbar />

<main class="sector-page">
  <div class="container sector-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/#who-we-serve">Who we serve</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Public sector</span>
    </nav>

    <h1 class="sector-h1">Public sector</h1>
    <p class="sector-lede">
      We build sites, internal tools, and integrations for agencies and public entities that buy through formal
      procurement: solicitations, cooperative contracts, and vendor networks.
    </p>

    <section class="sector-block">
      <h2 class="sector-h2">How we work with buyers</h2>
      <p class="sector-p">
        Clear scope, written deliverables, and software you can run without us holding the keys. We’re used to
        procurement timelines and to answering questions from finance and IT when they review a quote or a submittal.
      </p>
    </section>

    <section class="sector-block">
      <h2 class="sector-h2">Vendor networks</h2>
      <p class="sector-p">
        Public-sector teams often find vendors through registration portals and procurement networks. We keep a
        presence in those places so buyers who use platforms like <strong>BidNet Direct</strong>,
        <strong>Procurated</strong>, or similar sites can reach us the same way they already search for partners.
      </p>
      <p class="sector-p">
        If you’re buying through your state system instead, the process is the same: send requirements, constraints,
        and dates, and we’ll respond in kind.
      </p>
    </section>

    <section class="sector-block">
      <h2 class="sector-h2">What we deliver</h2>
      <ul class="sector-list">
        <li>Public-facing sites and microsites, built for accessibility and clarity</li>
        <li>Internal portals, workflows, and hooks into systems you already use</li>
        <li>CRM and line-of-business tools set up for your process, not a default template</li>
        <li>Ongoing support when you want it, with clear ownership of what we ship</li>
      </ul>
    </section>

    <section class="sector-block">
      <h2 class="sector-h2">Contact</h2>
      <p class="sector-p">
        Send a solicitation, RFI, or a short note on what you need. We’ll say if we’re a fit and what a sensible next
        step looks like.
      </p>
    </section>

    <div class="sector-cta">
      <a href="/contact" class="btn btn-primary btn-lg">Get in touch</a>
      <a href="/#services" class="btn btn-secondary btn-lg">Services</a>
    </div>
  </div>
</main>

<Footer />

<style>
  .sector-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .sector-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .sector-inner {
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

  .sector-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4.5vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 16px;
    color: var(--text-primary);
  }

  .sector-lede {
    font-size: clamp(16px, 1.5vw, 18px);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 36px;
  }

  .sector-block {
    margin-bottom: 28px;
  }

  .sector-h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 12px;
    color: var(--text-primary);
  }

  .sector-p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0 0 14px;
  }

  .sector-p:last-child {
    margin-bottom: 0;
  }

  .sector-list {
    margin: 0;
    padding: 0 0 0 1.25rem;
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-secondary);
  }

  .sector-list li {
    margin-bottom: 10px;
  }

  .sector-list li:last-child {
    margin-bottom: 0;
  }

  .sector-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }
</style>
