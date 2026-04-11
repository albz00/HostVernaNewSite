<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  let fullName = '';
  let email = '';
  let phone = '';
  let organization = '';

  let sharePostUrl = '';

  type BizRow = { name: string; postUrl: string; proof: string };
  let businesses: BizRow[] = [
    { name: '', postUrl: '', proof: '' },
    { name: '', postUrl: '', proof: '' },
    { name: '', postUrl: '', proof: '' },
  ];

  let submitted = false;
  let error = '';

  function emailOk(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';
    if (!fullName.trim() || !email.trim() || !emailOk(email)) {
      error = 'Please add your name and a valid email.';
      return;
    }
    if (!sharePostUrl.trim()) {
      error = 'Add a link to your public post about this offer or HostVerna.';
      return;
    }
    for (let i = 0; i < businesses.length; i++) {
      const b = businesses[i];
      if (!b.name.trim() || !b.postUrl.trim() || !b.proof.trim()) {
        error = `Complete all fields for local business #${i + 1} (name, post link, and comment proof).`;
        return;
      }
    }
    submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>Free website offer, Summer event | HostVerna</title>
  <meta
    name="description"
    content="Apply for HostVerna's limited free website offer (ends July 1). Submit your details and community proof: a public share plus comments on three local businesses."
  />
</svelte:head>

<Navbar />

<main class="event-page">
  <div class="container event-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Free website event</span>
    </nav>

    <header class="event-hero">
      <p class="event-kicker">Limited event · Ends July 1</p>
      <h1 class="event-h1">Free website offer</h1>
      <p class="event-lede">
        We are running a small number of <strong>no-cost website builds</strong> for qualifying businesses. This page is the
        official application. Tell us who you are, then show us you have spread the word and supported three other
        businesses in public. That is how we keep this fair and community-rooted.
      </p>
    </header>

    {#if submitted}
      <div class="event-card event-card--success" role="status">
        <div class="success-badge">Preview only</div>
        <h2 class="event-h2">We received your application (mockup)</h2>
        <p class="event-p">
          Nothing was sent to a server yet. This flow is a working preview so you can review fields and copy. When we go
          live, submissions will route to our team for review.
        </p>
        <p class="event-p event-p--tight">
          Questions? <a href="/contact">Contact us</a> or call <a href="tel:+13049926568">304-992-6568</a>.
        </p>
        <button type="button" class="btn btn-secondary" on:click={() => (submitted = false)}>Back to form</button>
      </div>
    {:else}
      <section class="event-rules" aria-labelledby="rules-heading">
        <h2 id="rules-heading" class="event-h2">What you need to qualify</h2>
        <ul class="rules-list">
          <li>
            <strong>Your details.</strong> Legal or preferred name, email, and how we can reach you. Organization is
            optional but helps.
          </li>
          <li>
            <strong>One public share.</strong> A link to a post where you shared this offer or HostVerna openly (same
            rules apply when we enable real submissions).
          </li>
          <li>
            <strong>Three local businesses.</strong> For each, the business name, a link to the post you commented on, and
            proof of your comment (paste text, a link to the thread, or a link to a screenshot). Comments should be
            genuine and on-topic, not spam.
          </li>
        </ul>
      </section>

      <form class="event-card event-form" on:submit={handleSubmit} novalidate>
        <h2 class="event-h2">Application</h2>
        {#if error}
          <p class="form-error" role="alert">{error}</p>
        {/if}

        <fieldset class="fieldset">
          <legend class="legend">Your information</legend>
          <div class="field-stack">
            <div class="field">
              <label class="field-label" for="fw-name">Full name <span class="req">*</span></label>
              <input id="fw-name" class="field-input" type="text" autocomplete="name" bind:value={fullName} />
            </div>
            <div class="field">
              <label class="field-label" for="fw-email">Email <span class="req">*</span></label>
              <input id="fw-email" class="field-input" type="email" autocomplete="email" bind:value={email} />
            </div>
            <div class="field">
              <label class="field-label" for="fw-phone">Phone <span class="opt">(optional)</span></label>
              <input id="fw-phone" class="field-input" type="tel" autocomplete="tel" bind:value={phone} />
            </div>
            <div class="field">
              <label class="field-label" for="fw-org">Organization <span class="opt">(optional)</span></label>
              <input id="fw-org" class="field-input" type="text" autocomplete="organization" bind:value={organization} />
            </div>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="legend">Social proof: your share</legend>
          <p class="field-hint">
            Paste a public URL to a post where you shared this offer or HostVerna. The post must be visible without a
            private follow.
          </p>
          <div class="field">
            <label class="field-label" for="fw-share">Link to your post <span class="req">*</span></label>
            <input
              id="fw-share"
              class="field-input"
              type="url"
              inputmode="url"
              placeholder="https://…"
              bind:value={sharePostUrl}
            />
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="legend">Comments on three businesses</legend>
          <p class="field-hint">
            Choose three different businesses. For each, leave a real comment on one of their public posts, then show us
            the post link and proof of what you wrote (or a screenshot link).
          </p>
          {#each businesses as _, i}
            <div class="biz-block">
              <h3 class="biz-title">Business {i + 1}</h3>
              <div class="field-stack">
                <div class="field">
                  <label class="field-label" for="fw-bn-{i}">Business name <span class="req">*</span></label>
                  <input id="fw-bn-{i}" class="field-input" type="text" bind:value={businesses[i].name} />
                </div>
                <div class="field">
                  <label class="field-label" for="fw-bu-{i}">Link to their post you commented on <span class="req">*</span></label>
                  <input
                    id="fw-bu-{i}"
                    class="field-input"
                    type="url"
                    inputmode="url"
                    placeholder="https://…"
                    bind:value={businesses[i].postUrl}
                  />
                </div>
                <div class="field">
                  <label class="field-label" for="fw-bp-{i}"
                    >Your comment or proof <span class="req">*</span> <span class="opt">(text, thread link, or image URL)</span></label
                  >
                  <textarea id="fw-bp-{i}" class="field-textarea field-textarea--sm" rows="3" bind:value={businesses[i].proof}
                  ></textarea>
                </div>
              </div>
            </div>
          {/each}
        </fieldset>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-lg">Submit application (mockup)</button>
          <p class="form-footnote">
            By submitting, you agree we may verify public posts. This preview does not store data on our servers.
          </p>
        </div>
      </form>
    {/if}
  </div>
</main>

<Footer />

<style>
  .event-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 64px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .event-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .event-inner {
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

  .event-hero {
    margin-bottom: 36px;
  }

  .event-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--primary);
    margin: 0 0 10px;
  }

  .event-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 14px;
    line-height: 1.15;
  }

  .event-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .event-h2 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin: 0 0 16px;
    line-height: 1.25;
  }

  .event-p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0 0 12px;
  }

  .event-p--tight {
    margin-bottom: 20px;
  }

  .event-p a {
    color: var(--primary);
    font-weight: 600;
  }

  .event-rules {
    margin-bottom: 28px;
  }

  .rules-list {
    margin: 0;
    padding-left: 1.15rem;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rules-list strong {
    color: var(--text-primary);
  }

  .event-card {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 32px 28px;
    box-shadow: var(--shadow-sm);
  }

  .event-card--success {
    background: var(--bg);
  }

  .success-badge {
    display: inline-block;
    font-size: 11px;
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--teal-dark);
    background: rgb(13 148 136 / 0.12);
    padding: 4px 10px;
    border-radius: var(--radius-tile-sm);
    margin-bottom: 14px;
  }

  :global([data-theme='dark']) .success-badge {
    color: var(--teal);
  }

  .event-form .event-h2 {
    margin-bottom: 8px;
  }

  .form-error {
    font-size: 14px;
    color: #b91c1c;
    background: rgb(254 226 226 / 0.6);
    border: 1px solid rgb(252 165 165 / 0.8);
    padding: 10px 14px;
    border-radius: var(--radius-md);
    margin: 0 0 20px;
  }

  :global([data-theme='dark']) .form-error {
    color: #fca5a5;
    background: rgb(127 29 29 / 0.35);
    border-color: rgb(185 28 28 / 0.5);
  }

  .fieldset {
    border: none;
    padding: 0;
    margin: 0 0 28px;
  }

  .legend {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    padding: 0;
    margin-bottom: 12px;
  }

  .field-hint {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: -4px 0 14px;
  }

  .field-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .req {
    color: var(--primary);
  }

  .opt {
    font-weight: 400;
    color: var(--text-muted);
  }

  .field-input,
  .field-textarea {
    font: inherit;
    font-size: 15px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg);
    color: var(--text-primary);
    width: 100%;
  }

  .field-textarea--sm {
    min-height: 72px;
    resize: vertical;
  }

  .field-input:focus,
  .field-textarea:focus {
    outline: 2px solid rgb(3 105 161 / 0.25);
    border-color: var(--primary);
  }

  .biz-block {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid var(--border);
  }

  .biz-block:first-of-type {
    padding-top: 0;
    margin-top: 8px;
    border-top: none;
  }

  .biz-title {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 14px;
  }

  .form-actions {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .form-footnote {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    max-width: 520px;
  }
</style>
