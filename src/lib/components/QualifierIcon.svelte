<script lang="ts">
  /** Cloudflare Images URL (3D phone / device illustration) */
  export let src: string;
</script>

<div class="qualifier-icon" aria-hidden="true">
  <img
    {src}
    width="320"
    height="320"
    alt=""
    class="qualifier-icon-img"
    loading="lazy"
    decoding="async"
  />
</div>

<style>
  .qualifier-icon {
    position: relative;
    width: min(168px, 100%);
    margin: 0 auto;
    pointer-events: none;
  }

  .qualifier-icon-img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 10px 22px rgb(15 23 42 / 0.09)) drop-shadow(0 3px 8px rgb(15 23 42 / 0.05));
  }

  @media (min-width: 520px) {
    .qualifier-icon {
      width: min(188px, 100%);
    }
  }
</style>
