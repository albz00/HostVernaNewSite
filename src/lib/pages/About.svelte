<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
  <title>About HostVerna | Partnership &amp; values</title>
  <meta
    name="description"
    content="HostVerna (DBA; founded as A to Z Digital LLC): our story, how we work with clients, and who leads the work."
  />
</svelte:head>

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
        We build professional web presence, credible email, and solid tech. Here is how we think about the relationship,
        what we owe you, and who stands behind the work.
      </p>
    </header>

    <section class="about-block">
      <h2 class="about-h2">HostVerna and where we came from</h2>
      <p class="about-p">
        The business was originally formed as <strong>A to Z Digital LLC</strong>. <strong>HostVerna</strong> is our
        operating name (DBA). We started out doing graphics work. There was steady demand for it at the time, but we moved
        quickly into websites and ongoing digital work because that path offered better traction and long-term stability
        for our clients and for us.
      </p>
      <p class="about-p about-p--tight">
        We have been in this space long enough to understand how it actually works, and we have many customers who rely on
        us day to day: not for buzzwords, but for stuff that stays up, stays clear, and stays maintainable.
      </p>
    </section>

    <section class="about-block">
      <h2 class="about-h2">Partnership, not a one-off invoice</h2>
      <p class="about-p">
        We show up as credible business partners. We grow the relationship over time, look for the missing piece in your
        puzzle, and stay honest when something is not a fit. Some engagements click right away; sometimes it takes a few
        passes; sometimes life gets in the way on either side. We sincerely want things to work, and we know that is not
        always how it goes. We stay straight with you and never pretend a website replaces your hustle.
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
        Our builds are ownership-based: the site can become a real asset that is yours, not a rental you can never leave.
        Plenty of clients stay with us for years because it makes sense, but we never want to lock anyone into a messy,
        full-time dependency. When ongoing help fits, we keep it clean; when you are ready to stand on your own, the work
        is documented so you are not held hostage.
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
        HostVerna is led by <strong>Alex Zimmerman</strong>, who started working with tech around age eight. Within the
        first month of owning a computer he was already port-forwarding, running servers, and learning how things connect.
        By the early teens he was in the website business; from roughly twelve to sixteen he built and led multiple
        ventures with teams. Larger projects leaned heavily into code and software, collaborating with other developers and
        chasing ambitious builds. The through-line is practical systems knowledge, not jargon, and enough experience to
        be realistic about what we take on.
      </p>
      <p class="about-p about-p--tight">
        Alex is a cybersecurity graduate and holds multiple <strong>CompTIA</strong> certifications. The formal path
        matters, but hands-on knowledge built over many years before that still outweighs what came from coursework and
        certs alone. When something breaks in the real world, the depth from those earlier years is what shows up first.
      </p>
      <p class="about-p about-p--tight">
        At 22 he was in a <strong>Senior IT</strong> role for <strong>Global HR</strong> and
        <strong>DISA Global Solutions</strong>, and was a heavy hitter on their team for several years before moving full
        time into HostVerna.
      </p>
      <p class="about-p about-p--tight">
        At DISA, Alex also built and supported integrations between applicant tracking systems (including
        <strong>iCIMS</strong>) and an in-house platform, for national-scale hiring programs. We keep specific end-employer
        names off this page so we are not implying endorsements; the work was live production integration at serious
        volume.
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
