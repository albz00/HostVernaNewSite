<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { serviceNavItems } from '../data/servicePages';
  import { solutionNavItems } from '../data/solutionNav';
  import { resourcesNavItems } from '../data/learnPages';
  import { whoWeServeNavItems } from '../data/whoWeServeNav';
  import { CLIENT_PORTAL_LOGIN_URL } from '../data/siteUrls';
  let scrolled = false;
  let mobileOpen = false;
  let menuToggleLabel = 'MENU';
  let labelAnimToken = 0;
  let prefersReducedMotion = false;
  let communityBannerVisible = true;
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
  const communityBannerStorageKey = 'hostverna-community-banner-dismissed';

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

  function setCommunityBannerOffset(visible: boolean) {
    if (typeof document === 'undefined') return;

    if (visible) {
      document.documentElement.style.removeProperty('--hv-promo-h');
      return;
    }

    document.documentElement.style.setProperty('--hv-promo-h', '0px');
  }

  function dismissCommunityBanner() {
    communityBannerVisible = false;
    setCommunityBannerOffset(false);
    window.localStorage.setItem(communityBannerStorageKey, 'true');
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    communityBannerVisible = window.localStorage.getItem(communityBannerStorageKey) !== 'true';
    setCommunityBannerOffset(communityBannerVisible);
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

    return () => {
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
      <a href="/support" class="nav-utility-link">Support</a>
      <span class="nav-utility-sales">
        <span class="nav-utility-sales-label">Sales:</span>
        <a href={phoneHref} class="nav-utility-phone">{phoneDisplay}</a>
      </span>
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

  {#if communityBannerVisible}
    <aside class="community-banner" aria-label="Community update">
      <div class="community-banner__content">
        <span class="community-banner__label">Update</span>
        <span class="community-banner__text">
          Congratulations on your new website, Elevation Aviation!
        </span>
        <a
          class="community-banner__link"
          href="https://elevationflight.com"
          target="_blank"
          rel="noreferrer"
        >
          elevationflight.com
        </a>
      </div>
      <button
        type="button"
        class="community-banner__close"
        aria-label="Dismiss community update"
        on:click={dismissCommunityBanner}
      >
        X
      </button>
    </aside>
  {/if}
</header>

<style>
  :global(:root) {
    --hv-promo-h: 34px;
  }

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
      justify-content: flex-end;
      gap: 22px;
      font-size: 12.5px;
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

  .community-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-width: 1200px;
    min-height: 28px;
    margin: 5px auto 0;
    padding: 4px 8px 4px 14px;
    color: rgba(71, 85, 105, 0.86);
    background: linear-gradient(90deg, rgba(248, 250, 252, 0.76), rgba(236, 253, 245, 0.62));
    border-top: 1px solid rgba(203, 213, 225, 0.48);
    border-bottom: 1px solid rgba(203, 213, 225, 0.5);
    font-size: 12px;
    line-height: 1.35;
    text-align: center;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .community-banner__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-width: 0;
    flex: 1;
  }

  .community-banner__label {
    flex-shrink: 0;
    color: rgba(3, 105, 161, 0.72);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .community-banner__text {
    min-width: 0;
  }

  .community-banner__link {
    flex-shrink: 0;
    color: rgba(3, 105, 161, 0.8);
    font-weight: 650;
    text-decoration: none;
  }

  .community-banner__link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  .community-banner__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    margin: -2px 0;
    border: none;
    border-radius: var(--radius-tile-sm);
    color: rgba(71, 85, 105, 0.58);
    background: transparent;
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .community-banner__close:hover {
    color: var(--text-secondary);
    background: rgba(15, 23, 42, 0.05);
  }

  .community-banner__close:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 1px;
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

  /* Tablet + mobile: show the phone on the nav bar itself. */
  @media (max-width: 1180px) {
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
    :global(:root) {
      --hv-promo-h: 46px;
    }

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

    .community-banner {
      gap: 8px;
      min-height: 38px;
      margin-top: 5px;
      padding: 5px 7px 5px 10px;
      font-size: 11.5px;
    }

    .community-banner__content {
      flex-wrap: wrap;
      gap: 4px 8px;
    }
  }

  @media (max-width: 600px) {
    :global(:root) {
      --hv-promo-h: 56px;
    }

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

    .community-banner {
      align-items: center;
      justify-content: flex-start;
      text-align: left;
    }

    .community-banner__content {
      justify-content: flex-start;
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

  :global([data-theme='dark']) .community-banner {
    color: rgba(203, 213, 225, 0.82);
    background: linear-gradient(90deg, rgba(15, 23, 42, 0.72), rgba(19, 78, 74, 0.34));
    border-top-color: rgba(71, 85, 105, 0.58);
    border-bottom-color: rgba(71, 85, 105, 0.5);
  }

  :global([data-theme='dark']) .community-banner__label,
  :global([data-theme='dark']) .community-banner__link {
    color: rgba(125, 211, 252, 0.82);
  }

  :global([data-theme='dark']) .community-banner__close {
    color: rgba(203, 213, 225, 0.56);
  }

  :global([data-theme='dark']) .community-banner__close:hover {
    color: var(--text-primary);
    background: rgba(226, 232, 240, 0.08);
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
