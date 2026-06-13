<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { trackGaPageView, trackMatomoPageView } from './lib/analytics';
  import Home from './lib/pages/Home.svelte';
  import Portal from './lib/pages/Portal.svelte';
  import ServicePage from './lib/pages/ServicePage.svelte';
  import PublicSector from './lib/pages/PublicSector.svelte';
  import Support from './lib/pages/Support.svelte';
  import SolutionPage from './lib/pages/SolutionPage.svelte';
  import Contact from './lib/pages/Contact.svelte';
  import QuickContact from './lib/pages/QuickContact.svelte';
  import About from './lib/pages/About.svelte';
  import Connect from './lib/pages/Connect.svelte';
  import Careers from './lib/pages/Careers.svelte';
  import Resources from './lib/pages/Resources.svelte';
  import Faq from './lib/pages/Faq.svelte';
  import Blog from './lib/pages/Blog.svelte';
  import LockedPlaceholder from './lib/components/LockedPlaceholder.svelte';
  import LearnIndex from './lib/pages/LearnIndex.svelte';
  import LearnDoc from './lib/pages/LearnDoc.svelte';
  import ServeSegment from './lib/pages/ServeSegment.svelte';
  import AreasServed from './lib/pages/AreasServed.svelte';
  import WvCityPage from './lib/pages/WvCityPage.svelte';
  import GreenbrierCountyWv from './lib/pages/GreenbrierCountyWv.svelte';
  import GreenbrierPlace from './lib/pages/GreenbrierPlace.svelte';
  import Pacman from './lib/pages/Pacman.svelte';
  import { getPageMeta } from './lib/data/pageMeta';

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

  function solutionSlugFromPath(p: string): string | null {
    if (!p.startsWith('/solutions/')) return null;
    const rest = p.slice('/solutions/'.length);
    return rest || null;
  }

  function learnDocSlugFromPath(p: string): string | null {
    if (!p.startsWith('/learn/')) return null;
    const rest = p.slice('/learn/'.length);
    return rest || null;
  }

  function greenbrierPlaceSlugFromPath(p: string): string | null {
    if (!p.startsWith('/greenbrier-county-wv/')) return null;
    const rest = p.slice('/greenbrier-county-wv/'.length);
    return rest || null;
  }

  function wvCitySlugFromPath(p: string): string | null {
    if (!p.startsWith('/areas-served/')) return null;
    const rest = p.slice('/areas-served/'.length);
    return rest || null;
  }

  $: serviceSlug = serviceSlugFromPath(path);
  $: solutionSlug = solutionSlugFromPath(path);
  $: learnDocSlug = learnDocSlugFromPath(path);
  $: greenbrierPlaceSlug = greenbrierPlaceSlugFromPath(path);
  $: wvCitySlug = wvCitySlugFromPath(path);
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
{:else if path === '/public-sector'}
  <PublicSector />
{:else if path === '/trades' || path === '/professional-services' || path === '/aviation'}
  <ServeSegment slug={path.slice(1)} />
{:else if path === '/support'}
  <Support />
{:else if path === '/quick-contact'}
  <QuickContact />
{:else if path === '/contact'}
  <Contact />
{:else if path === '/about'}
  <About />
{:else if path === '/connect'}
  <Connect />
{:else if path === '/careers'}
  <Careers />
{:else if path === '/areas-served'}
  <AreasServed />
{:else if wvCitySlug !== null}
  <WvCityPage slug={wvCitySlug} />
{:else if path === '/greenbrier-county-wv'}
  <GreenbrierCountyWv />
{:else if greenbrierPlaceSlug !== null}
  <GreenbrierPlace slug={greenbrierPlaceSlug} />
{:else if path === '/pacman'}
  <Pacman />
{:else if path === '/resources'}
  <Resources />
{:else if path === '/faq'}
  <Faq />
{:else if path === '/blog'}
  <Blog />
{:else if path === '/privacy'}
  <LockedPlaceholder
    heading="Privacy Policy is locked"
    lead="This page is not open to visitors. If you need our privacy practices in writing or have questions, call or email us."
  />
{:else if path === '/terms'}
  <LockedPlaceholder
    heading="Terms of Service are locked"
    lead="This page is not open to visitors. If you need our terms in writing or have questions, call or email us."
  />
{:else if path === '/cookies'}
  <LockedPlaceholder
    heading="Cookie Policy is locked"
    lead="This page is not open to visitors. If you need cookie policy details or have questions, call or email us."
  />
{:else if path === '/sla'}
  <LockedPlaceholder
    heading="SLA is locked"
    lead="This page is not open to visitors. If you need SLA details or have questions, call or email us."
  />
{:else if path === '/learn'}
  <LearnIndex />
{:else if learnDocSlug !== null}
  <LearnDoc slug={learnDocSlug} />
{:else if solutionSlug !== null}
  <SolutionPage slug={solutionSlug} />
{:else if serviceSlug !== null}
  <ServicePage slug={serviceSlug} />
{:else}
  <Home />
{/if}
