<script lang="ts">
  import { onMount } from 'svelte';

  /** Bump when dismiss behavior/content changes so users aren’t stuck hidden forever */
  const STORAGE_KEY = 'hv_financing_bubble_dismissed_v2';

  function readDismissed(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  let open = false;
  let dismissed = readDismissed();

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  function dismissBubble(e: MouseEvent) {
    e.stopPropagation();
    open = false;
    dismissed = true;
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

{#if !dismissed}
<div class="ff-root">
  {#if open}
    <div
      id="financing-faq-panel"
      class="ff-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ff-heading"
    >
      <button type="button" class="ff-close" on:click={close} aria-label="Close message">×</button>
      <h2 id="ff-heading" class="ff-heading">Financing</h2>
      <p class="ff-lead">Yes, we offer financing.</p>
      <p class="ff-body">
        If budget is a concern, ask us about spreading payments for your website, software, or bundled
        work. We will explain available options and recommend what fits your project requirements.
      </p>
      <ul class="ff-bullets">
        <li>Options depend on scope and timeline</li>
        <li>Discussed upfront before anything is signed</li>
        <li>Same ownership model: you still own what you pay for</li>
      </ul>
      <a href="/contact" class="btn btn-primary ff-cta" on:click={close}>Talk to us about it</a>
    </div>
  {/if}

  <div class="ff-bubble-wrap">
    <button
      type="button"
      class="ff-bubble-x"
      on:click={dismissBubble}
      aria-label="Dismiss financing message"
    >
      ×
    </button>
    <button
      type="button"
      class="ff-bubble"
      on:click={toggle}
      aria-expanded={open}
      aria-controls={open ? 'financing-faq-panel' : undefined}
    >
      <span class="ff-bubble-inner">
        <span class="ff-bubble-label">We offer financing</span>
        <span class="ff-bubble-hint">{open ? 'Close' : 'Questions? Tap for details'}</span>
      </span>
    </button>
  </div>
</div>
{/if}

<style>
  .ff-root {
    position: fixed;
    bottom: max(20px, env(safe-area-inset-bottom, 20px));
    right: max(20px, env(safe-area-inset-right, 20px));
    z-index: 10050;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 10px;
    max-width: calc(100vw - 32px);
    pointer-events: auto;
  }

  .ff-panel {
    position: relative;
    z-index: 2;
    width: min(320px, calc(100vw - 32px));
    padding: 18px 18px 20px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    box-shadow: var(--shadow-lg);
    text-align: left;
    animation: ff-panel-in 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes ff-panel-in {
    from {
      opacity: 0;
      transform: translate3d(0, 8px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .ff-close {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    border-radius: var(--radius-tile-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.22s ease-out, background 0.22s ease-out, transform 0.2s ease-out;
  }

  .ff-close:hover {
    color: var(--text-primary);
    background: var(--bg-subtle);
    transform: scale(1.05);
  }

  .ff-close:active {
    transform: scale(0.97);
  }

  .ff-heading {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 28px 8px 0;
    letter-spacing: -0.02em;
  }

  .ff-lead {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary);
    margin: 0 0 10px;
    line-height: 1.45;
  }

  .ff-body {
    font-size: 13.5px;
    color: var(--text-secondary);
    margin: 0 0 12px;
    line-height: 1.6;
  }

  .ff-bullets {
    margin: 0 0 16px;
    padding: 0 0 0 18px;
    font-size: 12.5px;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .ff-bullets li {
    margin-bottom: 6px;
  }

  .ff-bullets li:last-child {
    margin-bottom: 0;
  }

  .ff-cta {
    width: 100%;
    justify-content: center;
    font-size: 13px;
    padding: 10px 16px;
  }

  .ff-bubble-wrap {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 4px 20px rgba(15, 23, 42, 0.12));
  }

  .ff-bubble-x {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 3;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: var(--bg);
    color: var(--text-muted);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      color 0.22s ease-out,
      background 0.22s ease-out,
      border-color 0.22s ease-out,
      transform 0.2s ease-out,
      box-shadow 0.22s ease-out;
    box-shadow: var(--shadow-sm);
  }

  .ff-bubble-x:hover {
    color: var(--text-primary);
    background: var(--bg-subtle);
    border-color: #cbd5e1;
    transform: scale(1.06);
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
  }

  .ff-bubble-x:active {
    transform: scale(0.96);
  }

  @media (prefers-reduced-motion: reduce) {
    .ff-panel {
      animation: none;
    }

    .ff-bubble:hover .ff-bubble-inner {
      transform: none;
    }

    .ff-close:hover,
    .ff-bubble-x:hover {
      transform: none;
    }
  }

  /* Chat bubble launcher */
  .ff-bubble {
    position: relative;
    border: none;
    cursor: pointer;
    padding: 0;
    background: transparent;
    font-family: inherit;
    text-align: left;
  }

  .ff-bubble-inner {
    display: block;
    position: relative;
    padding: 14px 18px 16px;
    max-width: 260px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 18px 18px 6px 18px;
    transition:
      border-color 0.25s ease-out,
      box-shadow 0.28s ease-out,
      transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ff-bubble:hover .ff-bubble-inner {
    border-color: #cbd5e1;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.07);
    transform: translate3d(0, -2px, 0);
  }

  .ff-bubble:active .ff-bubble-inner {
    transform: translate3d(0, 0, 0);
    transition-duration: 0.12s;
  }

  /* Speech tail */
  .ff-bubble-inner::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 14px;
    width: 12px;
    height: 12px;
    background: var(--bg);
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    transform: rotate(45deg);
  }

  .ff-bubble-label {
    display: block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  .ff-bubble-hint {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-muted);
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.02em;
  }

  @media (max-width: 480px) {
    .ff-root {
      right: 12px;
      bottom: max(16px, env(safe-area-inset-bottom, 16px));
    }

    .ff-bubble-inner {
      max-width: min(260px, calc(100vw - 40px));
    }
  }
</style>
