<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import TurnstileBox from '../components/TurnstileBox.svelte';
  import { postContactJson, snapshotContactClientMeta } from '../contactConfig';

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
  const mailTo = 'info@hostverna.com';

  type Step =
    | 'intro'
    | 'contact'
    | 'org'
    | 'need'
    | 'timeline'
    | 'budget'
    | 'message'
    | 'review'
    | 'success';

  let step: Step = 'intro';
  let animating = false;

  let name = '';
  let email = '';
  let phone = '';
  let organization = '';
  let role = '';
  let need = '';
  let timeline = '';
  let budget = '';
  let details = '';
  let advertiseOnSite = false;

  let turnstileToken = '';
  let sending = false;
  let submitError = '';
  /** Set when the visitor leaves the intro and starts the guided steps (for internal time-on-form stats). */
  let formStartedAtMs = 0;

  const needOptions = [
    { id: 'website', label: 'Website design or redesign', sub: 'Custom site, launch, or overhaul' },
    { id: 'software', label: 'Custom software or internal tools', sub: 'Portals, workflows, integrations' },
    { id: 'crm', label: 'CRM or client management', sub: 'Setup, migration, training' },
    { id: 'it', label: 'IT support or managed services', sub: 'Ongoing help, monitoring, fixes' },
    { id: 'multiple', label: 'More than one of the above', sub: 'We will sort priorities on a call' },
    { id: 'unsure', label: 'Not sure yet', sub: 'Tell us in the next step' },
  ] as const;

  const timelineOptions = [
    { id: 'asap', label: 'As soon as possible', sub: 'Active deadline or pain point' },
    { id: 'month', label: 'Within the next month', sub: 'Getting quotes and deciding' },
    { id: 'quarter', label: 'This quarter', sub: 'Planning phase' },
    { id: 'exploring', label: 'Just exploring', sub: 'No fixed timeline' },
  ] as const;

  const budgetOptions = [
    { id: 'under-5k', label: 'Under $5,000', sub: 'Smaller scope or phased work' },
    { id: '5-15k', label: '$5,000 to $15,000', sub: 'Typical small business project band' },
    { id: '15-50k', label: '$15,000 to $50,000', sub: 'Larger site or custom build' },
    { id: '50k-plus', label: '$50,000+', sub: 'Enterprise or multi-system' },
    { id: 'discuss', label: 'Prefer to discuss', sub: 'We will talk ranges on a call' },
  ] as const;

  const totalSteps = 7;

  function progressPct(): number {
    if (step === 'intro' || step === 'success') return 0;
    if (step === 'review') return 100;
    const n: Record<string, number> = {
      contact: 1,
      org: 2,
      need: 3,
      timeline: 4,
      budget: 5,
      message: 6,
    };
    const i = n[step] ?? 0;
    return Math.round((i / totalSteps) * 100);
  }

  function advance(next: Step) {
    animating = true;
    if (step === 'intro' && next !== 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      step = next;
      animating = false;
    }, 180);
  }

  function emailOk(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function goFromContact() {
    if (!name.trim() || !email.trim() || !emailOk(email)) return;
    advance('org');
  }

  function goFromOrg() {
    if (!organization.trim()) return;
    advance('need');
  }

  function buildBody(): string {
    const lines = [
      'HostVerna contact request',
      '***',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim() || '(not provided)'}`,
      `Organization: ${organization.trim()}`,
      `Role: ${role.trim() || '(not provided)'}`,
      `Need: ${needLabel(need)}`,
      `Timeline: ${timelineLabel(timeline)}`,
      `Budget: ${budgetLabel(budget)}`,
      `Interested in a site listing or ad: ${advertiseOnSite ? 'Yes' : 'No'}`,
      '***',
      'Details:',
      details.trim() || '(none)',
    ];
    return lines.join('\n');
  }

  function needLabel(id: string): string {
    return needOptions.find((o) => o.id === id)?.label ?? id;
  }

  function timelineLabel(id: string): string {
    return timelineOptions.find((o) => o.id === id)?.label ?? id;
  }

  function budgetLabel(id: string): string {
    return budgetOptions.find((o) => o.id === id)?.label ?? id;
  }

  $: mailtoHref = (() => {
    const subject = encodeURIComponent(`Contact request: ${organization.trim() || name.trim() || 'HostVerna'}`);
    const body = encodeURIComponent(buildBody());
    return `mailto:${mailTo}?subject=${subject}&body=${body}`;
  })();

  let prevStep: Step = 'intro';
  $: {
    if (prevStep === 'review' && step !== 'review') {
      turnstileToken = '';
      submitError = '';
    }
    prevStep = step;
  }

  async function sendFromReview() {
    submitError = '';
    if (!turnstileToken) {
      submitError = 'Complete the verification check above.';
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
      role: role.trim(),
      need: needLabel(need),
      timeline: timelineLabel(timeline),
      budget: budgetLabel(budget),
      advertiseOnSite,
      details: details.trim(),
      clientMeta: snapshotContactClientMeta(formStartedAtMs),
    });
    sending = false;
    if (result.ok) {
      advance('success');
      return;
    }
    submitError = result.error;
  }
</script>

<Navbar />

<main class="contact-page" class:in-flow={step !== 'intro'}>
  <div class="container contact-inner">
    {#if step === 'intro'}
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">Contact</span>
    </nav>

    <header class="contact-header">
      <h1 class="contact-h1">Get started</h1>
      <p class="contact-lede">
        A short guided form so we understand who you are, what you need, and your timeline. It is designed to be quick for
        you and specific enough for a useful response.
      </p>
    </header>
    {/if}

    <div class="contact-shell" class:animating>
      {#if step === 'intro'}
        <div class="form-card intro-card">
          <div class="intro-accent-bar"></div>
          <h2 class="card-h2">Tell us what you're working on</h2>
          <p class="card-lead">
            Complete seven quick questions in about two minutes. We use your answers to provide a focused response.
          </p>
          <ul class="intro-bullets">
            <li>
              <span class="ib-dot"></span>
              Every submission is reviewed by our team
            </li>
            <li>
              <span class="ib-dot"></span>
              Prefer to call? Reach us at <a href={phoneHref}>{phoneDisplay}</a>
            </li>
            <li>
              <span class="ib-dot"></span>
              Secure web submission, no email client required
            </li>
          </ul>
          <div class="intro-footer">
            <button
              type="button"
              class="btn btn-primary btn-lg intro-start-btn"
              on:click={() => {
                formStartedAtMs = Date.now();
                advance('contact');
              }}
            >
              Start the form
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <span class="intro-alt">or call us at <a href={phoneHref}>{phoneDisplay}</a></span>
          </div>
        </div>

      {:else if step === 'contact'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: {progressPct()}%"></div>
          </div>
          <div class="q-step-label">Step 1 of {totalSteps}</div>
          <h2 class="q-heading">How do we reach you?</h2>
          <div class="field-stack">
            <div class="field-row">
              <label class="field">
                <span class="field-label">Full name <span class="req">*</span></span>
                <input class="field-input" type="text" bind:value={name} autocomplete="name" />
              </label>
              <label class="field">
                <span class="field-label">Work email <span class="req">*</span></span>
                <input class="field-input" type="email" bind:value={email} autocomplete="email" />
              </label>
            </div>
            <label class="field field--half">
              <span class="field-label">Phone <span class="opt">(optional)</span></span>
              <input class="field-input" type="tel" bind:value={phone} autocomplete="tel" />
            </label>
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-secondary" on:click={() => advance('intro')}>Back</button>
            <button type="button" class="btn btn-primary" on:click={goFromContact} disabled={!name.trim() || !emailOk(email)}
              >Continue</button
            >
          </div>
        </div>

      {:else if step === 'org'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: {progressPct()}%"></div>
          </div>
          <div class="q-step-label">Step 2 of {totalSteps}</div>
          <h2 class="q-heading">Who is this for?</h2>
          <div class="field-stack">
            <div class="field-row">
              <label class="field">
                <span class="field-label">Business or organization <span class="req">*</span></span>
                <input class="field-input" type="text" bind:value={organization} autocomplete="organization" />
              </label>
              <label class="field">
                <span class="field-label">Your role <span class="opt">(optional)</span></span>
                <input class="field-input" type="text" bind:value={role} autocomplete="organization-title" placeholder="e.g. Owner, Ops manager" />
              </label>
            </div>
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-secondary" on:click={() => advance('contact')}>Back</button>
            <button type="button" class="btn btn-primary" on:click={goFromOrg} disabled={!organization.trim()}>Continue</button>
          </div>
        </div>

      {:else if step === 'need'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: {progressPct()}%"></div>
          </div>
          <div class="q-step-label">Step 3 of {totalSteps}</div>
          <h2 class="q-heading">What are you reaching out about?</h2>
          <div class="option-grid">
            {#each needOptions as opt}
              <button type="button" class="opt" class:opt-active={need === opt.id} on:click={() => (need = opt.id)}>
                <span class="opt-label">{opt.label}</span>
                <span class="opt-sub">{opt.sub}</span>
              </button>
            {/each}
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-secondary" on:click={() => advance('org')}>Back</button>
            <button type="button" class="btn btn-primary" on:click={() => need && advance('timeline')} disabled={!need}
              >Continue</button
            >
          </div>
        </div>

      {:else if step === 'timeline'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: {progressPct()}%"></div>
          </div>
          <div class="q-step-label">Step 4 of {totalSteps}</div>
          <h2 class="q-heading">When are you hoping to move?</h2>
          <div class="option-list">
            {#each timelineOptions as opt}
              <button type="button" class="opt-row" class:opt-row-active={timeline === opt.id} on:click={() => (timeline = opt.id)}>
                <span class="or-label">{opt.label}</span>
                <span class="or-sub">{opt.sub}</span>
              </button>
            {/each}
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-secondary" on:click={() => advance('need')}>Back</button>
            <button type="button" class="btn btn-primary" on:click={() => timeline && advance('budget')} disabled={!timeline}
              >Continue</button
            >
          </div>
        </div>

      {:else if step === 'budget'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: {progressPct()}%"></div>
          </div>
          <div class="q-step-label">Step 5 of {totalSteps}</div>
          <h2 class="q-heading">Rough budget or investment range</h2>
          <p class="q-hint">Ballpark is fine. It helps us suggest realistic options.</p>
          <div class="option-list">
            {#each budgetOptions as opt}
              <button type="button" class="opt-row" class:opt-row-active={budget === opt.id} on:click={() => (budget = opt.id)}>
                <span class="or-label">{opt.label}</span>
                <span class="or-sub">{opt.sub}</span>
              </button>
            {/each}
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-secondary" on:click={() => advance('timeline')}>Back</button>
            <button type="button" class="btn btn-primary" on:click={() => budget && advance('message')} disabled={!budget}
              >Continue</button
            >
          </div>
        </div>

      {:else if step === 'message'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: {progressPct()}%"></div>
          </div>
          <div class="q-step-label">Step 6 of {totalSteps}</div>
          <h2 class="q-heading">Anything else we should know?</h2>
          <p class="q-hint">Share links, constraints, examples, or what success looks like for this project.</p>
          <label class="field">
            <span class="field-label">Details <span class="opt">(optional but helpful)</span></span>
            <textarea class="field-textarea" rows="6" bind:value={details} placeholder="Type here…"></textarea>
          </label>
          <label class="field-checkbox">
            <input class="field-checkbox-input" type="checkbox" bind:checked={advertiseOnSite} />
            <span class="field-checkbox-label"
              >Interested in a site listing or ad on hostverna.com (for example the Greenbrier County, WV page)</span
            >
          </label>
          <div class="card-actions">
            <button type="button" class="btn btn-secondary" on:click={() => advance('budget')}>Back</button>
            <button type="button" class="btn btn-primary" on:click={() => advance('review')}>Review</button>
          </div>
        </div>

      {:else if step === 'review'}
        <div class="form-card review-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: 100%"></div>
          </div>
          <div class="q-step-label">Step 7 of {totalSteps}</div>
          <h2 class="q-heading">Review and send</h2>
          <p class="q-hint">
            Confirm you are human, then send. We read every message and reply at <strong>{mailTo}</strong> usually within
            one business day (often faster).
          </p>
          <dl class="review-dl">
            <dt>Name</dt><dd>{name.trim()}</dd>
            <dt>Email</dt><dd>{email.trim()}</dd>
            <dt>Phone</dt><dd>{phone.trim() || '(not provided)'}</dd>
            <dt>Organization</dt><dd>{organization.trim()}</dd>
            <dt>Role</dt><dd>{role.trim() || '(not provided)'}</dd>
            <dt>Need</dt><dd>{needLabel(need)}</dd>
            <dt>Timeline</dt><dd>{timelineLabel(timeline)}</dd>
            <dt>Budget</dt><dd>{budgetLabel(budget)}</dd>
            <dt>Site listing / ad</dt><dd>{advertiseOnSite ? 'Yes' : 'No'}</dd>
            <dt>Details</dt><dd class="review-dd-block">{details.trim() || '(not provided)'}</dd>
          </dl>
          <div class="review-turnstile">
            <TurnstileBox onToken={(t) => (turnstileToken = t)} />
          </div>
          {#if submitError}
            <p class="review-submit-error" role="alert">{submitError}</p>
          {/if}
          <div class="review-actions">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              disabled={sending || !turnstileToken}
              on:click={sendFromReview}
            >
              {sending ? 'Sending…' : 'Send message'}
            </button>
            <a href={mailtoHref} class="btn btn-secondary btn-lg">Open in email app instead</a>
          </div>
          <button type="button" class="review-back" on:click={() => advance('message')}>
            ← Back to edit answers
          </button>
          <p class="review-fallback">
            Prefer phone? <a href={phoneHref}>{phoneDisplay}</a>
          </p>
        </div>

      {:else if step === 'success'}
        <div class="form-card success-card">
          <div class="success-badge">Next step</div>
          <h2 class="q-heading">You are set</h2>
          <p class="card-lead">
            Your message is on its way. If you need to add something, email us at <a href="mailto:{mailTo}">{mailTo}</a>.
          </p>
          <p class="card-lead">
            We read every request. Expect a direct human reply, usually within one business day.
          </p>
          <div class="card-actions card-actions-center">
            <a href="/" class="btn btn-primary btn-lg">Back to home</a>
            <a href="/support" class="btn btn-secondary btn-lg">Support</a>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>

<Footer />

<style>
  .contact-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 80px;
    min-height: 60vh;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    transition: background 0.3s ease, min-height 0.3s ease;
  }

  .contact-page.in-flow {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
  }

  .contact-page.in-flow .contact-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 60px;
    max-width: 860px;
  }

  .contact-page.in-flow .contact-shell {
    max-width: none;
  }

  .contact-page.in-flow .form-card {
    padding: 48px 56px;
  }

  @media (min-width: 901px) {
    .contact-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .contact-inner {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
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

  .contact-header {
    margin-bottom: 40px;
    text-align: center;
  }

  .contact-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 14px;
  }

  .contact-lede {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto;
  }

  .contact-shell {
    max-width: 720px;
    margin: 0 auto;
    transition: opacity 0.18s ease;
  }

  .contact-shell.animating {
    opacity: 0;
  }

  .form-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 40px 48px;
    box-shadow: var(--shadow-sm);
  }

  /* ----- Intro card ----- */

  .intro-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    overflow: hidden;
  }

  .intro-accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient);
    border-radius: var(--radius-tile) var(--radius-tile) 0 0;
  }

  .card-h2 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .card-lead {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
  }

  .card-lead a {
    color: var(--primary);
    font-weight: 600;
  }

  .intro-bullets {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
    color: var(--text-secondary);
    border-top: 1px solid var(--border);
    padding-top: 18px;
  }

  .intro-bullets li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .intro-bullets a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .intro-bullets a:hover {
    text-decoration: underline;
  }

  .ib-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    flex-shrink: 0;
    margin-top: 7px;
  }

  .intro-footer {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    border-top: 1px solid var(--border);
    padding-top: 20px;
  }

  .intro-start-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .intro-alt {
    font-size: 13px;
    color: var(--text-muted);
  }

  .intro-alt a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }

  .intro-alt a:hover {
    text-decoration: underline;
  }

  /* ----- Shared form steps ----- */

  .q-progress {
    height: 3px;
    background: var(--bg-muted);
    border-radius: 2px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .qp-bar {
    height: 100%;
    background: var(--gradient);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .q-step-label {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .q-heading {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .q-hint {
    font-size: 13px;
    color: var(--text-secondary);
    margin: -12px 0 18px;
    line-height: 1.5;
  }

  .field-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .field--half {
    max-width: 50%;
    padding-right: 8px;
  }

  @media (max-width: 560px) {
    .field-row {
      grid-template-columns: 1fr;
    }
    .field--half {
      max-width: 100%;
      padding-right: 0;
    }
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

  .field-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .field-input:focus,
  .field-textarea:focus {
    outline: 2px solid rgb(3 105 161 / 0.25);
    border-color: var(--primary);
  }

  .field-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 4px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .field-checkbox-input {
    margin-top: 3px;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    accent-color: var(--primary);
    cursor: pointer;
  }

  .field-checkbox-label {
    user-select: none;
  }

  .option-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .opt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 16px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: border-color 0.12s ease, background 0.12s ease;
  }

  .opt:hover {
    border-color: #cbd5e1;
  }

  .opt-active {
    border-color: var(--primary);
    background: rgb(3 105 161 / 0.06);
  }

  .opt-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    font-family: var(--font-display);
  }

  .opt-sub {
    font-size: 11px;
    color: var(--text-secondary);
    line-height: 1.45;
  }

  .option-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .opt-row {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 14px 18px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: border-color 0.12s ease;
  }

  .opt-row:hover {
    border-color: #cbd5e1;
  }

  .opt-row-active {
    border-color: var(--primary);
    background: rgb(3 105 161 / 0.06);
  }

  .or-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    font-family: var(--font-display);
  }

  .or-sub {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
    align-items: center;
  }

  .card-actions-center {
    justify-content: center;
  }

  .review-dl {
    display: grid;
    grid-template-columns: minmax(100px, 140px) 1fr;
    gap: 10px 20px;
    font-size: 14px;
    margin: 0 0 24px;
  }

  .review-dl dt {
    color: var(--text-muted);
    font-weight: 600;
  }

  .review-dl dd {
    margin: 0;
    color: var(--text-primary);
  }

  .review-dd-block {
    white-space: pre-wrap;
    grid-column: 2;
  }

  .review-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  @media (min-width: 480px) {
    .review-actions {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  .review-fallback {
    margin-top: 16px;
    font-size: 13px;
    color: var(--text-secondary);
  }

  .review-turnstile {
    margin: 16px 0 8px;
  }

  .review-submit-error {
    margin: 0 0 12px;
    font-size: 14px;
    color: #b91c1c;
    line-height: 1.45;
  }

  .review-back {
    margin-top: 14px;
    font-size: 14px;
    color: var(--text-secondary);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-family: inherit;
  }

  .review-back:hover {
    color: var(--primary);
  }

  .review-fallback a {
    color: var(--primary);
    font-weight: 600;
  }

  .success-card {
    text-align: left;
  }

  .success-badge {
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
    margin-bottom: 12px;
  }

  @media (min-width: 900px) {
    .contact-page.in-flow .option-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 640px) {
    .contact-page.in-flow .form-card {
      padding: 28px 22px;
    }
    .form-card {
      padding: 28px 22px;
    }
    .option-grid {
      grid-template-columns: 1fr;
    }
    .review-dl {
      grid-template-columns: 1fr;
    }
    .review-dl dt {
      margin-top: 8px;
    }
    .review-dl dt:first-child {
      margin-top: 0;
    }
    .review-dd-block {
      grid-column: 1;
    }
    .intro-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .intro-start-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
