<script lang="ts">
  import { onMount } from 'svelte';
  import { TURNSTILE_SITE_KEY } from '../contactConfig';

  type TurnstileApi = {
    render: (
      el: HTMLElement,
      opts: {
        sitekey: string;
        theme?: 'light' | 'dark' | 'auto';
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      },
    ) => string;
    remove: (widgetId: string) => void;
    reset?: (widgetId: string) => void;
  };

  /** @internal */
  export let siteKey: string = TURNSTILE_SITE_KEY;

  export let onToken: (token: string) => void = () => {};

  let host: HTMLDivElement;
  let widgetId: string | undefined;
  let scriptPromise: Promise<void> | null = null;

  function loadTurnstileScript(): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();
    const w = window as Window & { turnstile?: TurnstileApi };
    if (w.turnstile) return Promise.resolve();
    if (scriptPromise) return scriptPromise;
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.dataset.hvTurnstile = '1';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Turnstile script failed'));
      document.head.appendChild(s);
    });
    return scriptPromise;
  }

  onMount(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadTurnstileScript();
      } catch {
        if (!cancelled) onToken('');
        return;
      }
      if (cancelled || !host) return;
      const w = window as Window & { turnstile?: TurnstileApi };
      const ts = w.turnstile;
      if (!ts) {
        onToken('');
        return;
      }
      widgetId = ts.render(host, {
        sitekey: siteKey,
        theme: 'auto',
        callback: (t) => onToken(t),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    })();

    return () => {
      cancelled = true;
      const w = window as Window & { turnstile?: TurnstileApi };
      if (widgetId && w.turnstile) {
        try {
          w.turnstile.remove(widgetId);
        } catch {
          /* ignore */
        }
      }
      widgetId = undefined;
    };
  });
</script>

<div class="hv-turnstile-host" bind:this={host}></div>

<style>
  .hv-turnstile-host {
    min-height: 65px;
    margin-top: 4px;
  }
</style>
