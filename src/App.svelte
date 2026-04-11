<script lang="ts">
  import { onMount } from 'svelte';
  import Home from './lib/pages/Home.svelte';
  import Portal from './lib/pages/Portal.svelte';
  import ServicePage from './lib/pages/ServicePage.svelte';
  import PublicSector from './lib/pages/PublicSector.svelte';
  import Support from './lib/pages/Support.svelte';
  import SolutionPage from './lib/pages/SolutionPage.svelte';
  import Contact from './lib/pages/Contact.svelte';
  import QuickContact from './lib/pages/QuickContact.svelte';
  import About from './lib/pages/About.svelte';
  import Resources from './lib/pages/Resources.svelte';
  import Blog from './lib/pages/Blog.svelte';
  import LearnIndex from './lib/pages/LearnIndex.svelte';
  import LearnDoc from './lib/pages/LearnDoc.svelte';
  import ServeSegment from './lib/pages/ServeSegment.svelte';
  import FreeWebsiteEvent from './lib/pages/FreeWebsiteEvent.svelte';

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

  onMount(() => {
    const sync = () => {
      path = normalizePathname(window.location.pathname);
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  });
</script>

{#if path === '/portal'}
  <Portal />
{:else if path === '/public-sector'}
  <PublicSector />
{:else if path === '/trades' || path === '/professional-services'}
  <ServeSegment slug={path === '/trades' ? 'trades' : 'professional-services'} />
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
{:else if path === '/resources'}
  <Resources />
{:else if path === '/blog'}
  <Blog />
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
