<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  const packageItems = [
    {
      title: 'Responsive IT support',
      description: 'One place for your team to turn when devices, accounts, applications, or day-to-day technology get in the way.',
    },
    {
      title: 'Device and account administration',
      description: 'Ongoing help keeping workstations, users, permissions, and access organized as your firm changes.',
    },
    {
      title: 'Microsoft 365 or Google Workspace',
      description: 'Practical administration for email, collaboration tools, multi-factor authentication, and user access.',
    },
    {
      title: 'Backups and vendor coordination',
      description: 'Oversight of essential backups and a technical point of contact when another software or service provider is involved.',
    },
    {
      title: 'Tax-season readiness',
      description: 'Preparation focused on the systems your firm depends on most when deadlines leave little room for disruption.',
    },
    {
      title: 'Ongoing technology planning',
      description: 'Clear recommendations and a practical plan for maintenance, improvements, and upcoming technology needs.',
    },
  ];
</script>

<Navbar />

<main class="pricing-page">
  <section class="pricing-hero">
    <div class="container pricing-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Pricing</span>
      </nav>

      <h1>IT support built around your firm.</h1>
      <p class="hero-lede">
        Our managed IT package combines everyday support with the ongoing administration and planning needed to keep
        your technology organized, dependable, and ready for busy season.
      </p>
      <div class="hero-actions">
        <a href="/contact" class="btn btn-primary btn-lg">Get in contact</a>
        <a href="tel:+13049926568" class="btn btn-secondary btn-lg">Call 304-992-6568</a>
      </div>
    </div>
  </section>

  <section class="package-section" aria-labelledby="package-heading">
    <div class="container package-layout">
      <div class="package-intro">
        <h2 id="package-heading">One accountable IT relationship</h2>
        <p>
          Instead of piecing together help only when something breaks, you get a team that learns your environment and
          helps manage it over time.
        </p>
      </div>

      <div class="package-grid">
        {#each packageItems as item}
          <article class="package-item">
            <span class="check" aria-hidden="true">✓</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="quote-section">
    <div class="container quote-card">
      <div>
        <h2>Pricing starts with a conversation.</h2>
        <p>
          Every firm has a different number of people, devices, locations, applications, and support needs. We learn
          how your firm works, define the right scope, and provide a clear proposal without forcing you into a generic
          tier.
        </p>
      </div>
      <div class="quote-action">
        <a href="/contact" class="btn btn-primary btn-lg">Tell us about your firm</a>
        <span>Direct human reply, usually within one business day.</span>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  .pricing-page {
    background: var(--bg);
  }

  .pricing-hero {
    padding: calc(132px + var(--hv-promo-h)) 0 80px;
    background:
      radial-gradient(circle at 80% 20%, rgb(var(--teal-rgb) / 0.1), transparent 30%),
      radial-gradient(circle at 15% 10%, rgb(var(--primary-rgb) / 0.08), transparent 34%),
      var(--bg-subtle);
    border-bottom: 1px solid var(--border);
  }

  .pricing-hero-inner {
    max-width: 900px;
  }

  .breadcrumb {
    display: flex;
    gap: 8px;
    margin-bottom: 42px;
    font-size: 13px;
    color: var(--text-muted);
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--primary);
  }

  h1 {
    max-width: 780px;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(38px, 7vw, 64px);
    font-weight: 750;
    line-height: 1.03;
    letter-spacing: -0.045em;
    color: var(--text-primary);
  }

  .hero-lede {
    max-width: 720px;
    margin: 24px 0 0;
    font-size: clamp(17px, 2vw, 20px);
    line-height: 1.65;
    color: var(--text-secondary);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 32px;
  }

  .package-section {
    padding: 88px 0;
  }

  .package-layout {
    display: grid;
    grid-template-columns: minmax(240px, 0.75fr) minmax(0, 1.5fr);
    gap: 72px;
    align-items: start;
  }

  .package-intro {
    position: sticky;
    top: 120px;
  }

  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 38px);
    line-height: 1.15;
    letter-spacing: -0.035em;
    color: var(--text-primary);
  }

  .package-intro p,
  .quote-card p {
    margin: 18px 0 0;
    font-size: 15px;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .package-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .package-item {
    display: flex;
    gap: 14px;
    min-height: 190px;
    padding: 26px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .check {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    border-radius: 50%;
    background: rgb(var(--teal-rgb) / 0.12);
    color: var(--teal);
    font-size: 13px;
    font-weight: 800;
  }

  .package-item h3 {
    margin: 2px 0 9px;
    font-family: var(--font-display);
    font-size: 16px;
    letter-spacing: -0.015em;
    color: var(--text-primary);
  }

  .package-item p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--text-secondary);
  }

  .quote-section {
    padding: 0 0 88px;
  }

  .quote-card {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(250px, 0.6fr);
    gap: 64px;
    align-items: end;
    padding: 48px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-sm);
  }

  .quote-action {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .quote-action span {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
  }

  @media (min-width: 901px) {
    .pricing-hero {
      padding-top: calc(164px + var(--hv-promo-h));
    }
  }

  @media (max-width: 800px) {
    .package-layout,
    .quote-card {
      grid-template-columns: 1fr;
      gap: 36px;
    }

    .package-intro {
      position: static;
    }
  }

  @media (max-width: 580px) {
    .pricing-hero {
      padding-bottom: 60px;
    }

    .breadcrumb {
      margin-bottom: 30px;
    }

    .package-section {
      padding: 64px 0;
    }

    .package-grid {
      grid-template-columns: 1fr;
    }

    .package-item {
      min-height: 0;
      padding: 22px;
    }

    .quote-card {
      padding: 30px 24px;
    }

    .quote-action .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
