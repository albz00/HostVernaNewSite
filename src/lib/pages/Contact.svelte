<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import TurnstileBox from '../components/TurnstileBox.svelte';
  import { postContactJson, snapshotContactClientMeta } from '../contactConfig';

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
  const emailAddress = 'info@hostverna.com';

  let name = '';
  let email = '';
  let phone = '';
  let organization = '';
  let need = '';
  let timeline = '';
  let message = '';
  let turnstileToken = '';
  let sending = false;
  let sent = false;
  let submitError = '';
  let formStartedAtMs = 0;

  function emailOk(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  async function submitForm() {
    submitError = '';

    if (!name.trim() || !emailOk(email) || !message.trim()) {
      submitError = 'Please complete your name, email, and message.';
      return;
    }

    if (!turnstileToken) {
      submitError = 'Please complete the verification check.';
      return;
    }

    sending = true;
    const result = await postContactJson({
      kind: 'full',
      turnstileToken,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      organization: organization.trim(),
      role: '',
      need: need || 'General contact request',
      timeline,
      budget: '',
      advertiseOnSite: false,
      details: message.trim(),
      clientMeta: snapshotContactClientMeta(formStartedAtMs),
    });
    sending = false;

    if (result.ok) {
      sent = true;
      return;
    }

    submitError = result.error;
  }
</script>

<Navbar />

<main class="contact-page">
  <div class="contact-wrap">
    {#if sent}
      <section class="contact-card success" aria-live="polite">
        <h1>Message sent.</h1>
        <p>Thanks, {name.trim()}. We’ll get back to you within one business day.</p>
        <a class="btn btn-primary" href="/">Back to home</a>
      </section>
    {:else}
      <header class="contact-heading">
        <h1>Contact us</h1>
        <p>Tell us what you need. We’ll reply within one business day.</p>
      </header>

      <form
        class="contact-card"
        on:focusin={() => {
          if (!formStartedAtMs) formStartedAtMs = Date.now();
        }}
        on:submit|preventDefault={submitForm}
      >
        <div class="field-row">
          <label>
            <span>Name <b aria-hidden="true">*</b></span>
            <input type="text" bind:value={name} autocomplete="name" required />
          </label>

          <label>
            <span>Email <b aria-hidden="true">*</b></span>
            <input type="email" bind:value={email} autocomplete="email" required />
          </label>
        </div>

        <div class="field-row">
          <label>
            <span>Firm or business</span>
            <input type="text" bind:value={organization} autocomplete="organization" />
          </label>

          <label>
            <span>Phone</span>
            <input type="tel" bind:value={phone} autocomplete="tel" />
          </label>
        </div>

        <fieldset>
          <legend>What do you need help with?</legend>
          <div class="quick-options">
            {#each ['Managed IT', 'Security / WISP', 'Microsoft 365', 'Google Workspace', 'Something else'] as option}
              <button
                type="button"
                class:active={need === option}
                aria-pressed={need === option}
                on:click={() => (need = option)}
              >
                {option}
              </button>
            {/each}
          </div>
        </fieldset>

        <fieldset>
          <legend>How soon do you need help?</legend>
          <div class="quick-options">
            {#each ['As soon as possible', 'Within a month', 'Just exploring'] as option}
              <button
                type="button"
                class:active={timeline === option}
                aria-pressed={timeline === option}
                on:click={() => (timeline = option)}
              >
                {option}
              </button>
            {/each}
          </div>
        </fieldset>

        <label>
          <span>How can we help? <b aria-hidden="true">*</b></span>
          <textarea
            bind:value={message}
            rows="5"
            placeholder="A sentence or two about what’s going on."
            required
          ></textarea>
        </label>

        <TurnstileBox onToken={(token) => (turnstileToken = token)} />

        {#if submitError}
          <p class="form-error" role="alert">{submitError}</p>
        {/if}

        <button
          class="btn btn-primary submit-button"
          type="submit"
          disabled={sending || !name.trim() || !emailOk(email) || !message.trim()}
        >
          {sending ? 'Sending…' : 'Send message'}
        </button>
      </form>

      <p class="contact-direct">
        Prefer to call or email?
        <a href={phoneHref}>{phoneDisplay}</a>
        <span aria-hidden="true">·</span>
        <a href="mailto:{emailAddress}">{emailAddress}</a>
      </p>
    {/if}
  </div>
</main>

<Footer />

<style>
  .contact-page {
    min-height: 70vh;
    padding: calc(120px + var(--hv-promo-h)) 20px 72px;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
  }

  .contact-wrap {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }

  .contact-heading {
    margin-bottom: 24px;
  }

  h1 {
    margin: 0 0 8px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: clamp(30px, 5vw, 42px);
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  .contact-heading p,
  .success p {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .contact-card {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 32px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-sm);
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  label span,
  legend {
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 600;
  }

  label b {
    color: var(--primary);
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 14px;
    color: var(--text-primary);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    font: inherit;
    font-size: 16px;
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    margin-bottom: 9px;
    padding: 0;
  }

  .quick-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .quick-options button {
    padding: 9px 13px;
    color: var(--text-secondary);
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  }

  .quick-options button:hover {
    border-color: var(--primary);
  }

  .quick-options button.active {
    color: var(--primary);
    background: rgb(3 105 161 / 0.08);
    border-color: var(--primary);
    font-weight: 600;
  }

  input:focus,
  textarea:focus {
    outline: 2px solid rgb(3 105 161 / 0.2);
    border-color: var(--primary);
  }

  .submit-button {
    align-self: flex-start;
    min-width: 140px;
  }

  .form-error {
    margin: -4px 0 0;
    color: #b91c1c;
    font-size: 14px;
  }

  .contact-direct {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 7px;
    margin: 28px 0 24px;
    padding: 18px 20px;
    color: var(--text-muted);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    font-size: 13px;
  }

  .contact-direct a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .contact-direct a:hover {
    text-decoration: underline;
  }

  .success {
    align-items: flex-start;
  }

  .success .btn {
    margin-top: 6px;
  }

  @media (min-width: 901px) {
    .contact-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  @media (max-width: 560px) {
    .contact-page {
      padding-right: 16px;
      padding-left: 16px;
    }

    .contact-card {
      padding: 24px 20px;
    }

    .field-row {
      grid-template-columns: 1fr;
    }

    .submit-button {
      width: 100%;
    }

    .contact-direct {
      margin-bottom: 16px;
    }
  }
</style>
