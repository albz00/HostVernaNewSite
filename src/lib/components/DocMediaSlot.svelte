<script lang="ts">
  /** Short label shown in the empty frame (e.g. “DNS settings screenshot”). */
  export let label = 'Add image or diagram';
</script>

<figure class="doc-media-slot" aria-label={label}>
  <div class="doc-media-frame">
    <span class="doc-media-placeholder">{label}</span>
  </div>
</figure>

<style>
  .doc-media-slot {
    margin: 20px 0 0;
    padding: 0;
    max-width: 100%;
  }

  .doc-media-frame {
    min-height: 180px;
    border: 2px dashed var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .doc-media-placeholder {
    font-size: 12px;
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.45;
    max-width: 280px;
  }
</style>
