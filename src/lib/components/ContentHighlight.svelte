<script lang="ts">
  /** Set when you want this phrase to link somewhere (glossary, solution page, etc.) */
  export let href: string | undefined = undefined;
  /** Syntax-inspired accents for scanning body copy (not for code blocks; use CodeBlock for that) */
  export let tone: 'keyword' | 'string' | 'comment' | 'accent' = 'keyword';
</script>

{#if href}
  <a class="content-hl ch-{tone}" {href} {...$$restProps}><slot /></a>
{:else}
  <span class="content-hl ch-{tone}" {...$$restProps}><slot /></span>
{/if}
