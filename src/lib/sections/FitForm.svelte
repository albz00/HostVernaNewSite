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

  // Scroll-linked "flood": dark gradient pours down from the top of the section as you scroll,
  // with an animated wave crest at its leading edge.
  let sectionEl: HTMLElement | null = null;
  let floodProgress = 0; // 0..1 — how filled the section is
  let rafId: number | null = null;

  function updateFlood() {
    rafId = null;
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // Stretch the flood across the section's full scroll traversal so there's real
    // runway for the wave to crash through — the user reaches halfway through the
    // section with the wave still actively mid-fall.
    //   rect.top = vh       (section just entered bottom)  -> progress 0 (pure white)
    //   rect.top = 0        (section fully in view)        -> progress ~ vh / (H + vh)
    //   rect.bottom = 0     (section fully scrolled past)  -> progress 1 (fully flooded)
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
      title: "You're exactly who we built this for.",
      sub: "Based on what you told us, your business is a strong fit. We work with businesses like yours every week. Let's have a quick call and see if we can help.",
      cta: '/contact',
      ctaLabel: 'Book a Free Call',
    },
    maybe: {
      title: "We might be a fit. Let's find out.",
      sub: "Your business isn't a perfect mold, but that doesn't mean we can't help. Reach out and we'll be straight with you about whether it makes sense.",
      cta: '/contact',
      ctaLabel: 'Talk to Us First',
    },
    no: {
      title: "We're probably not the right call right now.",
      sub: "Based on your answers, we'd likely be a poor fit at this stage. That's not a judgment, it's just honest. We'd rather tell you now than waste your time.",
      cta: '/about',
      ctaLabel: 'Learn What We Do',
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
    <div class="flood-body"></div>
    <svg
      class="flood-wave"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flood-foam-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(148,197,255,0)" />
          <stop offset="20%" stop-color="rgba(148,197,255,0.85)" />
          <stop offset="50%" stop-color="rgba(196,220,255,1)" />
          <stop offset="80%" stop-color="rgba(148,197,255,0.85)" />
          <stop offset="100%" stop-color="rgba(148,197,255,0)" />
        </linearGradient>
      </defs>

      <!-- Deepest wave: broad swell, slow -->
      <path
        class="wave-path wave-deep"
        d="M0,70 C240,30 480,110 720,70 C960,30 1200,110 1440,70 L1440,220 L0,220 Z"
      />

      <!-- Mid wave: medium amplitude, different phase -->
      <path
        class="wave-path wave-mid"
        d="M0,100 C180,65 360,135 540,100 C720,65 900,135 1080,100 C1260,65 1440,135 1440,100 L1440,220 L0,220 Z"
      />

      <!-- Front crest: sharper, faster -->
      <path
        class="wave-path wave-crest"
        d="M0,130 C120,100 240,160 360,130 C480,100 600,160 720,130 C840,100 960,160 1080,130 C1200,100 1320,160 1440,130 L1440,220 L0,220 Z"
      />

      <!-- Bright foam highlight along the crest -->
      <path
        class="wave-foam wave-foam-main"
        d="M0,130 C120,100 240,160 360,130 C480,100 600,160 720,130 C840,100 960,160 1080,130 C1200,100 1320,160 1440,130"
      />

      <!-- Secondary thinner foam line, offset for parallax depth -->
      <path
        class="wave-foam wave-foam-thin"
        d="M0,100 C180,65 360,135 540,100 C720,65 900,135 1080,100 C1260,65 1440,135 1440,100"
      />

      <!-- Scattered droplets / bubbles for water texture -->
      <g class="bubbles">
        <circle cx="120" cy="85" r="2.4" />
        <circle cx="260" cy="110" r="1.6" />
        <circle cx="410" cy="75" r="2.8" />
        <circle cx="545" cy="118" r="1.8" />
        <circle cx="690" cy="92" r="2.2" />
        <circle cx="820" cy="118" r="1.4" />
        <circle cx="955" cy="80" r="2.6" />
        <circle cx="1090" cy="115" r="1.8" />
        <circle cx="1220" cy="88" r="2.4" />
        <circle cx="1340" cy="108" r="1.6" />
      </g>
    </svg>
  </div>
  <div class="container">
    <div class="fit-header">
      <h2 class="fit-title">
        We're selective about who we work with.<br />
        <span class="gradient-text">Here's why that's good for you.</span>
      </h2>
      <p class="fit-sub">
        We don't take every project.
        <ContentHighlight tone="keyword">Answer five quick questions</ContentHighlight>
        and we'll tell you honestly whether we think we can help.
      </p>
    </div>

    <div class="form-shell" class:animating>

      {#if step === 'intro'}
        <div class="form-card intro-card">
          <h3 class="intro-heading">Quick qualifier. Five questions.</h3>
          <div class="intro-split">
            <div class="intro-copy">
              <p class="intro-body">
                We've turned down projects that weren't right.
                <ContentHighlight tone="comment">This helps both of us save time.</ContentHighlight>
                Takes under a minute.
              </p>
              <div class="intro-bullets">
                <div class="ib"><div class="ib-dot"></div><span>We'll tell you straight if we're not the right fit</span></div>
                <div class="ib"><div class="ib-dot"></div><span>No sales pressure from this form</span></div>
                <div class="ib"><div class="ib-dot"></div><span>Financing available if budget is a concern</span></div>
              </div>
            </div>
            <aside class="intro-qualifier-panel">
              <QualifierIcon src={qualifierIconUrl} />
            </aside>
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
              <span class="opt-label">Trades / Construction / Excavating</span>
              <span class="opt-sub">Contractors, builders, landscapers, excavators, HVAC, plumbing, etc.</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'local')}>
              <span class="opt-label">Local Service Business</span>
              <span class="opt-sub">High traffic area, small to medium, service focused, not heavy inventory</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'dental')}>
              <span class="opt-label">Dental / Medical / Brochure</span>
              <span class="opt-sub">Professional services, practices, informational or appointment-based sites</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'government')}>
              <span class="opt-label">Government / Municipal</span>
              <span class="opt-sub">Government sectors, municipalities, school districts</span>
            </button>
            <button class="opt" on:click={() => advance('q2', 'bizType', 'education')}>
              <span class="opt-label">School / University / Medical School</span>
              <span class="opt-sub">Larger educational institutions, associated medical programs</span>
            </button>
            <button class="opt opt-caution" on:click={() => advance('q2', 'bizType', 'heavy-inventory')}>
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

  /* ----- Scroll-driven flood + wave crest ----- */

  .flood {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /* Grows as you scroll. Goes slightly past 100% so the wave can clear out. */
    height: calc(var(--flood, 0) * 108%);
    pointer-events: none;
    z-index: 0;
    will-change: height;
    transition: height 0.08s linear;
    /* Thin, natural feather at the very bottom — just enough to kill the hard
       cutoff line while keeping the wave detail crisp. */
    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 calc(100% - 56px),
      rgba(0, 0, 0, 0.85) calc(100% - 32px),
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 calc(100% - 56px),
      rgba(0, 0, 0, 0.85) calc(100% - 32px),
      rgba(0, 0, 0, 0) 100%
    );
  }

  .flood-body {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        1000px 520px at 50% 35%,
        rgba(59, 130, 246, 0.22),
        rgba(59, 130, 246, 0) 65%
      ),
      radial-gradient(
        1200px 700px at 85% 10%,
        rgba(99, 102, 241, 0.16),
        rgba(99, 102, 241, 0) 60%
      ),
      linear-gradient(180deg, #050914 0%, #0b1324 40%, #0b1324 75%, #050914 100%);
  }

  /* Wave crest sits straddling the bottom edge of the flood — its top half is
     transparent (rising curves) and the lower body is the same dark tone,
     so it reads as a fluid, textured leading edge with real motion. */
  .flood-wave {
    position: absolute;
    left: -8%;
    right: -8%;
    width: 116%;
    bottom: -72px;
    height: 200px;
    pointer-events: none;
    filter: drop-shadow(0 -6px 20px rgba(7, 12, 28, 0.5));
  }

  .wave-path {
    fill: #0b1324;
  }

  .wave-deep {
    opacity: 0.5;
    fill: #020617;
    transform-origin: center;
    animation: wave-drift-deep 11s ease-in-out infinite alternate;
  }

  .wave-mid {
    opacity: 0.85;
    fill: #091021;
    animation: wave-drift-mid 7.5s ease-in-out infinite alternate;
  }

  .wave-crest {
    opacity: 1;
    fill: #0b1324;
    animation: wave-drift-crest 4.5s ease-in-out infinite alternate;
  }

  /* Foam highlights along the crest lines — bright, glowing ribbons. */
  .wave-foam {
    fill: none;
    stroke-linecap: round;
  }

  .wave-foam-main {
    stroke: url(#flood-foam-grad);
    stroke-width: 2;
    filter: drop-shadow(0 0 8px rgba(148, 197, 255, 0.6))
            drop-shadow(0 0 18px rgba(99, 130, 255, 0.35));
    animation: wave-drift-crest 4.5s ease-in-out infinite alternate;
  }

  .wave-foam-thin {
    stroke: rgba(148, 197, 255, 0.45);
    stroke-width: 1;
    stroke-dasharray: 6 12;
    filter: drop-shadow(0 0 4px rgba(148, 197, 255, 0.4));
    animation: wave-drift-mid 7.5s ease-in-out infinite alternate;
  }

  /* Floating bubbles/droplets — texture along the wave crest. */
  .bubbles circle {
    fill: rgba(196, 220, 255, 0.75);
    filter: drop-shadow(0 0 4px rgba(148, 197, 255, 0.6));
    transform-origin: center;
    animation: bubble-bob 6s ease-in-out infinite;
  }
  .bubbles circle:nth-child(2n)  { animation-duration: 7.5s; animation-delay: -1.2s; opacity: 0.85; }
  .bubbles circle:nth-child(3n)  { animation-duration: 9s;   animation-delay: -2.4s; opacity: 0.6;  }
  .bubbles circle:nth-child(5n)  { animation-duration: 5.5s; animation-delay: -3.1s; }

  @keyframes wave-drift-deep {
    from { transform: translate3d(-4%, 0, 0) scaleY(1); }
    to   { transform: translate3d(4%, -3px, 0) scaleY(1.04); }
  }

  @keyframes wave-drift-mid {
    from { transform: translate3d(3%, 0, 0) scaleY(1); }
    to   { transform: translate3d(-3%, -5px, 0) scaleY(1.05); }
  }

  @keyframes wave-drift-crest {
    from { transform: translate3d(-2%, 0, 0) scaleY(1); }
    to   { transform: translate3d(2%, -7px, 0) scaleY(1.08); }
  }

  @keyframes bubble-bob {
    0%   { transform: translate3d(0, 0, 0)    scale(1);    opacity: 0.9; }
    50%  { transform: translate3d(2px, -4px, 0) scale(1.15); opacity: 1;   }
    100% { transform: translate3d(-2px, 0, 0) scale(0.9);  opacity: 0.7; }
  }

  /* Hide the wave crest entirely when fully submerged — no seam inside a solid block. */
  .fit-section.is-flooded .flood-wave {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .wave-deep,
    .wave-mid,
    .wave-crest,
    .wave-foam,
    .bubbles circle {
      animation: none;
    }
    .flood {
      transition: none;
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

  /* Flip header text colors once the flood has started — the title area is the
     first thing to submerge, so as soon as the wave breaks into the section we
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
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
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
    color: #0369a1;
    background: rgba(3,105,161,0.07);
    border: 1px solid rgba(3,105,161,0.15);
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
    .form-card {
      padding: 28px 24px;
    }
    .option-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
