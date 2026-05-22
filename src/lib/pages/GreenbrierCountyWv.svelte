<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  /** Larger towns and common service-area names in Greenbrier County, WV */
  const areas = [
    'Lewisburg',
    'White Sulphur Springs',
    'Ronceverte',
    'Rainelle',
    'Rupert',
    'Meadow Bridge',
    'Williamsburg & Smoot',
    'Quinwood & eastern ridges',
    'Alderson (Greenbrier side)',
    'Frankford, Renick & Clintonville',
    'Rural routes & surrounding communities county-wide',
  ] as const;
</script>

<Navbar />

<main class="gb-page">
  <div class="container gb-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/resources">Resources</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Greenbrier County, WV</span>
    </nav>

    <header class="gb-header">
      <h1 class="gb-h1">Greenbrier County</h1>
      <p class="gb-lede">
        This is a simple <strong>local resource page</strong> from HostVerna. We are based in the region and want this
        space to stay useful for neighbors: where we show up, and room for <strong>local businesses</strong> who want
        a line on the web next to ours.
      </p>
    </header>

    <section class="gb-block" aria-labelledby="areas-heading">
      <h2 id="areas-heading" class="gb-h2">Areas we cover</h2>
      <p class="gb-p">
        When you hire us for websites, hosting, software, or IT support, travel and on-site work are planned around
        realistic drive times from our base. These are the names people use most often when we schedule visits or calls
        in the county:
      </p>
      <ul class="gb-list">
        {#each areas as place}
          <li>{place}</li>
        {/each}
      </ul>
      <p class="gb-p gb-p--tight">
        If your town is not spelled out here but you are in Greenbrier County, we still want to hear from you. County
        lines on a map do not always match how people describe where they work.
      </p>
    </section>

    <section class="gb-block gb-block--highlight" aria-labelledby="listings-heading">
      <h2 id="listings-heading" class="gb-h2">List your business here</h2>
      <p class="gb-p">
        We can add a short <strong>free line or logo placement</strong> for reputable local businesses that want to be
        associated with this page. Think of it as a neighborhood bulletin, not paid directory spam. You do not need to be
        a HostVerna customer to ask; we just reserve the right to say no if a listing does not fit the tone of the site.
      </p>
      <p class="gb-p gb-p--tight">
        Use our <a href="/contact">contact form</a> and check <strong>Interested in a site listing or ad</strong>, or
        email with your business name, what you do, a link you want shown, and optionally a sentence for context. If you
        write manually, mention <strong>“Greenbrier County page”</strong> so it lands in the right thread.
      </p>
    </section>

    <div class="gb-cta">
      <a href="/contact" class="btn btn-primary btn-lg">Contact HostVerna</a>
      <a href="/quick-contact" class="btn btn-secondary btn-lg">Quick contact</a>
    </div>
  </div>
</main>

<Footer />

<style>
  .gb-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .gb-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .gb-inner {
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

  .gb-header {
    margin-bottom: 32px;
  }

  .gb-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .gb-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .gb-block {
    margin-bottom: 28px;
  }

  .gb-block--highlight {
    padding: 22px 20px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
  }

  .gb-h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .gb-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0;
  }

  .gb-p--tight {
    margin-top: 14px;
  }

  .gb-list {
    margin: 16px 0 0;
    padding-left: 1.25rem;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }

  .gb-list li {
    margin-bottom: 6px;
  }

  .gb-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }
</style>
