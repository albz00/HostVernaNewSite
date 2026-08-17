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
      <h1 class="about-h1">West Virginia technology support with a practical small-business mindset.</h1>
      <p class="about-lede">
        HostVerna is a West Virginia-based technology firm serving businesses that need dependable systems, responsive
        support, and clear guidance without building a large internal IT department.
      </p>
    </header>

    <section class="about-block">
      <h2 class="about-h2">Ongoing IT ownership for accounting and tax firms</h2>
      <p class="about-p">
        HostVerna focuses on managed IT, IRS Security Six implementation, WISP documentation, and tax-season technology
        readiness for accounting and tax professionals.
      </p>
      <p class="about-p about-p--tight">
        That focus is especially well suited to accounting and tax firms, where day-to-day reliability, access management,
        backups, and documented security practices have direct operational importance.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">Your IT department, without building one in-house</h2>
      <p class="about-p">
        We provide the ongoing support and administration small and mid-sized professional firms need: user help, device
        management, cloud accounts, backups, vendor coordination, documentation, and practical technology planning.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">Our operating philosophy</h2>
      <p class="about-p">
        Keep the technology understandable. Standardize what can be standardized. Document the important things. Respond
        when users need help. Improve the environment before busy season forces the issue.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">Practical, local, and accountable</h2>
      <p class="about-p">
        HostVerna is West Virginia-based and serves clients in West Virginia and beyond. We communicate in plain English,
        stay realistic about scope, and focus on technology that supports the business.
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
        HostVerna is led by <strong>Alex Zimmerman</strong>. He started hands-on in technology early and moved into
        infrastructure and IT operations. That work built practical judgment in execution, support, and accountable
        technology management.
      </p>
      <p class="about-p about-p--tight">
        Alex has long been involved in cybersecurity and IT, including work in high-accountability environments.
        Credentials help, but the core value comes from continuous hands-on work solving real operational issues.
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
      <a href="/contact" class="btn btn-primary btn-lg">Schedule a Consultation</a>
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
