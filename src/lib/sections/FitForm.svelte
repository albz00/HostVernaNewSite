<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ContentHighlight from '../components/ContentHighlight.svelte';
  import QualifierIcon from '../components/QualifierIcon.svelte';
  import { markInlineFitEngaged } from '../fitQualifierStorage';

  /** 3D phone illustration, intro column only */
  const qualifierIconUrl =
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/63de609e-76d4-43f2-8290-42735a3cfb00/public';

  type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'result';
  type Fit = 'great' | 'maybe' | 'no';

  let step: Step = 'intro';
  let answers: Record<string, string> = {};
  let fit: Fit = 'great';
  let animating = false;

  // Scroll-linked "flood": gradient and generated code rows pour down from the top
  // of the section as you scroll.
  let sectionEl: HTMLElement | null = null;
  let floodProgress = 0; // 0..1, how filled the section is
  let rafId: number | null = null;

  type CodeRow = {
    id: number;
    yPx: number;
    fontSize: number;
    spawn: number;
    alpha: number;
    tone: 0 | 1 | 2;
    content: string;
    chars: number;
    typeDuration: number;
    typeDelay: number;
  };

  const fract = (n: number) => n - Math.floor(n);
  const noise = (seed: number) => fract(Math.sin(seed * 12.9898) * 43758.5453);
  const pick = <T,>(list: T[], seed: number): T => list[Math.floor(noise(seed) * list.length) % list.length];

  // Valid TS/Svelte lines so the stream reads like real code, not gibberish.
  const codeSnippets = [
    "import { onMount, onDestroy } from 'svelte';",
    "import { markInlineFitEngaged } from '../fitQualifierStorage';",
    'let floodProgress = 0;',
    'let rafId: number | null = null;',
    "type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'result';",
    "type Fit = 'great' | 'maybe' | 'no';",
    'const rect = sectionEl.getBoundingClientRect();',
    'const vh = window.innerHeight || 1;',
    'const denom = rect.height + vh;',
    'const raw = denom > 0 ? (vh - rect.top) / denom : 0;',
    'const c = Math.max(0, Math.min(1, raw));',
    'floodProgress = c * c * (3 - 2 * c);',
    "window.addEventListener('scroll', onScroll, { passive: true });",
    "window.addEventListener('resize', onScroll);",
    "window.removeEventListener('scroll', onScroll);",
    "window.removeEventListener('resize', onScroll);",
    "if (rafId != null) cancelAnimationFrame(rafId);",
    "if (step === 'intro' && nextStep !== 'intro') { markInlineFitEngaged(); }",
    'if (key && value) answers[key] = value;',
    "if (type === 'heavy-inventory') { fit = 'no'; }",
    "else if (mindset === 'risk') { fit = 'no'; }",
    "else if (software === 'yes') { fit = 'great'; }",
    "else { fit = 'maybe'; }",
    "const resultCopy: Record<Fit, { title: string; sub: string; cta: string; ctaLabel: string }> = {",
    "  great: { title: \"You're exactly who we built this for.\", cta: '/contact', ctaLabel: 'Book a Free Call' },",
    "  maybe: { title: \"We might be a fit. Let's find out.\", cta: '/contact', ctaLabel: 'Talk to Us First' },",
    "  no: { title: \"We're probably not the right call right now.\", cta: '/about', ctaLabel: 'Learn What We Do' },",
    '};',
  ];

  function makeCodeRow(seed: number): string {
    const partCount = 2 + Math.floor(noise(seed + 9) * 2);
    const parts: string[] = [];
    for (let i = 0; i < partCount; i += 1) {
      parts.push(pick(codeSnippets, seed + i * 7 + 3));
    }
    return parts.join('   ');
  }

  const codeRows: CodeRow[] = Array.from({ length: 22 }, (_, i) => {
    const lane = 42 + i * 52;
    const yPx = Math.round(Math.max(22, lane + (noise(i + 1) - 0.5) * 8));
    return {
      id: i,
      yPx,
      fontSize: 11 + Math.round(noise(i + 13) * 3),
      spawn: Math.max(0.02, Math.min(0.96, i / 21 - 0.08 + (noise(i + 31) - 0.5) * 0.04)),
      alpha: 0.16 + noise(i + 37) * 0.2,
      tone: Math.floor(noise(i + 41) * 3) as 0 | 1 | 2,
      content: makeCodeRow(i + 53),
      chars: 44 + Math.floor(noise(i + 47) * 34),
      typeDuration: 4.4 + noise(i + 59) * 3.2,
      typeDelay: noise(i + 61) * 2.6,
    };
  });

  function updateFlood() {
    rafId = null;
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // Stretch the flood across the section's full scroll traversal so there's real
    // runway for the flood to travel through. The user reaches halfway through
    // the section with the effect still actively mid-fall.
    //   rect.top = vh       (section just entered bottom)  -> progress 0 (pure white)
    //   rect.top = 0        (section fully in view)        -> progress ~ vh / (H + vh)
    //   rect.bottom = 0     (section fully scrolled past)  -> progress 1
    const denom = rect.height + vh;
    const raw = denom > 0 ? (vh - rect.top) / denom : 0;
    const c = Math.max(0, Math.min(1, raw));
    // Gentle easeInOut so the water starts/settles smoothly without feeling laggy mid-scroll.
    floodProgress = c * c * (3 - 2 * c);
  }

  function onScroll() {
    if (rafId != null) return;
    rafId = requestAnimationFrame(updateFlood);
  }

  function advance(nextStep: Step, key?: string, value?: string) {
    if (step === 'intro' && nextStep !== 'intro') {
      markInlineFitEngaged();
    }
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
      type === 'aviation' ||
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

  onMount(() => {
    updateFlood();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
    if (rafId != null) cancelAnimationFrame(rafId);
  });

  const resultCopy: Record<Fit, { title: string; sub: string; cta: string; ctaLabel: string }> = {
    great: {
      title: 'Your business appears to be a strong fit.',
      sub: 'Based on your responses, a short call is the best next step.',
      cta: '/contact',
      ctaLabel: 'Book a call',
    },
    maybe: {
      title: 'There may be a fit.',
      sub: 'Contact us and we will give you a direct recommendation based on your goals.',
      cta: '/contact',
      ctaLabel: 'Contact us',
    },
    no: {
      title: 'Another provider may be a better fit today.',
      sub: 'Based on your responses, a different service model may better match your current needs.',
      cta: '/about',
      ctaLabel: 'See our scope',
    },
  };
</script>

<section
  class="fit-section"
  id="who-we-serve"
  bind:this={sectionEl}
  class:is-flooding={floodProgress > 0.02 && floodProgress < 0.99}
  class:is-flooded={floodProgress >= 0.99}
  style="--flood: {floodProgress}"
>
  <div class="flood" aria-hidden="true">
    <div class="flood-body">
      <div class="code-screen">
        <div class="code-field">
          {#each codeRows as row (row.id)}
            <div
              class="code-row code-tone-{row.tone}"
              style="
                --y: {row.yPx}px;
                --font-size: {row.fontSize}px;
                --spawn: {row.spawn};
                --row-alpha: {row.alpha};
              "
            >
              <span
                class="code-track"
                style="
                  --chars: {row.chars};
                  --type-duration: {row.typeDuration}s;
                  --type-delay: {row.typeDelay}s;
                "
              >
                {row.content}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="fit-header">
      <h2 class="fit-title">
        We don't take every project.<br />
        <span class="gradient-text">Let's see if we fit yours.</span>
      </h2>
      <p class="fit-sub">
        <ContentHighlight tone="keyword">Answer five quick questions</ContentHighlight>
        and we will tell you directly whether we are the right fit.
      </p>
    </div>

    <div class="form-shell" class:animating>

      {#if step === 'intro'}
        <div class="form-card intro-card">
          <h3 class="intro-heading">A quick fit check. Five questions.</h3>
          <div class="intro-split">
            <div class="intro-copy">
              <p class="intro-body">
                A short read on your business before we ever talk.
                <ContentHighlight tone="comment">Takes under a minute.</ContentHighlight>
              </p>
              <div class="intro-bullets">
                <div class="ib"><div class="ib-dot"></div><span>If we are not the right fit, we will say so</span></div>
                <div class="ib"><div class="ib-dot"></div><span>This form is for qualification, not sales pressure</span></div>
                <div class="ib"><div class="ib-dot"></div><span>Financing available if budget is the concern</span></div>
              </div>
            </div>
            <aside class="intro-qualifier-panel">
              <QualifierIcon src={qualifierIconUrl} />
            </aside>
          </div>
          <button class="btn btn-primary btn-lg" on:click={() => advance('q1')}>Start the Fit Check</button>
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
              <span class="opt-label">Trades / Construction / Excavating</span>
              <span class="opt-sub">Contractors, builders, HVAC, plumbing, landscaping</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'local')}>
              <span class="opt-label">Local Service Business</span>
              <span class="opt-sub">Service-focused, small to medium, not heavy inventory</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'dental')}>
              <span class="opt-label">Dental / Medical / Brochure</span>
              <span class="opt-sub">Professional or appointment-based sites</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'aviation')}>
              <span class="opt-label">Aviation / Flight</span>
              <span class="opt-sub">Charters, schools, airports, FBOs, maintenance</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'government')}>
              <span class="opt-label">Government / Municipal</span>
              <span class="opt-sub">Municipalities and public-sector teams</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'education')}>
              <span class="opt-label">School / University / Medical School</span>
              <span class="opt-sub">Educational institutions and programs</span>
            </button>
            <button class="opt opt-caution" on:click={() => advance('q2', 'bizType', 'heavy-inventory')}>
              <span class="opt-label">Heavy Inventory / E-commerce</span>
              <span class="opt-sub">Large catalogs, fulfillment, or stock management</span>
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
              <span class="or-sub">Owner-operated or 1-2 helpers</span>
            </button>
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'small')}>
              <span class="or-label">Small team (2-15 people)</span>
              <span class="or-sub">Small but growing</span>
            </button>
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'medium')}>
              <span class="or-label">Medium (15-100 people)</span>
              <span class="or-sub">Established, with teams or crews</span>
            </button>
            <button class="opt-row" on:click={() => advance('q3', 'bizSize', 'large')}>
              <span class="or-label">Large / Enterprise (100+)</span>
              <span class="or-sub">Larger organization or institution</span>
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
          <p class="q-context">Provide the most accurate answer. It helps us give you a useful recommendation.</p>
          <div class="option-list">
            <button class="opt-row opt-row-highlight" on:click={() => advance('q4', 'mindset', 'investment')}>
              <span class="or-label">It is an investment that should produce measurable value</span>
              <span class="or-sub">I want a solution that performs and scales</span>
            </button>
            <button class="opt-row" on:click={() => advance('q4', 'mindset', 'unsure')}>
              <span class="or-label">I am not sure yet and need to understand value first</span>
              <span class="or-sub">I need clarity before making a commitment</span>
            </button>
            <button class="opt-row opt-row-caution" on:click={() => advance('q4', 'mindset', 'risk')}>
              <span class="or-label">I currently see this as a risk more than an investment</span>
              <span class="or-sub">I need a conservative approach</span>
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
              <span class="or-sub">Custom, professional, and owned by me</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'software')}>
              <span class="or-label">Custom software or internal tools</span>
              <span class="or-sub">Portals, job tools, dashboards</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'crm')}>
              <span class="or-label">CRM or client management system</span>
              <span class="or-sub">Pipeline, follow-up, team tracking</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'it')}>
              <span class="or-label">Ongoing IT support or managed services</span>
              <span class="or-sub">Support when things break</span>
            </button>
            <button class="opt-row" on:click={() => advance('q5', 'need', 'all')}>
              <span class="or-label">Honestly, probably more than one of these</span>
              <span class="or-sub">I need a broader cleanup</span>
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
          <p class="q-context">Not every business needs custom software. This helps us sort that out.</p>
          <div class="option-list">
            <button class="opt-row" on:click={() => { answers.software = 'yes'; calcResult(); }}>
              <span class="or-label">Yes, I need custom software or tools</span>
              <span class="or-sub">Systems, portals, platforms, dashboards</span>
            </button>
            <button class="opt-row" on:click={() => { answers.software = 'no'; calcResult(); }}>
              <span class="or-label">No, a website or CRM is what I need</span>
              <span class="or-sub">No custom software right now</span>
            </button>
          </div>
        </div>

      {:else if step === 'result'}
        <div class="form-card result-card result-{fit}">
          <div class="result-indicator result-ind-{fit}">
            {#if fit === 'great'}
              Strong fit
            {:else if fit === 'maybe'}
              Possible fit
            {:else}
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
    /* Literal white base so the section reads identical to the ones above/below
       until the flood actually arrives. */
    background: var(--bg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 120px 0;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  /* ----- Scroll-driven flood + generated code rows ----- */

  .flood {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(var(--flood, 0) * 108%);
    pointer-events: none;
    z-index: 0;
    will-change: height;
    /* Slightly longer transition smooths out the scroll-driven growth so
       the leading edge never strobes when frames arrive close together. */
    transition: height 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    /* Generous feather at the leading edge eases dark tone into white below it
       so there is never a hard horizontal seam as the flood grows. */
    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 calc(100% - 124px),
      rgba(0, 0, 0, 0.9) calc(100% - 88px),
      rgba(0, 0, 0, 0.68) calc(100% - 54px),
      rgba(0, 0, 0, 0.3) calc(100% - 22px),
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 calc(100% - 124px),
      rgba(0, 0, 0, 0.9) calc(100% - 88px),
      rgba(0, 0, 0, 0.68) calc(100% - 54px),
      rgba(0, 0, 0, 0.3) calc(100% - 22px),
      rgba(0, 0, 0, 0) 100%
    );
  }

  .flood-body {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #061933;
  }

  .flood-body::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(1200px 540px at 50% -12%, rgba(56, 189, 248, 0.1), rgba(56, 189, 248, 0) 68%),
      radial-gradient(1100px 680px at 50% 116%, rgba(2, 6, 23, 0.55), rgba(2, 6, 23, 0) 70%);
    pointer-events: none;
  }

  .code-screen {
    position: absolute;
    inset: 6% 4.5% 5%;
    border-radius: 40px / 30px;
    border: 1px solid rgba(148, 196, 255, 0.3);
    background:
      radial-gradient(130% 92% at 50% 0%, rgba(125, 211, 252, 0.12), rgba(125, 211, 252, 0) 60%),
      rgba(2, 12, 26, 0.56);
    box-shadow:
      0 18px 48px -24px rgba(2, 6, 23, 0.9),
      inset 0 0 0 1px rgba(226, 232, 240, 0.06),
      inset 0 -24px 60px rgba(2, 6, 23, 0.34);
    overflow: hidden;
    transform: perspective(1200px) rotateX(3deg) scale(1.015);
    transform-origin: center top;
    pointer-events: none;
  }

  .code-screen::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(78% 60% at 16% 0%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0) 56%),
      linear-gradient(118deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 38%);
    mix-blend-mode: screen;
    opacity: 0.4;
    pointer-events: none;
  }

  .code-screen::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(130% 100% at 50% 50%, rgba(255, 255, 255, 0) 42%, rgba(2, 6, 23, 0.42) 100%),
      repeating-linear-gradient(
        to bottom,
        rgba(148, 163, 184, 0.055) 0px,
        rgba(148, 163, 184, 0.055) 1px,
        rgba(148, 163, 184, 0) 3px,
        rgba(148, 163, 184, 0) 4px
      );
    pointer-events: none;
  }

  .code-field {
    position: absolute;
    inset: 5.5% 4.6% 7%;
    pointer-events: none;
    overflow: hidden;
    border-radius: 30px / 22px;
    transform: perspective(900px) rotateX(1.2deg) scale(1.008);
    transform-origin: center top;
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.95) 7%,
      #000 50%,
      rgba(0, 0, 0, 0.95) 93%,
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.95) 7%,
      #000 50%,
      rgba(0, 0, 0, 0.95) 93%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .code-row {
    position: absolute;
    left: 3%;
    width: 94%;
    top: var(--y);
    font-family: 'DM Mono', monospace;
    font-size: var(--font-size);
    line-height: 1;
    white-space: nowrap;
    letter-spacing: 0.02em;
    opacity: clamp(0, calc((var(--flood, 0) - var(--spawn, 0)) * 3.8 + var(--row-alpha, 0.15)), 0.55);
    transform: translateY(calc((1 - var(--flood, 0)) * 42px));
  }

  .code-track {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    border-right: 1px solid currentColor;
    text-overflow: clip;
    text-shadow: 0 0 8px rgba(147, 197, 253, 0.2);
    animation: code-type var(--type-duration) steps(var(--chars), end) infinite;
    animation-delay: var(--type-delay);
    will-change: width;
  }

  .code-tone-0 {
    color: rgba(240, 249, 255, 0.72);
  }

  .code-tone-1 {
    color: rgba(236, 254, 255, 0.68);
  }

  .code-tone-2 {
    color: rgba(207, 250, 254, 0.66);
  }

  @keyframes code-type {
    0%,
    8% {
      width: 0ch;
    }
    56%,
    82% {
      width: calc(var(--chars) * 1ch);
    }
    100% {
      width: 0ch;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .code-track {
      animation: none;
      width: 72%;
      border-right: 0;
    }
    .flood {
      transition: none;
    }
  }

  /* Mobile: keep scroll-linked dark blue fill only, no code / faux screen
     (perspective, masks, and typing rows fight small viewports + touch scroll). */
  @media (max-width: 768px) {
    .code-screen {
      display: none;
    }

    .flood {
      /* Height is driven every frame from scroll; transitions read as laggy
         or “swimming” on iOS/Android. */
      transition: none;
      will-change: auto;
    }

    .flood-body {
      background:
        radial-gradient(120% 70% at 50% 0%, rgba(56, 189, 248, 0.14), rgba(56, 189, 248, 0) 58%),
        radial-gradient(100% 55% at 50% 100%, rgba(2, 6, 23, 0.45), rgba(2, 6, 23, 0) 65%),
        #061933;
    }

    .flood-body::before {
      /* Avoid stacking desktop ::before glows on top of the mobile fill. */
      background: none;
    }
  }

  /* Content above the flood. */
  .fit-section > .container {
    position: relative;
    z-index: 2;
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
    transition: color 0.35s ease, text-shadow 0.35s ease;
  }

  .fit-sub {
    font-size: 15px;
    color: #475569;
    max-width: 480px;
    line-height: 1.65;
    transition: color 0.35s ease;
  }

  /* Flip header text colors once the flood has started. The title area is the
     first thing to submerge, so as soon as the flood enters the section we
     switch to light text for contrast. */
  .fit-section.is-flooding .fit-title,
  .fit-section.is-flooded .fit-title {
    color: #f8fafc;
    text-shadow: 0 1px 30px rgba(0, 0, 0, 0.45);
  }

  .fit-section.is-flooding .fit-sub,
  .fit-section.is-flooded .fit-sub {
    color: #cbd5e1;
  }

  .fit-section.is-flooding .fit-title :global(.gradient-text),
  .fit-section.is-flooded .fit-title :global(.gradient-text) {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
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
    position: relative;
    overflow: visible;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 40px 48px;
    box-shadow:
      0 20px 60px -20px rgba(0, 0, 0, 0.55),
      0 8px 24px -12px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  .intro-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .intro-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(152px, 228px);
    gap: clamp(20px, 4vw, 36px);
    align-items: stretch;
    width: 100%;
  }

  .intro-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* No extra tile behind the art; just centers the icon in the column */
  .intro-qualifier-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-width: 0;
  }

  @media (max-width: 560px) {
    .intro-split {
      grid-template-columns: 1fr;
    }
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
    background: var(--primary);
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
    background: var(--primary);
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
    border-radius: var(--radius-tile);
    cursor: pointer;
    text-align: left;
    transition: border-color 0.12s ease, background 0.12s ease;
    font-family: inherit;
  }

  .opt:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .opt-caution {
    background: #fafafa;
    border-color: #e5e7eb;
  }

  .opt-caution:hover {
    background: #f9fafb;
    border-color: #d1d5db;
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
    border-radius: var(--radius-tile);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: border-color 0.12s ease, background 0.12s ease;
  }

  .opt-row:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .opt-row-highlight {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .opt-row-caution {
    background: #fafafa;
    border-color: #fee2e2;
  }

  .opt-row-caution:hover {
    background: #fafafa;
    border-color: #d1d5db;
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
    border-color: #d1fae5;
    background: #fafafa;
  }

  .result-maybe {
    border-color: #e2e8f0;
    background: #fafafa;
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
    border-radius: var(--radius-tile-sm);
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
    border-radius: var(--radius-tile-sm);
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
    color: #0b7285;
    background: linear-gradient(
      135deg,
      rgba(3, 105, 161, 0.08) 0%,
      rgba(13, 148, 136, 0.12) 100%
    );
    border: 1px solid rgba(13, 148, 136, 0.2);
    border-radius: var(--radius-tile-sm);
    padding: 3px 8px;
    font-family: 'DM Mono', monospace;
  }

  .result-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .fit-section {
      padding: 72px 0;
    }

    .fit-header {
      margin-bottom: 34px;
      gap: 12px;
    }

    .fit-title {
      font-size: clamp(26px, 8.5vw, 34px);
    }

    .fit-sub {
      font-size: 14.5px;
      line-height: 1.6;
    }

    .form-card {
      padding: 28px 24px;
    }
    .option-grid {
      grid-template-columns: 1fr;
    }

    .result-actions {
      width: 100%;
      flex-direction: column;
    }

    .result-actions .btn {
      width: 100%;
    }
  }

  @media (max-width: 420px) {
    .form-card {
      padding: 24px 16px;
    }

    .intro-heading,
    .q-heading,
    .result-title {
      font-size: 20px;
    }

    .intro-body,
    .result-body {
      font-size: 14px;
      line-height: 1.6;
    }

    .ib {
      align-items: flex-start;
      font-size: 13px;
      line-height: 1.45;
    }

    .opt,
    .opt-row {
      padding: 14px;
    }

    .or-label,
    .opt-label {
      font-size: 13px;
    }
  }
</style>
