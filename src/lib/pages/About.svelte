<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<Navbar />

<main class="about-page">
  <div class="container about-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">About</span>
    </nav>

    <header class="about-header">
      <h1 class="about-h1">About HostVerna</h1>
      <p class="about-lede">
        We build professional web presence, reliable hosting, and practical technology systems. This page explains how we
        work, what we commit to, and who leads delivery.
      </p>
    </header>

    <section class="about-block">
      <h2 class="about-h2">HostVerna and where we came from</h2>
      <p class="about-p">
        The business was originally formed as <strong>A to Z Digital LLC</strong>. <strong>HostVerna</strong> is our
        operating name (DBA). We began with graphic design work, then shifted into websites and long-term digital systems
        because clients needed stronger operational outcomes.
      </p>
      <p class="about-p about-p--tight">
        We have been in this space long enough to understand practical delivery constraints. Many clients rely on us for
        systems that remain stable, clear, and maintainable.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">Partnership, not a one-off invoice</h2>
      <p class="about-p">
        We approach engagements as long-term partnerships. We look for the highest-impact improvements, communicate clearly
        when something is not a fit, and stay realistic about scope and outcomes. A website supports business growth, but
        it does not replace operational execution.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">What we owe you</h2>
      <p class="about-p">
        Our promise to every customer is to be as attentive and respectful as we can, and to earn your trust instead of
        demanding it: clear communication, realistic timelines, and advice that matches what we actually know how to
        deliver.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">Long-term fit, without a trap</h2>
      <p class="about-p">
        Our builds are ownership-based. Your site becomes a transferable business asset instead of a permanent rental. Many
        clients stay with us long term, but we do not rely on lock-in. When ongoing support is needed, we keep it clear;
        when you choose to transition, documentation and access are already in place.
      </p>
    </section>

    <section class="about-block about-block--lead">
      <h2 class="about-h2">Who leads the work</h2>
      <div class="about-portrait">
        <img
          src="https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/77b59288-2c14-4e34-1c5d-6c97c0363200/public"
          alt="Alex Zimmerman"
          width="560"
          height="700"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p class="about-p">
        HostVerna is led by <strong>Alex Zimmerman</strong>. He started hands-on in tech early, then moved into paid work
        in his teens across web, software, infrastructure, and operations. As his scope grew, he led multiple software
        development teams and managed projects from planning through delivery. That early run built practical judgment in
        execution, leadership, and market fit.
      </p>
      <p class="about-p about-p--tight">
        Alex has long been involved in cybersecurity, IT, and software development, including work supporting government
        entities and other high-accountability environments. Credentials help, but the core value comes from continuous
        hands-on production work solving real operational issues.
      </p>
      <p class="about-p about-p--tight">
        Before moving full time into HostVerna, he served in a <strong>Senior IT</strong> role supporting
        <strong>Global HR</strong> and <strong>DISA Global Solutions</strong>, where reliability, security, and response
        time were non-negotiable.
      </p>
      <p class="about-p about-p--tight">
        At DISA, Alex supported integrations between applicant tracking systems and internal hiring infrastructure,
        resolving complex cases across national-scale hiring programs. We do not list specific end-employer names here
        to avoid implying endorsements.
      </p>
      <p class="about-p about-p--tight">
        The through-line across all of this is straightforward: direct accountability, clear communication, and work
        designed to hold up in production.
      </p>
    </section>

    <div class="about-cta">
      <a href="/contact" class="btn btn-primary btn-lg">Get in touch</a>
      <a href="/" class="btn btn-secondary btn-lg">Home</a>
    </div>
  </div>
</main>

<Footer />

<style>
  .about-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .about-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .about-inner {
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

  .about-header {
    margin-bottom: 36px;
  }

  .about-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .about-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .about-block {
    margin-bottom: 28px;
  }

  .about-block--lead .about-h2 {
    margin-bottom: 16px;
  }

  .about-portrait {
    max-width: min(280px, 100%);
    margin: 0 0 22px;
    border-radius: var(--radius-tile);
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    background: var(--bg-subtle);
  }

  .about-portrait img {
    display: block;
    width: 100%;
    height: auto;
  }

  .about-h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .about-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0;
  }

  .about-p--tight {
    margin-top: 14px;
  }

  .about-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }
</style>
