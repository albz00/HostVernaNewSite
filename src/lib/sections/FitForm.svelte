<script lang="ts">
  type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'result';
  type Fit = 'great' | 'maybe' | 'no';

  let step: Step = 'intro';
  let answers: Record<string, string> = {};
  let fit: Fit = 'great';
  let animating = false;

  function advance(nextStep: Step, key?: string, value?: string) {
    if (key && value) answers[key] = value;
    animating = true;
    setTimeout(() => {
      step = nextStep;
      animating = false;
    }, 180);
  }

  function calcResult() {
    const type = answers.bizType;
    const size = answers.bizSize;
    const mindset = answers.mindset;
    const software = answers.software;

    if (type === 'heavy-inventory') {
      fit = 'no';
    } else if (mindset === 'risk') {
      fit = 'no';
    } else if (
      type === 'trades' ||
      type === 'local' ||
      type === 'dental' ||
      type === 'government' ||
      type === 'education'
    ) {
      if (mindset === 'investment' && (size === 'small' || size === 'medium')) {
        fit = 'great';
      } else {
        fit = 'maybe';
      }
    } else if (software === 'yes' && (type === 'government' || type === 'education')) {
      fit = 'great';
    } else {
      fit = 'maybe';
    }

    advance('result');
  }

  function restart() {
    answers = {};
    fit = 'great';
    advance('intro');
  }

  const resultCopy: Record<Fit, { title: string; sub: string; cta: string; ctaLabel: string }> = {
    great: {
      title: "You're exactly who we built this for.",
      sub: "Based on what you told us, your business is a strong fit. We work with businesses like yours every week. Let's have a quick call and see if we can help.",
      cta: '#contact',
      ctaLabel: 'Book a Free Call',
    },
    maybe: {
      title: "We might be a fit. Let's find out.",
      sub: "Your business isn't a perfect mold, but that doesn't mean we can't help. Reach out and we'll be straight with you about whether it makes sense.",
      cta: '#contact',
      ctaLabel: 'Talk to Us First',
    },
    no: {
      title: "We're probably not the right call right now.",
      sub: "Based on your answers, we'd likely be a poor fit at this stage. That's not a judgment, it's just honest. We'd rather tell you now than waste your time.",
      cta: '#about',
      ctaLabel: 'Learn What We Do',
    },
  };
</script>

