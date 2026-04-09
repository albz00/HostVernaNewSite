<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  const mockPosts = [
    {
      title: 'What “ownership” means when we hand off a site',
      date: 'Coming soon',
      excerpt: 'A plain-language note on code, hosting, and what you can change without calling us for every comma.',
    },
    {
      title: 'Why we ask fewer questions in discovery than you expect',
      date: 'Coming soon',
      excerpt: 'Spoiler: we are trying to find the constraint that actually matters, not fill a 40-field form.',
    },
    {
      title: 'Checklists we actually use before launch',
      date: 'Coming soon',
      excerpt: 'Security basics, broken links, and the embarrassing typo pass. Mockup listing for now.',
    },
  ];
</script>

<svelte:head>
  <title>Blog | HostVerna</title>
  <meta name="description" content="Articles and updates from HostVerna. Mockup listing; subscribe or check back for real posts." />
</svelte:head>

<Navbar />

<main class="blog-page">
  <div class="container blog-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="/resources">Resources</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Blog</span>
    </nav>

    <header class="blog-header">
      <p class="blog-badge">Mockup</p>
      <h1 class="blog-h1">Blog</h1>
      <p class="blog-lede">
        Longer-form notes on how we build, what we have learned, and what matters for small and mid-sized businesses online.
        Real posts will replace these placeholders when we publish.
      </p>
    </header>

    <ul class="blog-list">
      {#each mockPosts as post}
        <li class="blog-card">
          <span class="blog-card-date">{post.date}</span>
          <h2 class="blog-card-title">{post.title}</h2>
          <p class="blog-card-excerpt">{post.excerpt}</p>
          <span class="blog-card-faux">Read (soon)</span>
        </li>
      {/each}
    </ul>

    <p class="blog-footer-links">
      <a href="/learn" class="blog-link">Documentation</a>
      <span class="blog-sep" aria-hidden="true">·</span>
      <a href="/resources" class="blog-link">Resources home</a>
    </p>
  </div>
</main>

<Footer />

<style>
  .blog-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .blog-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .blog-inner {
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

  .blog-header {
    margin-bottom: 36px;
  }

  .blog-badge {
    display: inline-block;
    font-size: 11px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--teal);
    background: rgb(13 148 136 / 0.12);
    border: 1px solid rgb(13 148 136 / 0.25);
    padding: 5px 10px;
    border-radius: var(--radius-tile-sm);
    margin: 0 0 14px;
  }

  .blog-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .blog-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .blog-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .blog-card {
    padding: 22px 24px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg-subtle);
  }

  .blog-card-date {
    font-size: 11px;
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .blog-card-title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 8px 0 10px;
    letter-spacing: -0.02em;
  }

  .blog-card-excerpt {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 12px;
  }

  .blog-card-faux {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .blog-footer-links {
    margin-top: 40px;
    font-size: 14px;
  }

  .blog-link {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .blog-link:hover {
    text-decoration: underline;
  }

  .blog-sep {
    margin: 0 8px;
    color: var(--text-muted);
  }
</style>
