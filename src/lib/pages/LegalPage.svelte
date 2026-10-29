<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { getLegalPage } from '../data/legalPages';

  export let slug: string;

  $: page = getLegalPage(slug);

  const policyLinks = [
    { label: 'Privacy Policy', href: '/privacy', slug: 'privacy' },
    { label: 'Terms of Service', href: '/terms', slug: 'terms' },
    { label: 'Cookie Policy', href: '/cookies', slug: 'cookies' },
    { label: 'Service Levels', href: '/sla', slug: 'sla' },
  ];
</script>

<Navbar />

<main class="legal-page">
  {#if page}
    <header class="legal-hero">
      <div class="container legal-hero-inner">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <span>{page.title}</span>
        </nav>
        <h1>{page.title}</h1>
        <p class="summary">{page.summary}</p>
        <p class="effective">Effective {page.effectiveDate}</p>
      </div>
    </header>

    <div class="container legal-layout">
      <aside class="legal-sidebar" aria-label="Policy navigation">
        <div class="sidebar-card">
          <nav class="section-nav" aria-label="On this page">
            {#each page.sections as section}
              <a href={`#${section.id}`}>{section.title}</a>
            {/each}
          </nav>
        </div>

        <div class="sidebar-card policy-card">
          <nav class="policy-nav" aria-label="Related policies">
            {#each policyLinks as link}
              <a href={link.href} aria-current={link.slug === slug ? 'page' : undefined}>{link.label}</a>
            {/each}
          </nav>
        </div>
      </aside>

      <article class="legal-content">
        {#each page.sections as section}
          <section id={section.id} class="legal-section">
            <h2>{section.title}</h2>
            {#each section.paragraphs ?? [] as paragraph}
              <p>{paragraph}</p>
            {/each}
            {#if section.bullets}
              <ul>
                {#each section.bullets as item}
                  <li>{item}</li>
                {/each}
              </ul>
            {/if}
            {#if section.note}
              <div class="legal-note">
                <span aria-hidden="true">i</span>
                <p>{section.note}</p>
              </div>
            {/if}
          </section>
        {/each}

        <div class="legal-contact">
          <div>
            <h2>Ask HostVerna directly.</h2>
            <p>We can explain how these terms apply to the website or point current clients to their controlling agreement.</p>
          </div>
          <div class="contact-actions">
            <a href="mailto:info@hostverna.com" class="btn btn-primary">Email us</a>
            <a href="tel:+13049926568" class="btn btn-secondary">304-992-6568</a>
          </div>
        </div>
      </article>
    </div>
  {:else}
    <div class="container legal-missing">
      <h1>Policy not found</h1>
      <p>The policy you requested is not available.</p>
      <a href="/" class="btn btn-primary">Return home</a>
    </div>
  {/if}
</main>

<Footer />

<style>
  .legal-page {
    background: var(--bg);
  }

  .legal-hero {
    padding: calc(132px + var(--hv-promo-h)) 0 70px;
    background:
      radial-gradient(circle at 80% 15%, rgb(var(--teal-rgb) / 0.1), transparent 30%),
      radial-gradient(circle at 10% 15%, rgb(var(--primary-rgb) / 0.08), transparent 34%),
      var(--bg-subtle);
    border-bottom: 1px solid var(--border);
  }

  .legal-hero-inner {
    max-width: 900px;
  }

  .breadcrumb {
    display: flex;
    gap: 8px;
    margin-bottom: 38px;
    color: var(--text-muted);
    font-size: 13px;
  }

  .breadcrumb a {
    color: var(--text-secondary);
  }

  .breadcrumb a:hover {
    color: var(--primary);
  }

  .effective {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h1 {
    max-width: 800px;
    margin: 0;
    color: var(--text-primary);
    font-size: clamp(38px, 7vw, 62px);
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  .summary {
    max-width: 740px;
    margin: 22px 0 0;
    color: var(--text-secondary);
    font-size: clamp(17px, 2vw, 20px);
    line-height: 1.65;
  }

  .effective {
    margin: 24px 0 0;
    color: var(--text-muted);
    font-size: 11px;
  }

  .legal-layout {
    display: grid;
    grid-template-columns: 250px minmax(0, 760px);
    justify-content: space-between;
    gap: 72px;
    padding-top: 72px;
    padding-bottom: 96px;
  }

  .legal-sidebar {
    align-self: start;
    position: sticky;
    top: 112px;
    display: grid;
    gap: 14px;
  }

  .sidebar-card {
    padding: 22px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .section-nav,
  .policy-nav {
    display: flex;
    flex-direction: column;
  }

  .section-nav a,
  .policy-nav a {
    padding: 7px 0;
    color: var(--text-secondary);
    font-size: 12.5px;
    line-height: 1.35;
    transition: color 0.15s ease;
  }

  .section-nav a:hover,
  .policy-nav a:hover {
    color: var(--primary);
  }

  .policy-card {
    background: var(--bg);
  }

  .policy-nav a[aria-current='page'] {
    color: var(--primary);
    font-weight: 700;
  }

  .legal-content {
    min-width: 0;
  }

  .legal-section {
    scroll-margin-top: 120px;
    padding: 0 0 38px;
    margin: 0 0 38px;
    border-bottom: 1px solid var(--border);
  }

  .legal-section h2,
  .legal-contact h2 {
    margin: 0 0 17px;
    color: var(--text-primary);
    font-size: clamp(22px, 3vw, 28px);
    letter-spacing: -0.03em;
  }

  .legal-section p,
  .legal-section li,
  .legal-contact p {
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.78;
  }

  .legal-section > p + p {
    margin-top: 14px;
  }

  .legal-section ul {
    display: grid;
    gap: 10px;
    margin: 16px 0 0;
    padding-left: 21px;
  }

  .legal-section li::marker {
    color: var(--teal);
  }

  .legal-note {
    display: flex;
    gap: 13px;
    margin-top: 20px;
    padding: 18px 20px;
    background: rgb(var(--primary-rgb) / 0.06);
    border-left: 3px solid var(--primary);
    border-radius: var(--radius-tile-quote);
  }

  .legal-note > span {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    margin-top: 2px;
    border: 1px solid rgb(var(--primary-rgb) / 0.28);
    border-radius: 50%;
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
  }

  .legal-note p {
    font-size: 13.5px;
    line-height: 1.65;
  }

  .legal-contact {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 36px;
    align-items: end;
    padding: 34px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .legal-contact h2 {
    margin-bottom: 10px;
  }

  .legal-contact p {
    max-width: 52ch;
    font-size: 13.5px;
    line-height: 1.65;
  }

  .contact-actions {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .legal-missing {
    min-height: 60vh;
    padding-top: calc(160px + var(--hv-promo-h));
    padding-bottom: 80px;
  }

  .legal-missing p {
    margin: 14px 0 24px;
    color: var(--text-secondary);
  }

  @media (min-width: 901px) {
    .legal-hero {
      padding-top: calc(164px + var(--hv-promo-h));
    }
  }

  @media (max-width: 860px) {
    .legal-layout {
      grid-template-columns: 1fr;
      gap: 44px;
    }

    .legal-sidebar {
      position: static;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .legal-hero {
      padding-bottom: 54px;
    }

    .breadcrumb {
      margin-bottom: 30px;
    }

    .legal-layout {
      padding-top: 48px;
      padding-bottom: 72px;
    }

    .legal-sidebar {
      grid-template-columns: 1fr;
    }

    .legal-contact {
      grid-template-columns: 1fr;
      padding: 26px 22px;
    }

    .contact-actions .btn {
      width: 100%;
    }
  }
</style>
