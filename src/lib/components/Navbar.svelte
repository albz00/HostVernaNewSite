<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { serviceNavItems } from '../data/servicePages';
  import { solutionNavItems } from '../data/solutionNav';
  import { resourcesNavItems } from '../data/learnPages';
  import { whoWeServeNavItems } from '../data/whoWeServeNav';
  import {
    CLIENT_PORTAL_LOGIN_URL,
    CLOUDFLARE_PAGE_VIEWS_URL,
    FACEBOOK_REVIEWS_URL,
    GOOGLE_REVIEWS_URL,
  } from '../data/siteUrls';

  type UtilityBadge = {
    id: 'google' | 'facebook' | 'cloudflare' | 'cloudflare-network';
    href: string;
    platform: string;
    kind: 'reviews' | 'pageviews' | 'monthly-pageviews';
    count?: number;
    label?: string;
    ariaLabel?: string;
  };

  const utilityBadges: UtilityBadge[] = [
    { id: 'google', href: GOOGLE_REVIEWS_URL, count: 13, platform: 'Google', kind: 'reviews' },
    { id: 'facebook', href: FACEBOOK_REVIEWS_URL, count: 5, platform: 'Facebook', kind: 'reviews' },
    {
      id: 'cloudflare',
      href: CLOUDFLARE_PAGE_VIEWS_URL,
      platform: 'Cloudflare',
      kind: 'pageviews',
      label: '100K page views · HostVerna',
      ariaLabel: '100,000 page views for HostVerna.com',
    },
    {
      id: 'cloudflare-network',
      href: '/about',
      platform: 'Cloudflare',
      kind: 'monthly-pageviews',
      label: '550K+ monthly views · all client sites',
      ariaLabel: 'Over 550,000 monthly page views across all HostVerna client websites',
    },
  ];

  const UTILITY_CYCLE_MS = 8000;
  const UTILITY_FADE_MS = 650;

  let activeBadgeIndex = 0;
  let badgeFading = false;

  function utilityLabel(badge: UtilityBadge): string {
    if (badge.label) return badge.label;
    if (badge.kind === 'reviews') return `(${badge.count} reviews)`;
    return `(${badge.count!.toLocaleString('en-US')} page views)`;
  }

  function utilityAriaLabel(badge: UtilityBadge): string {
    if (badge.ariaLabel) return badge.ariaLabel;
    if (badge.kind === 'reviews') return `Read our ${badge.count} ${badge.platform} reviews`;
    return `${badge.count!.toLocaleString('en-US')} page views served through ${badge.platform}`;
  }

  $: activeBadge = utilityBadges[activeBadgeIndex];
  $: badgeAriaLabel = utilityAriaLabel(activeBadge);
  $: badgeLabel = utilityLabel(activeBadge);

  async function cycleUtilityBadge() {
    if (prefersReducedMotion) {
      activeBadgeIndex = (activeBadgeIndex + 1) % utilityBadges.length;
      return;
    }

    badgeFading = true;
    await delay(UTILITY_FADE_MS);
    activeBadgeIndex = (activeBadgeIndex + 1) % utilityBadges.length;
    await tick();
    badgeFading = false;
  }
  let scrolled = false;
  let mobileOpen = false;
  let menuToggleLabel = 'MENU';
  let labelAnimToken = 0;
  let prefersReducedMotion = false;
  let navInnerElement: HTMLElement;
  let mobileMenuMaxHeight = 'calc(100dvh - 88px - env(safe-area-inset-bottom))';
  const MOBILE_BREAKPOINT = 900;

  type MobileAccordionId = 'services' | 'solutions' | 'whoWeServe' | 'resources';

  function initialMobileAccordion(): Record<MobileAccordionId, boolean> {
    return { services: false, solutions: false, whoWeServe: false, resources: false };
  }

  let mobileAccordionOpen = initialMobileAccordion();

  function resetMobileAccordion() {
    mobileAccordionOpen = initialMobileAccordion();
  }

  function toggleMobileAccordion(id: MobileAccordionId) {
    mobileAccordionOpen = { ...mobileAccordionOpen, [id]: !mobileAccordionOpen[id] };
    void tick().then(updateMobileMenuHeight);
  }

  const navLinksRest = [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/#case-studies' },
  ];

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
  const howWeWorkTogetherHref = '/solutions/how-we-work-together';

  const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

  function setDocumentMenuState(open: boolean) {
    if (typeof document === 'undefined') return;

    if (open) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.removeProperty('overflow');
  }

  function updateMobileMenuHeight() {
    if (typeof window === 'undefined' || !navInnerElement) return;

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const navBottom = navInnerElement.getBoundingClientRect().bottom;
    const bottomGutter = 12;
    const availableHeight = Math.max(80, viewportHeight - navBottom - bottomGutter);

    mobileMenuMaxHeight = `${availableHeight}px`;
  }

  async function playLabelTransition(to: string) {
    const id = ++labelAnimToken;
    const from = menuToggleLabel;
    if (from === to) return;

    const backspaceMs = 36;
    const typeMs = 42;

    for (let i = from.length; i > 0; i--) {
      if (id !== labelAnimToken) return;
      menuToggleLabel = from.slice(0, i - 1);
      await delay(backspaceMs);
    }
    for (let j = 1; j <= to.length; j++) {
      if (id !== labelAnimToken) return;
      menuToggleLabel = to.slice(0, j);
      await delay(typeMs);
    }
  }

  function onMobileToggleClick() {
    const next = !mobileOpen;
    mobileOpen = next;
    setDocumentMenuState(next);
    if (next) {
      resetMobileAccordion();
      void tick().then(updateMobileMenuHeight);
    }
    if (prefersReducedMotion) {
      menuToggleLabel = next ? 'CLOSE' : 'MENU';
      return;
    }
    void playLabelTransition(next ? 'CLOSE' : 'MENU');
  }

  function closeMobileMenu() {
    if (!mobileOpen) return;

    mobileOpen = false;
    setDocumentMenuState(false);
    if (prefersReducedMotion) {
      menuToggleLabel = 'MENU';
      return;
    }
    void playLabelTransition('MENU');
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setDocumentMenuState(mobileOpen);

    const handler = () => {
      scrolled = window.scrollY > 24;
      if (mobileOpen) {
        void tick().then(updateMobileMenuHeight);
      }
    };
    const resizeHandler = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && mobileOpen) {
        closeMobileMenu();
        return;
      }
      if (mobileOpen) updateMobileMenuHeight();
    };
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        closeMobileMenu();
      }
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });
    window.addEventListener('keydown', keydownHandler);
    window.visualViewport?.addEventListener('resize', resizeHandler, { passive: true });
    window.visualViewport?.addEventListener('scroll', resizeHandler, { passive: true });

    const utilityCycleTimer = window.setInterval(() => {
      void cycleUtilityBadge();
    }, UTILITY_CYCLE_MS);

    return () => {
      window.clearInterval(utilityCycleTimer);
      setDocumentMenuState(false);
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('keydown', keydownHandler);
      window.visualViewport?.removeEventListener('resize', resizeHandler);
      window.visualViewport?.removeEventListener('scroll', resizeHandler);
    };
  });
