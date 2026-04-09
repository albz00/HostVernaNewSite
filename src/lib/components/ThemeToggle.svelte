<script lang="ts">
  import { onMount } from 'svelte';
  import { getTheme, setTheme, type ThemeMode } from '../theme';

  let mode: ThemeMode = 'light';

  onMount(() => {
    mode = getTheme();
  });

  function toggle() {
    setTheme(mode === 'dark' ? 'light' : 'dark');
    mode = getTheme();
  }
</script>

<button
  type="button"
  class="theme-toggle"
  class:theme-toggle--dark={mode === 'dark'}
  on:click={toggle}
  role="switch"
  aria-checked={mode === 'dark'}
  aria-label={mode === 'dark' ? 'Use light mode' : 'Use dark mode'}
  title="Mockup: theme preview"
>
  <span class="theme-toggle-track" aria-hidden="true"></span>
  <span class="theme-ico theme-ico-sun" aria-hidden="true">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  </span>
  <span class="theme-ico theme-ico-moon" aria-hidden="true">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </span>
  <span class="theme-toggle-thumb" aria-hidden="true"></span>
</button>

<style>
  .theme-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 28px;
    padding: 0;
    border: 1px solid rgb(148 163 184 / 0.45);
    border-radius: 999px;
    background: rgb(241 245 249 / 0.9);
    cursor: pointer;
    flex-shrink: 0;
    overflow: hidden;
    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .theme-toggle:hover {
    border-color: rgb(3 105 161 / 0.35);
    box-shadow: 0 1px 4px rgb(15 23 42 / 0.08);
  }

  .theme-toggle:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .theme-toggle-track {
    position: absolute;
    inset: 3px;
    border-radius: 999px;
    background: rgb(226 232 240 / 0.85);
    pointer-events: none;
    z-index: 0;
  }

  .theme-ico {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    z-index: 1;
    pointer-events: none;
    color: rgb(100 116 139);
    opacity: 0.55;
  }

  .theme-ico svg {
    display: block;
    width: 12px;
    height: 12px;
  }

  .theme-ico-sun {
    left: 8px;
  }

  .theme-ico-moon {
    right: 8px;
  }

  .theme-toggle--dark .theme-ico-sun {
    opacity: 0.35;
  }

  .theme-toggle--dark .theme-ico-moon {
    opacity: 0.75;
    color: rgb(148 163 184);
  }

  .theme-toggle:not(.theme-toggle--dark) .theme-ico-sun {
    opacity: 0.75;
    color: rgb(234 179 8);
  }

  .theme-toggle:not(.theme-toggle--dark) .theme-ico-moon {
    opacity: 0.35;
  }

  .theme-toggle-thumb {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--gradient);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
    transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 2;
    pointer-events: none;
  }

  .theme-toggle--dark .theme-toggle-thumb {
    transform: translateX(22px);
  }

  .theme-toggle--dark {
    background: rgb(30 41 59 / 0.65);
    border-color: rgb(71 85 105 / 0.55);
  }

  .theme-toggle--dark .theme-toggle-track {
    background: rgb(15 23 42 / 0.5);
  }

  @media (prefers-reduced-motion: reduce) {
    .theme-toggle-thumb {
      transition: none;
    }
  }
</style>
