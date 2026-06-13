<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { greenbrierPlaces } from '../data/greenbrierPlaces';
</script>

<Navbar />

<main class="gb-page">
  <div class="container gb-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/#who-we-serve">Who we serve</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/areas-served">Areas served</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Greenbrier County, WV</span>
    </nav>

    <header class="gb-header">
      <h1 class="gb-h1">Greenbrier County, WV</h1>
      <p class="gb-lede">
        This is a local coverage page under our <a href="/areas-served">Areas served index</a>. It outlines place names and
        scheduling context for Greenbrier County service requests.
      </p>
    </header>

    <section class="gb-block" aria-labelledby="areas-heading">
      <h2 id="areas-heading" class="gb-h2">Greenbrier County, WV</h2>
      <p class="gb-p">
        For websites, hosting, software, and IT support in Greenbrier County, service planning is based on practical travel
        and scheduling. These place pages cover the most common towns and communities used in
        scheduling:
      </p>
      <ul class="gb-list">
        {#each greenbrierPlaces as place}
          <li>
            <a class="gb-place-link" href={'/greenbrier-county-wv/' + place.slug}>{place.name}</a>
          </li>
        {/each}
      </ul>
      <p class="gb-p gb-p--tight">
        If your town is not listed but you are in Greenbrier County, contact us. Service coverage is based on practical
        location and scheduling, not only list wording.
      </p>
    </section>

    <section class="gb-block gb-block--highlight" aria-labelledby="listings-heading">
      <h2 id="listings-heading" class="gb-h2">List your business here</h2>
      <p class="gb-p">
        We can add a short <strong>free line or logo placement</strong> for reputable local businesses that want to be
        associated with this page. You do not need to be a HostVerna customer to request placement. We reserve the right
        to decline listings that do not fit site standards.
      </p>
      <p class="gb-p gb-p--tight">
        Use our <a href="/contact">contact form</a> and check <strong>Interested in a site listing or ad</strong>, or
        email with your business name, what you do, a link you want shown, and optionally a sentence for context. If you
        write manually, mention <strong>“Greenbrier County page”</strong> so we route the request correctly.
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

  .gb-place-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
  }

  .gb-place-link:hover {
    text-decoration: underline;
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