</script>

<header class="nav-wrapper" class:scrolled>
  <div class="nav-utility" class:nav-utility--hidden={scrolled} aria-label="Sales and support">
    <div class="nav-utility-inner">
      <a
        href={activeBadge.href}
        class="nav-reviews"
        target={activeBadge.href.startsWith('http') ? '_blank' : undefined}
        rel={activeBadge.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={badgeAriaLabel}
        aria-live="polite"
      >
        <span class="nav-reviews-content" class:is-fading={badgeFading}>
          {#if activeBadge.id === 'google'}
            <svg class="nav-reviews-logo" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          {:else if activeBadge.id === 'facebook'}
            <svg class="nav-reviews-logo" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          {:else}
            <svg class="nav-reviews-logo nav-reviews-logo--cloudflare" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                fill="#F38020"
                d="M16.5088 16.8447C16.0305 17.7471 15.1119 18.375 14.127 18.375H3.93751C1.85859 18.375 0.228516 16.3906 0.699219 14.3555C1.02148 12.918 2.29297 11.9062 3.76172 11.9062H4.91211C5.05078 8.20312 8.02734 5.25 11.7012 5.25C14.5801 5.25 17.0273 6.98438 18.1055 9.375C18.3164 9.33984 18.5273 9.31641 18.75 9.31641C20.6367 9.31641 22.1602 10.8398 22.1602 12.7266C22.1602 14.6133 20.6367 16.1367 18.75 16.1367H17.7539C17.1562 16.1367 16.6875 16.4531 16.5088 16.8447Z"
              />
            </svg>
          {/if}
          {#if activeBadge.kind === 'reviews'}
            <span class="nav-reviews-stars" aria-hidden="true">
              {#each [0, 1, 2, 3, 4] as _}
                <span class="nav-reviews-star">★</span>
              {/each}
            </span>
          {/if}
          <span class="nav-reviews-count">{badgeLabel}</span>
        </span>
      </a>
      <div class="nav-utility-right">
        <a href="/support" class="nav-utility-link">Support</a>
        <span class="nav-utility-sales">
          <span class="nav-utility-sales-label">Sales:</span>
          <a href={phoneHref} class="nav-utility-phone">{phoneDisplay}</a>
        </span>
      </div>
    </div>
  </div>

  <nav class="nav-bar" class:scrolled>
    <div class="nav-inner" bind:this={navInnerElement}>
      <a href="/" class="logo" aria-label="HostVerna home">
        <img
          src="https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/520d3037-a29a-41e4-b52e-93dd51a9e700/public"
          width="64"
          height="58"
          alt=""
          class="logo-mark"
          decoding="async"
          fetchpriority="high"
        />
        <span class="logo-word"><span class="logo-host">Host</span><span class="logo-verna">Verna</span></span>
      </a>

      <ul class="nav-links">
        <li class="nav-dropdown">
          <button type="button" class="nav-link nav-dropdown-btn" aria-haspopup="true" aria-expanded="false">
            Services
            <span class="nav-dropdown-caret" aria-hidden="true"></span>
          </button>
          <ul class="nav-dropdown-menu" role="menu">
            {#each serviceNavItems as item}
              <li role="none">
                <a href={item.href} class="nav-dropdown-link" role="menuitem">{item.title}</a>
              </li>
            {/each}
            <li role="none" class="nav-dropdown-footer">
              <a href="/#services" class="nav-dropdown-link nav-dropdown-all" role="menuitem"
                >All services overview</a
              >
            </li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <button type="button" class="nav-link nav-dropdown-btn" aria-haspopup="true" aria-expanded="false">
            Solutions
            <span class="nav-dropdown-caret" aria-hidden="true"></span>
          </button>
          <ul class="nav-dropdown-menu nav-dropdown-menu--solutions-cols" role="menu">
            {#each solutionNavItems as item}
              <li role="none" class="nav-dropdown-solution-cell">
                <a href={item.href} class="nav-dropdown-link" role="menuitem">
                  {#if item.href === howWeWorkTogetherHref}
                    <span class="nav-solution-starred">
                      <svg
                        class="nav-solution-star"
                        viewBox="0 0 16 16"
                        width="12"
                        height="12"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                      </svg>
                      <span>{item.title}</span>
                    </span>
                  {:else}
                    {item.title}
                  {/if}
                </a>
              </li>
            {/each}
            <li role="none" class="nav-dropdown-footer nav-dropdown-footer--span-cols">
              <a href="/#use-cases" class="nav-dropdown-link nav-dropdown-all" role="menuitem"
                >How we work overview</a
              >
            </li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <button type="button" class="nav-link nav-dropdown-btn" aria-haspopup="true" aria-expanded="false">
            Who we serve
            <span class="nav-dropdown-caret" aria-hidden="true"></span>
          </button>
          <ul class="nav-dropdown-menu nav-dropdown-menu--solutions-cols" role="menu">
            {#each whoWeServeNavItems as item}
              <li role="none" class="nav-dropdown-solution-cell">
                <a href={item.href} class="nav-dropdown-link" role="menuitem">{item.title}</a>
              </li>
            {/each}
          </ul>
        </li>
        <li class="nav-dropdown">
          <button type="button" class="nav-link nav-dropdown-btn" aria-haspopup="true" aria-expanded="false">
            Resources
            <span class="nav-dropdown-caret" aria-hidden="true"></span>
          </button>
          <ul class="nav-dropdown-menu nav-dropdown-menu--solutions-cols" role="menu">
            {#each resourcesNavItems as item}
              <li role="none" class="nav-dropdown-solution-cell">
                <a href={item.href} class="nav-dropdown-link" role="menuitem">{item.title}</a>
              </li>
            {/each}
          </ul>
        </li>
        {#each navLinksRest as link}
          <li>
            <a href={link.href} class="nav-link">{link.label}</a>
          </li>
        {/each}
      </ul>

      <div class="nav-actions">
        <a
          href={phoneHref}
          class="nav-phone-compact"
          aria-label={`Call HostVerna at ${phoneDisplay}`}
        >
          <span class="nav-phone-compact-text">{phoneDisplay}</span>
        </a>
        <a href={CLIENT_PORTAL_LOGIN_URL} class="btn btn-secondary nav-btn">Portal</a>
        <a href="/contact" class="btn btn-primary nav-btn">Get Started</a>
      </div>

      <button
        type="button"
        class="mobile-toggle"
        class:mobile-toggle--open={mobileOpen}
        on:click={onMobileToggleClick}
        aria-label={mobileOpen ? 'Close menu' : 'Menu'}
        aria-expanded={mobileOpen}
        aria-controls="site-mobile-nav"
      >
        <span class="mobile-toggle__surface" aria-hidden="true"></span>
        <span class="mobile-toggle__text" aria-hidden="true">
          <span class="mobile-toggle__label">{menuToggleLabel}</span>
        </span>
      </button>
    </div>

    {#if mobileOpen}
      <div id="site-mobile-nav" class="mobile-menu" style:max-height={mobileMenuMaxHeight}>
        <div class="mobile-actions mobile-actions--top">
          <a
            href="/contact"
            class="btn btn-primary"
            style="width:100%;justify-content:center"
            on:click={closeMobileMenu}>Get Started</a
          >
          <a
            href={CLIENT_PORTAL_LOGIN_URL}
            class="btn btn-secondary"
            style="width:100%;justify-content:center"
            on:click={closeMobileMenu}>Portal</a
          >
        </div>

        {#each navLinksRest as link}
          <a href={link.href} class="mobile-link" on:click={closeMobileMenu}>{link.label}</a>
        {/each}

        <a href="/support" class="mobile-link" on:click={closeMobileMenu}>Support</a>
        <a href={phoneHref} class="mobile-phone" on:click={closeMobileMenu}>{phoneDisplay}</a>

        <div class="mobile-group">
          <button
            type="button"
            class="mobile-group-trigger"
            aria-expanded={mobileAccordionOpen.services}
            aria-controls="mobile-accordion-services"
            id="mobile-accordion-trigger-services"
            on:click={() => toggleMobileAccordion('services')}
          >
            <span class="mobile-group-trigger-label">Services</span>
            <span
              class="mobile-group-caret"
              class:mobile-group-caret--open={mobileAccordionOpen.services}
              aria-hidden="true"
            ></span>
          </button>
          {#if mobileAccordionOpen.services}
            <div
              id="mobile-accordion-services"
              class="mobile-group-panel"
              role="region"
              aria-labelledby="mobile-accordion-trigger-services"
            >
              {#each serviceNavItems as item}
                <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}
                  >{item.title}</a
                >
              {/each}
              <a href="/#services" class="mobile-link mobile-sublink mobile-sublink-all" on:click={closeMobileMenu}
                >All services overview</a
              >
            </div>
          {/if}
        </div>

        <div class="mobile-group">
          <button
            type="button"
            class="mobile-group-trigger"
            aria-expanded={mobileAccordionOpen.solutions}
            aria-controls="mobile-accordion-solutions"
            id="mobile-accordion-trigger-solutions"
            on:click={() => toggleMobileAccordion('solutions')}
          >
            <span class="mobile-group-trigger-label">Solutions</span>
            <span
              class="mobile-group-caret"
              class:mobile-group-caret--open={mobileAccordionOpen.solutions}
              aria-hidden="true"
            ></span>
          </button>
          {#if mobileAccordionOpen.solutions}
            <div
              id="mobile-accordion-solutions"
              class="mobile-group-panel"
              role="region"
              aria-labelledby="mobile-accordion-trigger-solutions"
            >
              {#each solutionNavItems as item}
                <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}>
                  {#if item.href === howWeWorkTogetherHref}
                    <span class="nav-solution-starred">
                      <svg
                        class="nav-solution-star"
                        viewBox="0 0 16 16"
                        width="12"
                        height="12"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                      </svg>
                      <span>{item.title}</span>
                    </span>
                  {:else}
                    {item.title}
                  {/if}
                </a>
              {/each}
              <a href="/#use-cases" class="mobile-link mobile-sublink mobile-sublink-all" on:click={closeMobileMenu}
                >How we work overview</a
              >
            </div>
          {/if}
        </div>

        <div class="mobile-group">
          <button
            type="button"
            class="mobile-group-trigger"
            aria-expanded={mobileAccordionOpen.whoWeServe}
            aria-controls="mobile-accordion-who-we-serve"
            id="mobile-accordion-trigger-who-we-serve"
            on:click={() => toggleMobileAccordion('whoWeServe')}
          >
            <span class="mobile-group-trigger-label">Who we serve</span>
            <span
              class="mobile-group-caret"
              class:mobile-group-caret--open={mobileAccordionOpen.whoWeServe}
              aria-hidden="true"
            ></span>
          </button>
          {#if mobileAccordionOpen.whoWeServe}
            <div
              id="mobile-accordion-who-we-serve"
              class="mobile-group-panel"
              role="region"
              aria-labelledby="mobile-accordion-trigger-who-we-serve"
            >
              {#each whoWeServeNavItems as item}
                <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}
                  >{item.title}</a
                >
              {/each}
            </div>
          {/if}
        </div>

        <div class="mobile-group mobile-group--last">
          <button
            type="button"
            class="mobile-group-trigger"
            aria-expanded={mobileAccordionOpen.resources}
            aria-controls="mobile-accordion-resources"
            id="mobile-accordion-trigger-resources"
            on:click={() => toggleMobileAccordion('resources')}
          >
            <span class="mobile-group-trigger-label">Resources</span>
            <span
              class="mobile-group-caret"
              class:mobile-group-caret--open={mobileAccordionOpen.resources}
              aria-hidden="true"
            ></span>
          </button>
          {#if mobileAccordionOpen.resources}
            <div
              id="mobile-accordion-resources"
              class="mobile-group-panel"
              role="region"
              aria-labelledby="mobile-accordion-trigger-resources"
            >
              {#each resourcesNavItems as item}
                <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}
                  >{item.title}</a
                >
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </nav>
</header>

<style>
  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 12px 20px;
    transition: padding 0.2s ease;
  }

  .nav-wrapper.scrolled {
    padding: 8px 20px;
  }

  .nav-utility {
    display: none;
  }

  @media (min-width: 901px) {
    .nav-utility {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      padding: 6px 12px 8px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.95);
    }

    .nav-utility-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 22px;
      font-size: 12.5px;
    }

    .nav-utility-right {
      display: inline-flex;
      align-items: center;
      gap: 22px;
      margin-left: auto;
    }

    .nav-reviews {
      display: inline-flex;
      align-items: center;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 3px 6px;
      margin: -3px -6px;
      border-radius: var(--radius-tile-sm);
      transition: color 0.15s ease, background 0.15s ease;
      flex-shrink: 0;
    }

    .nav-reviews:hover {
      color: var(--text-primary);
      background: rgba(3, 105, 161, 0.06);
    }

    .nav-reviews-content {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      opacity: 1;
      transition: opacity 0.65s ease;
    }

    .nav-reviews-content.is-fading {
      opacity: 0;
    }

    .nav-reviews-stars {
      display: inline-flex;
      align-items: center;
      gap: 1px;
      line-height: 1;
    }

    .nav-reviews-star {
      font-size: 12px;
      color: #f59e0b;
      text-shadow: 0 0 0.5px rgba(180, 83, 9, 0.35);
    }

    .nav-reviews-count {
      font-weight: 500;
      letter-spacing: 0.01em;
      white-space: nowrap;
      min-width: 15em;
    }

    .nav-reviews-logo {
      display: block;
      flex-shrink: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .nav-reviews-content {
        transition: none;
      }
    }

    .nav-utility-link {
      color: var(--text-secondary);
      font-weight: 500;
      text-decoration: none;
      padding: 3px 6px;
      margin: -3px -6px;
      border-radius: var(--radius-tile-sm);
      transition: color 0.15s ease, background 0.15s ease;
    }

    .nav-utility-link:hover {
      color: var(--text-primary);
      background: rgba(3, 105, 161, 0.06);
    }

    .nav-utility-sales {
      display: inline-flex;
      align-items: baseline;
      gap: 7px;
      color: var(--text-muted);
    }

    .nav-utility-sales-label {
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .nav-utility-phone {
      font-family: var(--font-mono);
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.03em;
      color: var(--primary);
      text-decoration: none;
    }

    .nav-utility-phone:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }

    .nav-utility.nav-utility--hidden {
      display: none;
    }
  }

  .nav-bar {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.99) 100%);
    backdrop-filter: blur(14px) saturate(1.15);
    -webkit-backdrop-filter: blur(14px) saturate(1.15);
    border: 1px solid rgba(100, 116, 139, 0.24);
    border-radius: var(--radius-tile);
    padding: 0 2px;
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.88) inset,
      0 4px 20px rgba(15, 23, 42, 0.07),
      0 0 0 1px rgba(15, 23, 42, 0.035);
  }

  .nav-bar.scrolled {
    background: linear-gradient(180deg, #f1f5f9 0%, #e8edf2 100%);
    border-color: rgba(71, 85, 105, 0.22);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.65) inset,
      0 10px 36px rgba(15, 23, 42, 0.11);
  }

  .nav-inner {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0;
    min-height: 48px;
    height: auto;
    padding: 0 12px;
  }

  .logo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
    flex-shrink: 0;
    line-height: 1;
  }

  .logo-mark {
    width: 28px;
    height: auto;
    display: block;
    flex-shrink: 0;
  }

  :global([data-theme='dark']) .logo-mark {
    filter: invert(1);
  }

  .logo-word {
    display: inline-flex;
    align-items: baseline;
  }

  .logo-host {
    color: #0369a1;
  }

  .logo-verna {
    color: #0d9488;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 0;
    margin: 0 auto;
    padding: 0;
    align-items: center;
  }

  .nav-links > li {
    position: relative;
  }

  .nav-link {
    display: block;
    padding: 5px 11px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--radius-tile-sm);
    transition: color 0.15s ease, background 0.15s ease;
    letter-spacing: 0.01em;
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: rgba(3, 105, 161, 0.06);
  }

  .nav-dropdown-btn {
    border: none;
    background: transparent;
    font: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    padding: 5px 11px;
    border-radius: var(--radius-tile-sm);
    transition: color 0.15s ease, background 0.15s ease;
  }

  .nav-dropdown-btn:hover,
  .nav-dropdown:focus-within .nav-dropdown-btn {
    color: var(--text-primary);
    background: rgba(3, 105, 161, 0.06);
  }

  .nav-dropdown-caret {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #94a3b8;
    margin-top: 1px;
    transition: transform 0.15s ease;
  }

  .nav-dropdown:hover .nav-dropdown-caret,
  .nav-dropdown:focus-within .nav-dropdown-caret {
    transform: rotate(180deg);
  }

  .nav-solution-starred {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
  }

  .nav-solution-star {
    flex-shrink: 0;
    color: var(--primary, #0369a1);
  }

  .nav-dropdown-menu {
    position: absolute;
    left: 0;
    top: calc(100% + 6px);
    min-width: 260px;
    padding: 6px 0;
    margin: 0;
    list-style: none;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    box-shadow: var(--shadow-lg);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      visibility 0.18s;
    z-index: 1002;
  }

  .nav-dropdown:hover .nav-dropdown-menu,
  .nav-dropdown:focus-within .nav-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-dropdown-link {
    display: block;
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: background 0.12s ease, color 0.12s ease;
  }

  .nav-dropdown-link:hover {
    background: var(--bg-subtle);
    color: var(--text-primary);
  }

  .nav-dropdown-menu--solutions-cols {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    min-width: min(520px, calc(100vw - 48px));
    max-width: 560px;
    padding: 8px 0;
    column-gap: 0;
    row-gap: 0;
  }

  .nav-dropdown-menu--solutions-cols .nav-dropdown-solution-cell {
    min-width: 0;
  }

  .nav-dropdown-menu--solutions-cols .nav-dropdown-link {
    padding: 8px 14px;
    font-size: 12.5px;
    line-height: 1.35;
  }

  .nav-dropdown-footer--span-cols {
    grid-column: 1 / -1;
  }

  .nav-dropdown-footer {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid var(--border);
  }

  .nav-dropdown-all {
    font-weight: 600;
    color: var(--primary);
  }

  .nav-dropdown-all:hover {
    color: var(--primary-dark);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .nav-btn {
    padding: 5px 13px;
    font-size: 12.5px;
  }

  /* Compact phone text shown on the nav bar itself for tablet + mobile.
     Hidden on desktop (phone lives in the utility strip instead). */
  .nav-phone-compact {
    display: none;
    align-items: center;
    padding: 4px 2px;
    color: var(--primary);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.03em;
    transition: color 0.15s ease;
  }

  .nav-phone-compact:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  :global([data-theme='dark']) .nav-phone-compact {
    color: #7dd3fc;
  }

  :global([data-theme='dark']) .nav-phone-compact:hover {
    color: #bae6fd;
  }

  /* Chamfered tile (top-left + bottom-right) to match site's button/card language */
  .mobile-toggle {
    display: none;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0 12px;
    margin: 0;
    border: none;
    border-radius: var(--radius-tile-sm);
    cursor: pointer;
    flex-shrink: 0;
    color: var(--text-primary);
    background: transparent;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.15s ease;
  }

  .mobile-toggle__surface {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    border: 1.5px solid transparent;
    background:
      linear-gradient(var(--bg), var(--bg)) padding-box,
      var(--gradient) border-box;
    transition:
      background 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  .mobile-toggle__text {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
    user-select: none;
    transition:
      color 0.18s ease,
      background 0.18s ease,
      -webkit-text-fill-color 0.18s ease;
  }

  .mobile-toggle__label {
    display: inline-block;
    width: 5ch;
    min-width: 5ch;
    text-align: center;
  }

  .mobile-toggle:hover .mobile-toggle__surface {
    background: var(--gradient);
    border-color: transparent;
    box-shadow:
      0 4px 14px rgb(3 105 161 / 0.22),
      0 4px 14px rgb(13 148 136 / 0.12);
  }

  .mobile-toggle:hover .mobile-toggle__text {
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
    color: #fff;
    -webkit-text-fill-color: #fff;
  }

  .mobile-toggle:active {
    transform: translateY(1px);
  }

  .mobile-toggle:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }

  .mobile-toggle--open .mobile-toggle__surface {
    background: var(--gradient);
    border-color: transparent;
    box-shadow:
      0 4px 14px rgb(3 105 161 / 0.22),
      0 4px 14px rgb(13 148 136 / 0.12);
  }

  .mobile-toggle--open .mobile-toggle__text {
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
    color: #fff;
    -webkit-text-fill-color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    .mobile-toggle,
    .mobile-toggle__surface {
      transition-duration: 0.01ms !important;
    }

    .mobile-toggle:active {
      transform: none;
    }
  }

  .mobile-menu {
    padding: 12px 16px calc(16px + env(safe-area-inset-bottom));
    border-top: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: calc(100dvh - 88px - env(safe-area-inset-bottom));
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .mobile-actions--top {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .mobile-group {
    padding: 2px 0 6px;
    margin-bottom: 2px;
    border-bottom: 1px solid #e2e8f0;
  }

  .mobile-group--last {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 4px;
  }

  .mobile-group-trigger {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 44px;
    padding: 6px 12px;
    margin: 0;
    border: none;
    border-radius: var(--radius-tile-sm);
    background: transparent;
    cursor: pointer;
    font: inherit;
    text-align: left;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.15s ease;
  }

  .mobile-group-trigger:hover {
    background: var(--bg-subtle);
  }

  .mobile-group-trigger:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .mobile-group-trigger-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    color: #94a3b8;
  }

  .mobile-group-caret {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #94a3b8;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .mobile-group-caret--open {
    transform: rotate(180deg);
  }

  .mobile-group-panel {
    padding-bottom: 4px;
  }

  .mobile-phone {
    display: block;
    padding: 6px 12px 10px;
    margin-bottom: 4px;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    color: var(--primary);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .mobile-phone:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  .mobile-link {
    display: block;
    min-height: 44px;
    padding: 11px 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    border-radius: var(--radius-tile-sm);
    transition: all 0.15s;
  }

  .mobile-link:hover {
    color: var(--text-primary);
    background: var(--bg-subtle);
  }

  .mobile-sublink {
    font-size: 13.5px;
    min-height: 40px;
    padding: 9px 12px 9px 18px;
    color: #64748b;
  }

  .mobile-sublink-all {
    margin-top: 4px;
    padding-top: 10px;
    border-top: 1px solid #f1f5f9;
    font-weight: 600;
    color: var(--primary);
  }

  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }

  /* Mobile only: show the compact phone on the nav bar itself.
     Tablet keeps phone in the utility strip to avoid duplication. */
  @media (max-width: 900px) {
    .nav-phone-compact {
      display: inline-flex;
    }
  }

  /* Tablet / small laptop: logo + actions on row 1, nav links wrap on row 2 */
  @media (max-width: 1180px) and (min-width: 901px) {
    .nav-inner {
      flex-wrap: wrap;
      padding-top: 8px;
      padding-bottom: 6px;
      row-gap: 0;
    }

    .nav-actions {
      margin-left: auto;
      justify-content: flex-end;
    }

    .nav-links {
      order: 3;
      flex-basis: 100%;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      margin: 6px 0 0;
      padding: 10px 6px 6px;
      border-top: 1px solid rgba(148, 163, 184, 0.22);
      row-gap: 6px;
      column-gap: 2px;
    }

    .nav-dropdown-menu {
      left: 50%;
      right: auto;
      transform: translate(-50%, -6px);
    }

    .nav-dropdown:hover .nav-dropdown-menu,
    .nav-dropdown:focus-within .nav-dropdown-menu {
      transform: translate(-50%, 0);
    }

  }

  @media (max-width: 900px) {
    .nav-links {
      display: none;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
      margin-right: 0;
    }

    .nav-actions .btn {
      display: none;
    }

    .mobile-toggle {
      display: flex;
    }
  }

  @media (max-width: 600px) {
    .nav-wrapper {
      padding: 12px 12px;
    }

    .nav-wrapper.scrolled {
      padding: 8px 12px;
    }

    .nav-inner {
      padding: 0 10px;
    }

    .mobile-menu {
      padding-left: 12px;
      padding-right: 12px;
      max-height: calc(100dvh - 80px - env(safe-area-inset-bottom));
    }
  }

  /* Very small phones: hide the compact phone link so the bar does not crowd the menu toggle. */
  @media (max-width: 460px) {
    .nav-phone-compact {
      display: none;
    }
  }

  :global([data-theme='dark']) .nav-bar {
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.96) 0%, rgba(15, 23, 42, 0.99) 100%);
    border-color: rgba(71, 85, 105, 0.5);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.05) inset,
      0 4px 24px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme='dark']) .nav-bar.scrolled {
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border-color: rgba(51, 65, 85, 0.65);
  }

  :global([data-theme='dark']) .nav-utility {
    border-bottom-color: var(--border);
  }

  :global([data-theme='dark']) .mobile-toggle__surface {
    background:
      linear-gradient(var(--bg), var(--bg)) padding-box,
      var(--gradient) border-box;
    border: 1.5px solid transparent;
  }

  :global([data-theme='dark']) .mobile-toggle__text {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  :global([data-theme='dark']) .mobile-toggle:hover .mobile-toggle__surface,
  :global([data-theme='dark']) .mobile-toggle--open .mobile-toggle__surface {
    background: var(--gradient);
    border-color: transparent;
    box-shadow:
      0 4px 14px rgb(56 189 248 / 0.22),
      0 4px 14px rgb(45 212 191 / 0.12);
  }

  :global([data-theme='dark']) .mobile-toggle:hover .mobile-toggle__text,
  :global([data-theme='dark']) .mobile-toggle--open .mobile-toggle__text {
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
    color: #fff;
    -webkit-text-fill-color: #fff;
  }
</style>
