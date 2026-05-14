<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { trackGaPageView } from './lib/analytics';
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
  import FreeWebsiteEvent from './lib/pages/FreeWebsiteEvent.svelte';
  import GreenbrierCountyWv from './lib/pages/GreenbrierCountyWv.svelte';
  import Labyrinth from './lib/pages/Labyrinth.svelte';
  import { canonicalUrl } from './lib/data/siteUrls';

  function normalizePathname(path: string): string {
    if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
    return path || '/';
  }

  function getPath(): string {
    if (typeof window === 'undefined') return '/';
    return normalizePathname(window.location.pathname);
  }

  let path = getPath();

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

  $: serviceSlug = serviceSlugFromPath(path);
  $: solutionSlug = solutionSlugFromPath(path);
  $: learnDocSlug = learnDocSlugFromPath(path);
  $: canonical = canonicalUrl(path);

  $: if (typeof window !== 'undefined') {
    const p = path;
    void (async () => {
      await tick();
      trackGaPageView(p);
    })();
  }

  onMount(() => {
    const sync = () => {
      path = normalizePathname(window.location.pathname);
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  });
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
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
{:else if path === '/events/free-website-july'}
  <FreeWebsiteEvent />
{:else if path === '/about'}
  <About />
{:else if path === '/connect'}
  <Connect />
{:else if path === '/careers'}
  <Careers />
{:else if path === '/greenbrier-county-wv'}
  <GreenbrierCountyWv />
{:else if path === '/labyrinth'}
  <Labyrinth />
{:else if path === '/resources'}
  <Resources />
{:else if path === '/faq'}
  <Faq />
{:else if path === '/blog'}
  <Blog />
{:else if path === '/privacy'}
  <LockedPlaceholder
    documentTitle="Privacy Policy (locked) | HostVerna"
    metaDescription="The HostVerna privacy policy is not available for public access right now."
    heading="Privacy Policy is locked"
    lead="This page isn’t open to visitors. If you need our privacy practices in writing or have questions, call or email us and we’ll point you the right way."
  />
{:else if path === '/terms'}
  <LockedPlaceholder
    documentTitle="Terms of Service (locked) | HostVerna"
    metaDescription="The HostVerna terms of service are not available for public access right now."
    heading="Terms of Service are locked"
    lead="This page isn’t open to visitors. If you need our terms in writing or have questions, call or email us and we’ll point you the right way."
  />
{:else if path === '/cookies'}
  <LockedPlaceholder
    documentTitle="Cookie Policy (locked) | HostVerna"
    metaDescription="The HostVerna cookie policy is not available for public access right now."
    heading="Cookie Policy is locked"
    lead="This page isn’t open to visitors. If you need details about cookies or have questions, call or email us and we’ll point you the right way."
  />
{:else if path === '/sla'}
  <LockedPlaceholder
    documentTitle="SLA (locked) | HostVerna"
    metaDescription="The HostVerna service level agreement is not available for public access right now."
    heading="SLA is locked"
    lead="This page isn’t open to visitors. If you need SLA details or have questions, call or email us and we’ll point you the right way."
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
