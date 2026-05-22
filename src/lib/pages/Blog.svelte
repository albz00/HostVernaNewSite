<script lang="ts">
  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
</script>

<div class="blog">
  <header class="blog-header">
    <a href="/" class="logo">
      <span class="logo-host">Host</span><span class="logo-verna">Verna</span>
    </a>
    <a href={phoneHref} class="blog-phone">{phoneDisplay}</a>
  </header>

  <main class="blog-main">
    <div class="blog-locked" role="status">
      <h1 class="blog-title">Blog is locked</h1>
      <p class="blog-lead">
        This page isn’t open to visitors. When we publish articles, they’ll appear here. Questions in the meantime?
        Call or email us and we’ll point you the right way.
      </p>
      <div class="blog-actions">
        <a href="/" class="btn btn-primary blog-cta">Return to site</a>
        <a href="/contact" class="btn btn-secondary blog-cta">Contact</a>
      </div>
    </div>
  </main>
</div>

<style>
  .blog {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text-primary);
  }

  .blog-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 20px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
  }

  .logo-host {
    color: #0369a1;
  }

  .logo-verna {
    color: #0d9488;
  }

  .blog-phone {
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
    color: var(--primary);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: var(--radius-tile-sm);
    transition: background 0.15s ease;
  }

  .blog-phone:hover {
    background: rgba(3, 105, 161, 0.08);
  }

  .blog-main {
    max-width: 520px;
    margin: 0 auto;
    padding: clamp(40px, 10vh, 80px) 20px 48px;
  }

  .blog-locked {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .blog-title {
    font-family: var(--font-display);
    font-size: clamp(26px, 5vw, 36px);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--text-primary);
  }

  .blog-lead {
    margin: 0;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .blog-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 8px;
  }

  .blog-cta {
    margin-top: 0;
  }
</style>
