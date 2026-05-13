<script lang="ts">
  import { onMount } from 'svelte';
  import { CLIENT_PORTAL_LOGIN_URL } from '../data/siteUrls';

  onMount(() => {
    window.location.replace(CLIENT_PORTAL_LOGIN_URL);
  });
</script>

<svelte:head>
  <title>Client portal | HostVerna</title>
  <meta
    name="description"
    content="Sign in to the HostVerna client portal for projects, files, and updates."
  />
  <meta http-equiv="refresh" content={`0;url=${CLIENT_PORTAL_LOGIN_URL}`} />
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<p class="portal-redirect">
  Redirecting to the client portal… If nothing happens,
  <a href={CLIENT_PORTAL_LOGIN_URL}>open the login page</a>.
</p>

<style>
  .portal-redirect {
    margin: 0;
    padding: clamp(24px, 8vh, 48px) 20px;
    text-align: center;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .portal-redirect a {
    color: var(--primary);
    font-weight: 600;
  }
</style>
