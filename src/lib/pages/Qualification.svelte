<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import TurnstileBox from '../components/TurnstileBox.svelte';
  import { postContactJson, snapshotContactClientMeta } from '../contactConfig';

  const steps = ['Your firm', 'Current IT', 'Reason for meeting'];
  const concerns = [
    'MFA and accounts',
    'Endpoint protection',
    'Backups',
    'Encryption',
    'Remote access',
    'Microsoft 365 or Google Workspace',
    'WISP',
    'Current IT support',
  ];

  let activeStep = 0;
  let name = '';
  let email = '';
  let phone = '';
  let firmName = '';
  let website = '';
  let role = '';
  let firmType = '';
  let users = '';
  let devices = '';
  let platform = '';
  let currentSupport = '';
  let wisp = '';
  let lastReview = '';
  let remoteAndOffices = '';
  let selectedConcerns: string[] = [];
  let mainReason = '';
  let budgetConcern = '';
  let turnstileToken = '';
  let sending = false;
  let submitError = '';
  let sent = false;
  let formStartedAtMs = 0;

  function emailOk(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function startForm() {
    if (!formStartedAtMs) formStartedAtMs = Date.now();
  }

  function next() {
    submitError = '';
    if (activeStep === 0 && (!name.trim() || !emailOk(email) || !firmName.trim() || !firmType || !users)) {
      submitError = 'Complete the required firm details.';
      return;
    }
    if (activeStep === 1 && (!platform || !currentSupport)) {
      submitError = 'Select your cloud platform and current IT arrangement.';
      return;
    }
    activeStep = Math.min(2, activeStep + 1);
    document.getElementById('qualification-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function details(): string {
    return [
      'CPA technology and security qualification',
      `Firm website: ${website.trim() || '(not provided)'}`,
      `Firm type: ${firmType}`,
      `Users with client-data access: ${users}`,
      `Computers and phones: ${devices.trim() || '(unknown)'}`,
      `Cloud platform: ${platform}`,
      `Current IT relationship: ${currentSupport}`,
      `WISP status: ${wisp || '(unknown)'}`,
      `Last formal review: ${lastReview.trim() || '(unknown)'}`,
      `Remote staff and offices: ${remoteAndOffices.trim() || '(not provided)'}`,
      `Areas to review: ${selectedConcerns.length ? selectedConcerns.join(', ') : '(none selected)'}`,
      `Budget concern: ${budgetConcern || '(not answered)'}`,
      '',
      'Main reason for the meeting:',
      mainReason.trim(),
    ].join('\n');
  }

  async function submit() {
    submitError = '';
    if (!mainReason.trim()) {
      submitError = 'Tell us the main reason for the meeting.';
      return;
    }
    if (!turnstileToken) {
      submitError = 'Complete the verification check.';
      return;
    }

    sending = true;
    const result = await postContactJson({
      kind: 'full',
      turnstileToken,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      organization: firmName.trim(),
      role: role.trim(),
      need: 'CPA technology and security discovery',
      timeline: 'Qualification submitted',
      budget: budgetConcern || 'Not answered',
      advertiseOnSite: false,
      details: details(),
      clientMeta: snapshotContactClientMeta(formStartedAtMs),
    });
    sending = false;

    if (result.ok) {
      sent = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      submitError = result.error;
    }
  }
</script>

<Navbar />

<main class="qualification-page">
  <section class="qualification-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Firm Qualification</span>
      </nav>

      <div class="hero-grid">
        <div>
          <h1>Firm qualification</h1>
          <p>
            Give HostVerna the basic picture of your firm, current IT arrangement, and the reason you
            want to meet. Unknown answers are fine.
          </p>
          <a href="#qualification-panel" class="btn btn-primary btn-lg">Start Qualification</a>
        </div>
        <figure class="hero-visual">
          <img
            src="/images/firm-qualification.jpg"
            width="1800"
            height="1202"
            alt="Business professionals reviewing firm documents together at a table"
            decoding="async"
          />
          <figcaption>Start with the facts your firm already has.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  {#if sent}
    <section class="success-section">
      <div class="container success-card">
        <div class="success-mark" aria-hidden="true">✓</div>
        <h2>HostVerna has the qualification details.</h2>
        <p>We will follow up to arrange the technology and security discovery meeting.</p>
        <a href="/" class="btn btn-primary btn-lg">Return Home</a>
      </div>
    </section>
  {:else}
    <section class="form-section" id="qualification-panel">
      <div class="container form-grid" on:focusin={startForm}>
        <div class="step-list" role="tablist" aria-label="Qualification steps">
          {#each steps as step, index}
            <button
              type="button"
              class:active={activeStep === index}
              class:complete={activeStep > index}
              on:click={() => {
                if (index < activeStep) activeStep = index;
              }}
            >
              <span class="step-state" class:step-state--active={activeStep === index} aria-hidden="true">
                {activeStep > index ? '✓' : ''}
              </span>
              {step}
            </button>
          {/each}
          <p>
            This prepares a discovery meeting. It is not an audit, penetration test, or compliance
            certification.
          </p>
        </div>

        <div class="form-panel">
          <div class="progress"><span style="width: {((activeStep + 1) / steps.length) * 100}%"></span></div>

          {#if activeStep === 0}
            <div class="step-content">
              <h2>Your firm</h2>
              <p>Include anyone who regularly accesses client or taxpayer data.</p>

              <div class="field-grid">
                <label>Your name *<input bind:value={name} autocomplete="name" /></label>
                <label>Work email *<input bind:value={email} type="email" autocomplete="email" /></label>
                <label>Firm name *<input bind:value={firmName} autocomplete="organization" /></label>
                <label>Role or title<input bind:value={role} autocomplete="organization-title" /></label>
                <label>Phone<input bind:value={phone} type="tel" autocomplete="tel" /></label>
                <label>Firm website<input bind:value={website} type="url" placeholder="https://" /></label>
                <label>
                  Firm type *
                  <select bind:value={firmType}>
                    <option value="">Select one</option>
                    <option>CPA / accounting firm</option>
                    <option>Tax preparation firm</option>
                    <option>Bookkeeping / payroll firm</option>
                    <option>Other professional firm</option>
                  </select>
                </label>
                <label>
                  Regular users *
                  <select bind:value={users}>
                    <option value="">Select a range</option>
                    <option>1–5</option>
                    <option>6–15</option>
                    <option>16–30</option>
                    <option>31–75</option>
                    <option>76+</option>
                  </select>
                </label>
              </div>
            </div>
          {:else if activeStep === 1}
            <div class="step-content">
              <h2>Current IT</h2>
              <p>A best estimate is enough. Anything uncertain can be verified with HostVerna.</p>

              <div class="field-grid">
                <label>
                  Cloud platform *
                  <select bind:value={platform}>
                    <option value="">Select one</option>
                    <option>Microsoft 365 / Outlook</option>
                    <option>Google Workspace</option>
                    <option>Both</option>
                    <option>Not sure</option>
                  </select>
                </label>
                <label>
                  Who handles IT? *
                  <select bind:value={currentSupport}>
                    <option value="">Select one</option>
                    <option>Managed IT provider</option>
                    <option>Someone called when things break</option>
                    <option>Owner or employee</option>
                    <option>Friend or informal support</option>
                    <option>No one consistently</option>
                    <option>Not sure</option>
                  </select>
                </label>
                <label>
                  WISP status
                  <select bind:value={wisp}>
                    <option value="">Select one</option>
                    <option>Current and reviewed recently</option>
                    <option>Exists but may be outdated</option>
                    <option>No written plan</option>
                    <option>Not sure</option>
                  </select>
                </label>
                <label>Last technology/security review<input bind:value={lastReview} placeholder="Year or unknown" /></label>
                <label>Approximate computers and phones<input bind:value={devices} placeholder="Example: 12 computers, 8 phones" /></label>
                <label>Remote staff and office locations<input bind:value={remoteAndOffices} placeholder="Short summary" /></label>
              </div>
            </div>
          {:else}
            <div class="step-content">
              <h2>Reason for meeting</h2>
              <p>Select anything HostVerna should be ready to discuss.</p>

              <div class="concern-grid">
                {#each concerns as concern}
                  <label class="choice">
                    <input type="checkbox" bind:group={selectedConcerns} value={concern} />
                    {concern}
                  </label>
                {/each}
              </div>

              <label class="full-field">
                Main concern or reason for the meeting *
                <textarea bind:value={mainReason} rows="5" placeholder="What feels unclear, risky, unreliable, or overdue?"></textarea>
              </label>

              <label class="full-field">
                Is budget already a concern?
                <select bind:value={budgetConcern}>
                  <option value="">Select one</option>
                  <option>No known concern</option>
                  <option>Possibly, needs discussion</option>
                  <option>Yes, budget is a concern</option>
                  <option>Prefer to discuss with HostVerna</option>
                </select>
              </label>

              <TurnstileBox onToken={(token) => (turnstileToken = token)} />
            </div>
          {/if}

          {#if submitError}<p class="error" role="alert">{submitError}</p>{/if}

          <div class="form-actions">
            {#if activeStep > 0}
              <button type="button" class="btn btn-secondary" on:click={() => (activeStep -= 1)}>Back</button>
            {/if}
            {#if activeStep < 2}
              <button type="button" class="btn btn-primary" on:click={next}>Continue</button>
            {:else}
              <button type="button" class="btn btn-primary" disabled={sending} on:click={submit}>
                {sending ? 'Submitting…' : 'Request Discovery Meeting'}
              </button>
            {/if}
          </div>
        </div>
      </div>
    </section>
  {/if}
</main>

<Footer />

<style>
  .qualification-page {
    background: var(--bg);
  }

  .qualification-hero {
    padding: calc(132px + var(--hv-promo-h)) 0 84px;
    border-bottom: 1px solid var(--border);
    background:
      radial-gradient(ellipse 58% 65% at 12% 30%, rgb(var(--primary-rgb) / 0.08), transparent 68%),
      var(--bg);
  }

  @media (min-width: 901px) {
    .qualification-hero {
      padding-top: calc(164px + var(--hv-promo-h));
    }
  }

  .breadcrumb {
    display: flex;
    gap: 8px;
    margin-bottom: 34px;
    color: var(--text-muted);
    font-size: 13px;
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(360px, 0.75fr);
    gap: clamp(44px, 7vw, 92px);
    align-items: center;
  }

  h1 {
    margin: 0 0 22px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: clamp(42px, 6vw, 72px);
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  .hero-grid > div > p {
    max-width: 650px;
    margin: 0;
    color: var(--text-secondary);
    font-size: clamp(16px, 1.7vw, 19px);
    line-height: 1.72;
  }

  .hero-grid .btn {
    margin-top: 30px;
  }

  .hero-visual {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    margin: 0;
    border: 1px solid rgb(var(--primary-rgb) / 0.22);
    border-radius: var(--radius-tile);
    box-shadow: 0 26px 70px -26px rgb(var(--night-rgb) / 0.65);
  }

  .hero-visual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-visual figcaption {
    position: absolute;
    right: 16px;
    bottom: 16px;
    left: 16px;
    padding: 11px 14px;
    border-radius: var(--radius-tile-sm);
    color: #fff;
    background: rgb(var(--night-rgb) / 0.76);
    font-size: 12px;
    line-height: 1.4;
    backdrop-filter: blur(8px);
  }

  .form-section,
  .success-section {
    padding: 100px 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: minmax(260px, 0.42fr) minmax(0, 1fr);
    gap: clamp(30px, 5vw, 64px);
    align-items: start;
  }

  .step-list {
    display: grid;
    gap: 9px;
    position: sticky;
    top: 130px;
  }

  .step-list button {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 12px;
    align-items: center;
    padding: 17px 18px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-secondary);
    background: var(--bg);
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    text-align: left;
  }

  .step-list button.active {
    border-color: var(--primary);
    color: var(--text-primary);
    box-shadow: inset 3px 0 0 var(--primary);
  }

  .step-list button.complete {
    cursor: pointer;
  }

  .step-state {
    position: relative;
    display: grid;
    width: 20px;
    height: 20px;
    place-items: center;
    color: var(--primary);
    font-size: 12px;
    font-weight: 800;
  }

  .step-state::after {
    width: 7px;
    height: 7px;
    border: 1px solid var(--text-muted);
    border-radius: 50%;
    content: '';
  }

  .step-state--active::after {
    width: 20px;
    height: 6px;
    border: 0;
    border-radius: 999px;
    background: var(--primary);
  }

  .step-list button.complete .step-state {
    border: 1px solid var(--primary);
    border-radius: 50%;
  }

  .step-list button.complete .step-state::after {
    display: none;
  }

  .step-list > p {
    margin: 12px 4px 0;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.6;
  }

  .form-panel {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg);
    box-shadow: var(--shadow-md);
  }

  .progress {
    height: 4px;
    background: var(--bg-subtle);
  }

  .progress span {
    display: block;
    height: 100%;
    background: var(--gradient);
    transition: width 0.2s ease;
  }

  .step-content {
    padding: clamp(26px, 5vw, 48px);
  }

  .step-content h2,
  .success-card h2 {
    margin: 0 0 10px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: clamp(30px, 4vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .step-content > p {
    margin: 0 0 28px;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  .field-grid,
  .concern-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  label:not(.choice) {
    display: grid;
    gap: 8px;
    color: var(--text-primary);
    font-size: 13px;
    font-weight: 700;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 13px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-primary);
    background: var(--bg-subtle);
    font: inherit;
    font-weight: 400;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: var(--primary);
    outline: 3px solid rgb(var(--primary-rgb) / 0.12);
  }

  textarea {
    resize: vertical;
    line-height: 1.5;
  }

  .choice {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 13px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    color: var(--text-secondary);
    background: var(--bg-subtle);
    font-size: 13px;
    cursor: pointer;
  }

  .choice input {
    width: 16px;
    padding: 0;
    accent-color: var(--primary);
  }

  .full-field {
    margin-top: 22px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px clamp(26px, 5vw, 48px);
    border-top: 1px solid var(--border);
    background: var(--bg-subtle);
  }

  .error {
    margin: 0;
    padding: 0 clamp(26px, 5vw, 48px) 18px;
    color: #b91c1c;
    font-size: 13px;
    font-weight: 700;
  }

  .success-card {
    max-width: 720px;
    padding: 50px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    text-align: center;
    box-shadow: var(--shadow-lg);
  }

  .success-mark {
    display: grid;
    width: 54px;
    height: 54px;
    margin: 0 auto 20px;
    border-radius: 50%;
    place-items: center;
    color: #fff;
    background: #0f9f8f;
    font-size: 26px;
    font-weight: 800;
  }

  .success-card p {
    margin: 0 0 28px;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  @media (max-width: 860px) {
    .hero-grid,
    .form-grid {
      grid-template-columns: 1fr;
    }

    .step-list {
      position: static;
      grid-template-columns: repeat(3, 1fr);
    }

    .step-list > p {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 620px) {
    .qualification-hero {
      padding-bottom: 64px;
    }

    .form-section,
    .success-section {
      padding: 72px 0;
    }

    .field-grid,
    .concern-grid {
      grid-template-columns: 1fr;
    }

    .hero-visual {
      aspect-ratio: 4 / 3;
      min-height: 0;
    }

    .step-list {
      grid-template-columns: 1fr;
    }

    .step-list button {
      padding: 13px 15px;
    }

    .form-actions {
      justify-content: stretch;
    }

    .form-actions .btn {
      flex: 1;
      justify-content: center;
    }
  }
</style>