<section class="fit-section" id="fit">
  <div class="fit-bg-glow"></div>
  <div class="container">
    <div class="fit-header">
      <span class="badge badge-gradient">Are We a Fit?</span>
      <h2 class="fit-title">
        We're selective about who we work with.<br />
        <span class="gradient-text">Here's why that's good for you.</span>
      </h2>
      <p class="fit-sub">
        We don't take every project. Answer five quick questions and we'll tell you honestly whether we think we can help.
      </p>
    </div>

    <div class="form-shell" class:animating>

      {#if step === 'intro'}
        <div class="form-card intro-card">
          <div class="intro-icon">
            <div class="icon-ring">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <h3 class="intro-heading">Quick qualifier. 5 questions. No fluff.</h3>
          <p class="intro-body">We've turned down projects that weren't right. This helps both of us save time. Takes under a minute.</p>
          <div class="intro-bullets">
            <div class="ib"><div class="ib-dot"></div><span>We'll tell you straight if we're not the right fit</span></div>
            <div class="ib"><div class="ib-dot"></div><span>No sales pressure from this form</span></div>
            <div class="ib"><div class="ib-dot"></div><span>Financing available if budget is a concern</span></div>
          </div>
          <button class="btn btn-primary btn-lg" on:click={() => advance('q1')}>Start the Qualifier</button>
        </div>

      {:else if step === 'q1'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: 20%"></div>
          </div>
          <div class="q-step-label">Question 1 of 5</div>
          <h3 class="q-heading">What best describes your business?</h3>
          <div class="option-grid">
            <button class="opt" on:click={() => advance('q2', 'bizType', 'trades')}>
              <span class="opt-icon">🔨</span>
              <span class="opt-label">Trades / Construction / Excavating</span>
              <span class="opt-sub">Contractors, builders, landscapers, excavators, HVAC, plumbing, etc.</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'local')}>
              <span class="opt-icon">🏪</span>
              <span class="opt-label">Local Service Business</span>
              <span class="opt-sub">High traffic area, small to medium, service focused, not heavy inventory</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'dental')}>
              <span class="opt-icon">🦷</span>
              <span class="opt-label">Dental / Medical / Brochure</span>
              <span class="opt-sub">Professional services, practices, informational or appointment-based sites</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'government')}>
              <span class="opt-icon">🏛</span>
              <span class="opt-label">Government / Municipal</span>
              <span class="opt-sub">Government sectors, municipalities, school districts</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'education')}>
              <span class="opt-icon">🎓</span>
              <span class="opt-label">School / University / Medical School</span>
              <span class="opt-sub">Larger educational institutions, associated medical programs</span>
            </button>
            <button class="opt opt-caution" on:click={() => advance('q2', 'bizType', 'heavy-inventory')}>
              <span class="opt-icon">📦</span>
              <span class="opt-label">Heavy Inventory / E-commerce</span>
              <span class="opt-sub">Large product catalogs, fulfilment, stock management</span>
            </button>
          </div>
        </div>

      {:else if step === 'q2'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: 40%"></div>
          </div>
          <div class="q-step-label">Question 2 of 5</div>
          <h3 class="q-heading">How many employees or people does your operation run with?</h3>
          <div class="option-list">
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'solo')}>
              <span class="or-label">Just me / Solo operator</span>
              <span class="or-sub">Owner-operated, no staff or 1-2 helpers</span>
            </button>
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'small')}>
              <span class="or-label">Small team (2-15 people)</span>
              <span class="or-sub">Small business with some staff, growing</span>
            </button>
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'medium')}>
              <span class="or-label">Medium (15-100 people)</span>
              <span class="or-sub">Established operation, multiple departments or crews</span>
            </button>
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'large')}>
              <span class="or-label">Large / Enterprise (100+)</span>
              <span class="or-sub">Larger organizations, institutional, school districts</span>
            </button>
          </div>
        </div>

      {:else if step === 'q3'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: 60%"></div>
          </div>
          <div class="q-step-label">Question 3 of 5</div>
          <h3 class="q-heading">How do you think about a website or software investment?</h3>
          <p class="q-context">Be honest. It helps us give you a real answer.</p>
          <div class="option-list">
            <button class="opt-row opt-row-highlight" on:click={() => advance('q4', 'mindset', 'investment')}>
              <span class="or-label">It's an investment that should return value</span>
              <span class="or-sub">I understand good work costs money and I'm willing to pay for something that actually performs</span>
            </button>
            <button class="opt-row" on:click={() => advance('q4', 'mindset', 'unsure')}>
              <span class="or-label">I'm not sure yet. I need to understand the value first</span>
              <span class="or-sub">I need to be convinced it's worth it before committing</span>
            </button>
            <button class="opt-row opt-row-caution" on:click={() => advance('q4', 'mindset', 'risk')}>
              <span class="or-label">I see it as a risk more than an investment</span>
              <span class="or-sub">I've been burned before or I'm skeptical about spending this kind of money</span>
            </button>
          </div>
        </div>

      {:else if step === 'q4'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: 80%"></div>
          </div>
          <div class="q-step-label">Question 4 of 5</div>
          <h3 class="q-heading">What are you actually looking for right now?</h3>
          <div class="option-list">
            <button class="opt-row" on:click={() => advance('q5', 'need', 'website')}>
              <span class="or-label">A website that actually represents my business</span>
              <span class="or-sub">Custom design, something I own outright, fast and professional</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'software')}>
              <span class="or-label">Custom software or internal tools</span>
              <span class="or-sub">Client portal, job management, bidding tools, ops platform</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'crm')}>
              <span class="or-label">CRM or client management system</span>
              <span class="or-sub">Pipeline, follow-up automation, team tracking</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'it')}>
              <span class="or-label">Ongoing IT support or managed services</span>
              <span class="or-sub">Someone to call when things break, proactive monitoring</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'all')}>
              <span class="or-label">Honestly, probably more than one of these</span>
              <span class="or-sub">My digital infrastructure needs a proper overhaul</span>
            </button>
          </div>
        </div>

      {:else if step === 'q5'}
        <div class="form-card">
          <div class="q-progress">
            <div class="qp-bar" style="width: 95%"></div>
          </div>
          <div class="q-step-label">Question 5 of 5</div>
          <h3 class="q-heading">Are you looking for custom software or tools specifically?</h3>
          <p class="q-context">We build complex internal systems for heavy bidders, job management, and institutional clients. Not every business needs this.</p>
          <div class="option-list">
            <button class="opt-row" on:click={() => { answers.software = 'yes'; calcResult(); }}>
              <span class="or-label">Yes, I need custom software or tools</span>
              <span class="or-sub">Bidding systems, job platforms, portals, ops dashboards</span>
            </button>
            <button class="opt-row" on:click={() => { answers.software = 'no'; calcResult(); }}>
              <span class="or-label">No, a website or CRM is what I need</span>
              <span class="or-sub">I'm not looking for custom-built software right now</span>
            </button>
          </div>
        </div>

      {:else if step === 'result'}
        <div class="form-card result-card result-{fit}">
          <div class="result-indicator result-ind-{fit}">
            {#if fit === 'great'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Strong fit
            {:else if fit === 'maybe'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Possible fit
            {:else}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Not the right fit
            {/if}
          </div>
          <h3 class="result-title">{resultCopy[fit].title}</h3>
          <p class="result-body">{resultCopy[fit].sub}</p>

          {#if fit !== 'no'}
            <div class="result-summary">
              <div class="rs-label">What you told us</div>
              <div class="rs-tags">
                {#if answers.bizType}<span class="rs-tag">{answers.bizType}</span>{/if}
                {#if answers.bizSize}<span class="rs-tag">{answers.bizSize} team</span>{/if}
                {#if answers.need}<span class="rs-tag">{answers.need}</span>{/if}
              </div>
            </div>
          {/if}

          <div class="result-actions">
            <a href={resultCopy[fit].cta} class="btn btn-primary btn-lg">{resultCopy[fit].ctaLabel}</a>
            <button class="btn btn-secondary" on:click={restart}>Start Over</button>
          </div>
        </div>
      {/if}

    </div>
  </div>
</section>

<style>
  .fit-section {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 96px 0;
    position: relative;
    overflow: hidden;
  }

  .fit-bg-glow {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(3,105,161,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .fit-header {
    text-align: center;
    margin-bottom: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .fit-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(26px, 3.5vw, 42px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    line-height: 1.15;
  }

  .fit-sub {
    font-size: 15px;
    color: #475569;
    max-width: 480px;
    line-height: 1.65;
  }

  .form-shell {
    max-width: 720px;
    margin: 0 auto;
    transition: opacity 0.18s ease;
  }

  .form-shell.animating {
    opacity: 0;
  }

  .form-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px 0 6px 0;
    padding: 40px 48px;
    box-shadow: 0 4px 24px rgba(15,23,42,0.05);
  }

  .intro-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .intro-icon {
    margin-bottom: 4px;
  }

  .icon-ring {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(3,105,161,0.1), rgba(13,148,136,0.1));
    border: 1px solid rgba(3,105,161,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0369a1;
  }

  .intro-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .intro-body {
    font-size: 15px;
    color: #475569;
    line-height: 1.65;
    margin: 0;
  }

  .intro-bullets {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .ib {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #374151;
  }

  .ib-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0369a1, #0d9488);
    flex-shrink: 0;
  }

  .q-progress {
    height: 3px;
    background: #e2e8f0;
    border-radius: 2px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .qp-bar {
    height: 100%;
    background: linear-gradient(90deg, #0369a1, #0d9488);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .q-step-label {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .q-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
    line-height: 1.3;
  }

  .q-context {
    font-size: 13px;
    color: #64748b;
    margin-top: -16px;
    margin-bottom: 20px;
    line-height: 1.5;
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
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px 0 4px 0;
    cursor: pointer;
    text-align: left;
    transition: all 0.12s ease;
    font-family: inherit;
  }

  .opt:hover {
    background: #f0f9ff;
    border-color: #7dd3fc;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(3,105,161,0.08);
  }

  .opt-caution {
    background: #fafafa;
    border-color: #fde68a;
  }

  .opt-caution:hover {
    background: #fffbeb;
    border-color: #fbbf24;
    box-shadow: 0 4px 12px rgba(251,191,36,0.1);
  }

  .opt-icon {
    font-size: 20px;
    margin-bottom: 2px;
  }

  .opt-label {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1.3;
  }

  .opt-sub {
    font-size: 11px;
    color: #64748b;
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
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px 0 4px 0;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: all 0.12s ease;
  }

  .opt-row:hover {
    background: #f0f9ff;
    border-color: #7dd3fc;
    transform: translateX(3px);
  }

  .opt-row-highlight {
    background: linear-gradient(135deg, #f0f9ff, #f0fdfa);
    border-color: #bae6fd;
  }

  .opt-row-caution {
    background: #fafafa;
    border-color: #fee2e2;
  }

  .opt-row-caution:hover {
    background: #fff7f7;
    border-color: #fca5a5;
    transform: translateX(3px);
  }

  .or-label {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    font-family: 'Space Grotesk', sans-serif;
    display: block;
  }

  .or-sub {
    font-size: 12px;
    color: #64748b;
    display: block;
    line-height: 1.45;
  }

  .result-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .result-great {
    border-color: #bbf7d0;
    background: linear-gradient(135deg, #f0fdf4, #fff);
  }

  .result-maybe {
    border-color: #bae6fd;
    background: linear-gradient(135deg, #f0f9ff, #fff);
  }

  .result-no {
    border-color: #e2e8f0;
    background: #fafafa;
  }

  .result-indicator {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    border-radius: 2px 0 2px 0;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 0.02em;
  }

  .result-ind-great {
    background: #dcfce7;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }

  .result-ind-maybe {
    background: #dbeafe;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
  }

  .result-ind-no {
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }

  .result-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }

  .result-body {
    font-size: 15px;
    color: #475569;
    line-height: 1.7;
    margin: 0;
  }

  .result-summary {
    background: rgba(0,0,0,0.02);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 14px 18px;
    width: 100%;
  }

  .rs-label {
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .rs-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .rs-tag {
    font-size: 12px;
    color: #0369a1;
    background: rgba(3,105,161,0.07);
    border: 1px solid rgba(3,105,161,0.15);
    border-radius: 2px 0 2px 0;
    padding: 3px 8px;
    font-family: 'DM Mono', monospace;
  }

  .result-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .form-card {
      padding: 28px 24px;
    }
    .option-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
