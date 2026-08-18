<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { trackGaPageView, trackMatomoPageView } from './lib/analytics';
  import Home from './lib/pages/Home.svelte';
  import Portal from './lib/pages/Portal.svelte';
  import ServicePage from './lib/pages/ServicePage.svelte';
  import Support from './lib/pages/Support.svelte';
  import Contact from './lib/pages/Contact.svelte';
  import QuickContact from './lib/pages/QuickContact.svelte';
  import About from './lib/pages/About.svelte';
  import Careers from './lib/pages/Careers.svelte';
  import Faq from './lib/pages/Faq.svelte';
  import Resources from './lib/pages/Resources.svelte';
  import Pricing from './lib/pages/Pricing.svelte';
  import Qualification from './lib/pages/Qualification.svelte';
  import LegalPage from './lib/pages/LegalPage.svelte';
  import ServeSegment from './lib/pages/ServeSegment.svelte';
  import Pacman from './lib/pages/Pacman.svelte';
  import { getPageMeta } from './lib/data/pageMeta';
  import { getAudienceSegment } from './lib/data/audienceSegments';

  function normalizePathname(path: string): string {
    if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
    return path || '/';
  }

  function getPath(): string {
    if (typeof window === 'undefined') return '/';
    return normalizePathname(window.location.pathname);
  }

  let path = getPath();
  let matomoReady = false;

  function serviceSlugFromPath(p: string): string | null {
    if (!p.startsWith('/services/')) return null;
    const rest = p.slice('/services/'.length);
    return rest || null;
  }

  function audienceSlugFromPath(p: string): string | null {
    const slug = p.startsWith('/') ? p.slice(1) : p;
    return getAudienceSegment(slug) ? slug : null;
  }

  $: serviceSlug = serviceSlugFromPath(path);
  $: audienceSlug = audienceSlugFromPath(path);
  $: pageMeta = getPageMeta(path);

  $: if (typeof window !== 'undefined') {
    const p = path;
    void (async () => {
      await tick();
      trackGaPageView(p);
      if (matomoReady) trackMatomoPageView(p);
    })();
  }

  onMount(() => {
    matomoReady = true;
    const sync = () => {
      path = normalizePathname(window.location.pathname);
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  });
</script>

<svelte:head>
  <title>{pageMeta.title}</title>
  <meta name="description" content={pageMeta.description} />
  <link rel="canonical" href={pageMeta.canonical} />
  <meta property="og:url" content={pageMeta.canonical} />
  <meta property="og:title" content={pageMeta.title} />
  <meta property="og:description" content={pageMeta.description} />
  <meta name="twitter:title" content={pageMeta.title} />
  <meta name="twitter:description" content={pageMeta.description} />
  {#if pageMeta.robots}
    <meta name="robots" content={pageMeta.robots} />
  {/if}
</svelte:head>

{#if path === '/portal'}
  <Portal />
{:else if audienceSlug !== null}
  <ServeSegment slug={audienceSlug} />
{:else if path === '/support'}
  <Support />
{:else if path === '/quick-contact'}
  <QuickContact />
{:else if path === '/contact'}
  <Contact />
{:else if path === '/about'}
  <About />
{:else if path === '/careers'}
  <Careers />
{:else if path === '/pacman'}
  <Pacman />
{:else if path === '/faq'}
  <Faq />
{:else if path === '/resources'}
  <Resources />
{:else if path === '/pricing'}
  <Pricing />
{:else if path === '/qualification'}
  <Qualification />
{:else if path === '/privacy'}
  <LegalPage slug="privacy" />
{:else if path === '/terms'}
  <LegalPage slug="terms" />
{:else if path === '/cookies'}
  <LegalPage slug="cookies" />
{:else if path === '/sla'}
  <LegalPage slug="sla" />
{:else if serviceSlug !== null}
  <ServicePage slug={serviceSlug} />
{:else}
  <Home />
{/if}
