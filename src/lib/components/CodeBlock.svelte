<script lang="ts">
  import { tick } from 'svelte';
  import { Prism } from '../prism-languages';

  /** Raw source to highlight */
  export let code = '';
  /** Prism language id: typescript, javascript, json, bash, css, markup, … */
  export let language = 'typescript';

  let codeEl: HTMLElement;

  async function applyHighlight() {
    await tick();
    if (!codeEl) return;
    const lang = Prism.languages[language] ? language : 'javascript';
    codeEl.className = `language-${lang}`;
    codeEl.textContent = code;
    Prism.highlightElement(codeEl);
  }

  $: {
    code;
    language;
    codeEl;
    void applyHighlight();
  }
</script>

<pre class="hv-code-block"><code bind:this={codeEl}></code></pre>

<style>
  .hv-code-block {
    margin: 0;
    padding: 0;
    background: var(--bg-muted, #f1f5f9);
    border: 1px solid var(--border, #e2e8f0);
    border-radius: var(--radius-md, 6px);
    overflow: auto;
    max-width: 100%;
    font-size: 13px;
    line-height: 1.55;
  }

  .hv-code-block code {
    display: block;
    padding: 14px 16px;
    font-family: var(--font-mono, 'DM Mono', monospace);
    background: transparent !important;
  }
</style>
