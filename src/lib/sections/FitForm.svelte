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
  let floodProgress = 0; // 0..1, how filled the section is
  let rafId: number | null = null;

  function updateFlood() {
    rafId = null;
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // Stretch the flood across the section's full scroll traversal so there's real
    // runway for the wave to crash through. The user reaches halfway through the
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
      title: "You're exactly who we built this for.",
      sub: "Your business looks like a strong fit. Let's have a quick call.",
      cta: '/contact',
      ctaLabel: 'Book a Free Call',
    },
    maybe: {
      title: "We might be a fit. Let's find out.",
      sub: "Reach out and we'll be straight about whether it makes sense.",
      cta: '/contact',
      ctaLabel: 'Talk to Us First',
    },
    no: {
      title: "We're probably not the right call right now.",
      sub: "Based on your answers, we'd likely be a poor fit right now.",
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
    <!-- Single, gentle waterline. One long curve with a slow, seamless phase
         shift. A soft highlight band sits on top to give the edge a sheen
         without piling on multiple competing animations. -->
    <svg
      class="flood-wave"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flood-crest-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(186, 216, 255, 0)" />
          <stop offset="35%" stop-color="rgba(186, 216, 255, 0.42)" />
          <stop offset="100%" stop-color="rgba(186, 216, 255, 0)" />
        </linearGradient>
      </defs>

      <!-- Long, low-amplitude single wave. Drawn twice end-to-end so the
           phase shift animation can loop seamlessly across its full width. -->
      <g class="wave-group">
        <path
          class="wave-fill"
          d="M0,80
             C240,56 480,104 720,80
             C960,56 1200,104 1440,80
             C1680,56 1920,104 2160,80
             C2400,56 2640,104 2880,80
             L2880,180 L0,180 Z"
        />
        <path
          class="wave-sheen"
          d="M0,80
             C240,56 480,104 720,80
             C960,56 1200,104 1440,80
             C1680,56 1920,104 2160,80
             C2400,56 2640,104 2880,80"
        />
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
        and we'll be honest about fit.
      </p>
    </div>

    <div class="form-shell" class:animating>

      {#if step === 'intro'}
        <div class="form-card intro-card">
          <h3 class="intro-heading">Quick qualifier. Five questions.</h3>
          <div class="intro-split">
            <div class="intro-copy">
              <p class="intro-body">
                A quick check before we talk.
                <ContentHighlight tone="comment">Takes under a minute.</ContentHighlight>
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
          <p class="q-context">Be honest. It helps us give you a real answer.</p>
          <div class="option-list">
            <button class="opt-row opt-row-highlight" on:click={() => advance('q4', 'mindset', 'investment')}>
              <span class="or-label">It's an investment that should return value</span>
              <span class="or-sub">I want something that performs</span>
            </button>
            <button class="opt-row" on:click={() => advance('q4', 'mindset', 'unsure')}>
              <span class="or-label">I'm not sure yet. I need to understand the value first</span>
              <span class="or-sub">I need clarity before committing</span>
            </button>
            <button class="opt-row opt-row-caution" on:click={() => advance('q4', 'mindset', 'risk')}>
              <span class="or-label">I see it as a risk more than an investment</span>
              <span class="or-sub">I've been burned before</span>
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

  /* ----- Scroll-driven flood + wave crest ----- */

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
    /* Generous feather at the leading edge; the wave itself supplies the
       shape; the mask just eases the dark tone into the white below it so
       there's never a hard horizontal seam as the flood grows. */
    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 calc(100% - 140px),
      rgba(0, 0, 0, 0.92) calc(100% - 100px),
      rgba(0, 0, 0, 0.7) calc(100% - 60px),
      rgba(0, 0, 0, 0.3) calc(100% - 24px),
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 calc(100% - 140px),
      rgba(0, 0, 0, 0.92) calc(100% - 100px),
      rgba(0, 0, 0, 0.7) calc(100% - 60px),
      rgba(0, 0, 0, 0.3) calc(100% - 24px),
      rgba(0, 0, 0, 0) 100%
    );
  }

  .flood-body {
    position: absolute;
    inset: 0;
    /* Softer, richer gradient with more tonal stops so there's no banding
       against the wave and the depth reads like water rather than a flat
       dark panel. */
    background:
      radial-gradient(
        1200px 640px at 50% 30%,
        rgba(56, 132, 224, 0.22),
        rgba(56, 132, 224, 0) 70%
      ),
      radial-gradient(
        1300px 820px at 85% 8%,
        rgba(99, 102, 241, 0.14),
        rgba(99, 102, 241, 0) 65%
      ),
      radial-gradient(
        900px 520px at 15% 85%,
        rgba(13, 148, 136, 0.12),
        rgba(13, 148, 136, 0) 70%
      ),
      linear-gradient(
        180deg,
        #05091a 0%,
        #0a1528 30%,
        #0c1a30 65%,
        #081224 100%
      );
  }

  /* The waterline: one long, gentle wave with a faint sheen at the crest.
     Positioned so the leading edge of the curve overlaps the mask feather;
     the transparent crest dissolves into white instead of looking stamped. */
  .flood-wave {
    position: absolute;
    left: 0;
    right: 0;
    width: 200%;
    bottom: -36px;
    height: 150px;
    pointer-events: none;
    /* Subtle ambient glow above the waterline sells "depth" without foam. */
    filter: drop-shadow(0 -8px 24px rgba(12, 26, 48, 0.55));
  }

  .wave-group {
    transform-origin: center;
    animation: wave-slide 18s linear infinite;
  }

  .wave-fill {
    fill: #0a1528;
  }

  .wave-sheen {
    fill: none;
    stroke: url(#flood-crest-glow);
    stroke-width: 1.25;
    opacity: 0.85;
  }

  /* Seamless horizontal phase shift: the path is drawn twice end-to-end in
     viewBox space (0 -> 2880), so translating exactly half the width loops
     back to the starting phase with no jump. */
  @keyframes wave-slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  /* Hide the wave entirely when fully submerged, with no seam inside a solid block. */
  .fit-section.is-flooded .flood-wave {
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .wave-group {
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

  /* Flip header text colors once the flood has started. The title area is the
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
    background: linear-gradient(
      135deg,
      rgba(3, 105, 161, 0.04) 0%,
      rgba(3, 105, 161, 0.12) 100%
    );
    border: 1px solid rgba(3, 105, 161, 0.15);
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
