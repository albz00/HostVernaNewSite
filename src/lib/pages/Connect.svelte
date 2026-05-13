<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  const mailTo = 'info@hostverna.com';
  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';

  const mailPeerHref = `mailto:${mailTo}?subject=${encodeURIComponent(
    'Hello from the Connect page'
  )}&body=${encodeURIComponent(
    'Hi HostVerna,\n\nI found you through a site you built (or I am reaching out as another shop). I would love to connect or ask a quick question:\n\n\n'
  )}`;
</script>

<svelte:head>
  <title>Connect | HostVerna</title>
  <meta
    name="description"
    content="Landed here from a site we built, or curious as a fellow web team? Say hello. We are happy to connect, collaborate, or answer questions."
  />
</svelte:head>

<Navbar />

<main class="connect-page">
  <div class="connect-glow" aria-hidden="true"></div>

  <div class="container connect-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Connect</span>
    </nav>

    <header class="connect-hero">
      <h1 class="connect-h1">
        So you found your way here. <span class="connect-h1-accent">Glad you did.</span>
      </h1>
      <p class="connect-lede">
        Maybe you were clicking through from a client site we worked on and liked what you saw. Maybe you run another web
        or design shop and want to trade notes, refer work, or ask something technical. Either way, we are listening.
      </p>
    </header>

    <div class="connect-bento">
      <section class="connect-card connect-card--wide" aria-labelledby="connect-clients-heading">
        <h2 id="connect-clients-heading" class="connect-h2">If you are browsing our work</h2>
        <p class="connect-p">
          We treat every build like a long-term asset: clear structure, fast loads, and something you are proud to put
          your name on. If something on a project we shipped inspired you, we would love to hear what stood out. No pitch,
          no obligation, just humans who care about the craft.
        </p>
      </section>

      <section class="connect-card" aria-labelledby="connect-peers-heading">
        <h2 id="connect-peers-heading" class="connect-h2">If you are in the industry</h2>
        <p class="connect-p">
          We respect good operators. White-label help, overflow work, a second opinion on a stack choice, or an intro over
          coffee (even virtual): we are open to real conversations with other teams who ship quality.
        </p>
      </section>

      <aside class="connect-card connect-card--cta" aria-labelledby="connect-cta-heading">
        <h2 id="connect-cta-heading" class="connect-sr-only">How to reach us</h2>
        <p class="connect-cta-tag">I am all ears</p>
        <ul class="connect-actions">
          <li>
            <a href={mailPeerHref} class="btn btn-primary btn-lg connect-btn-full">Email us directly</a>
            <span class="connect-action-note">Opens your mail app with a starter message you can edit however you like.</span>
          </li>
          <li>
            <a href="/contact" class="btn btn-secondary btn-lg connect-btn-full">Full project contact form</a>
            <span class="connect-action-note">For scoped work, timelines, and getting on our radar the structured way.</span>
          </li>
          <li class="connect-phone-row">
            <span class="connect-phone-label">Prefer voice?</span>
            <a href={phoneHref} class="connect-phone">{phoneDisplay}</a>
          </li>
        </ul>
      </aside>
    </div>

    <p class="connect-footnote">
      <a href="/" class="connect-footnote-link">Back to HostVerna home</a>
      <span class="connect-footnote-sep" aria-hidden="true">·</span>
      <a href="/about" class="connect-footnote-link">About us</a>
    </p>
  </div>
</main>

<Footer />

<style>
  .connect-page {
    position: relative;
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 72px;
    min-height: 55vh;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    overflow: hidden;
  }

  @media (min-width: 901px) {
    .connect-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .connect-glow {
    pointer-events: none;
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: min(900px, 100vw);
    height: 320px;
    background: radial-gradient(
      ellipse 70% 60% at 50% 0%,
      rgb(3 105 161 / 0.14) 0%,
      rgb(13 148 136 / 0.08) 45%,
      transparent 70%
    );
    filter: blur(2px);
  }

  .connect-inner {
    position: relative;
    max-width: 960px;
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

  .connect-hero {
    margin-bottom: 40px;
    text-align: center;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .connect-h1 {
    font-family: var(--font-display);
    font-size: clamp(26px, 4.2vw, 42px);
    font-weight: 700;
    letter-spacing: -0.035em;
    color: var(--text-primary);
    line-height: 1.12;
    margin: 0 0 16px;
  }

  .connect-h1-accent {
    background: var(--gradient-text);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  .connect-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin: 0;
  }

  .connect-bento {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'wide wide'
      'peer cta';
    gap: 16px;
    align-items: stretch;
  }

  .connect-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 26px 28px;
    box-shadow: var(--shadow-tile);
  }

  .connect-card--wide {
    grid-area: wide;
  }

  .connect-card--cta {
    grid-area: cta;
    background: linear-gradient(165deg, var(--bg) 0%, rgb(248 250 252 / 0.92) 100%);
    border-color: rgb(3 105 161 / 0.18);
    display: flex;
    flex-direction: column;
  }

  .connect-card:nth-child(2) {
    grid-area: peer;
  }

  .connect-h2 {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 10px;
  }

  .connect-p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.72;
    margin: 0;
  }

  .connect-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .connect-cta-tag {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 18px;
    line-height: 1.2;
  }

  .connect-actions {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    flex: 1;
  }

  .connect-btn-full {
    display: block;
    width: 100%;
    text-align: center;
    text-decoration: none;
  }

  .connect-action-note {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.45;
  }

  .connect-phone-row {
    margin-top: auto;
    padding-top: 8px;
    border-top: 1px dashed var(--border);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .connect-phone-label {
    font-size: 11px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }

  .connect-phone {
    font-size: 17px;
    font-weight: 700;
    font-family: var(--font-display);
    color: var(--primary);
    text-decoration: none;
  }

  .connect-phone:hover {
    color: var(--teal-dark);
  }

  .connect-footnote {
    margin-top: 36px;
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
  }

  .connect-footnote-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
  }

  .connect-footnote-link:hover {
    color: var(--primary);
  }

  .connect-footnote-sep {
    margin: 0 10px;
    opacity: 0.45;
  }

  @media (max-width: 720px) {
    .connect-bento {
      grid-template-columns: 1fr;
      grid-template-areas:
        'wide'
        'peer'
        'cta';
    }

    .connect-card {
      padding: 22px 20px;
    }

    .connect-hero {
      text-align: left;
    }
  }
</style>
