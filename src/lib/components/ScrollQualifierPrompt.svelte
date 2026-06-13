<script lang="ts">
  import { onMount, tick } from 'svelte';
  import {
    readInlineFitEngaged,
    readScrollPromptShown,
    markScrollPromptShown,
  } from '../fitQualifierStorage';

  /** Fraction of page scroll (0 to 1) before we may show the prompt */
  const SCROLL_THRESHOLD = 0.72;

  let open = false;
  let mounted = false;
  let primaryBtn: HTMLButtonElement | undefined;

  function close() {
    open = false;
  }

  function scrollDepthRatio(): number {
    const el = document.documentElement;
    const scrollable = el.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 1;
    return window.scrollY / scrollable;
  }

  function tryOpen() {
    if (open || readScrollPromptShown() || readInlineFitEngaged()) return;
    if (scrollDepthRatio() < SCROLL_THRESHOLD) return;
    markScrollPromptShown();
    open = true;
  }

  function onScroll() {
    if (!mounted || readScrollPromptShown() || readInlineFitEngaged()) return;
    tryOpen();
  }

  function goToQualifier() {
    close();
    const el = document.getElementById('who-we-serve');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    requestAnimationFrame(() => {
      el?.querySelector<HTMLElement>('button, a')?.focus();
    });
  }

  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }

  $: if (open) {
    void tick().then(() => primaryBtn?.focus());
  }

  onMount(() => {
    if (readScrollPromptShown() || readInlineFitEngaged()) {
      mounted = true;
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    let ticking = false;
    const onScrollThrottled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        onScroll();
      });
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    mounted = true;
    tryOpen();

    return () => {
      window.removeEventListener('scroll', onScrollThrottled);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  });
</script>

{#if open}
  <div class="sqp-root" role="dialog" aria-modal="true" aria-labelledby="sqp-heading">
    <button type="button" class="sqp-backdrop-hit" aria-label="Close dialog" on:click={close}></button>
    <div class="sqp-card">
      <button type="button" class="sqp-close" on:click={close} aria-label="Close">
        ×
      </button>
      <p class="sqp-kicker">Still browsing?</p>
      <h2 id="sqp-heading" class="sqp-title">Before you continue</h2>
      <p class="sqp-body">
        Take one minute to complete the fit check before continuing. Five quick questions and a direct recommendation.
      </p>
      <div class="sqp-actions">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          bind:this={primaryBtn}
          on:click={goToQualifier}
        >
          Start fit check
        </button>
        <button type="button" class="btn btn-secondary" on:click={close}>Not now</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .sqp-root {
    position: fixed;
    inset: 0;
    z-index: 10100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgb(15 23 42 / 0.45);
    backdrop-filter: blur(4px);
  }

  .sqp-backdrop-hit {
    position: absolute;
    inset: 0;
    z-index: 0;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .sqp-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-xl);
    padding: 28px 28px 24px;
  }

  .sqp-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    font-size: 22px;
    line-height: 1;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sqp-close:hover {
    color: var(--text-primary);
    background: var(--bg-muted);
  }

  .sqp-kicker {
    font-size: 11px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .sqp-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    line-height: 1.2;
    margin-bottom: 12px;
  }

  .sqp-body {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin-bottom: 22px;
  }

  .sqp-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (min-width: 480px) {
    .sqp-actions {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
  }
</style>
