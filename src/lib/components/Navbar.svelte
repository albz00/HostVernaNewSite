<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { serviceNavItems } from '../data/servicePages';
  import { solutionNavItems } from '../data/solutionNav';
  import { resourcesNavItems } from '../data/learnPages';
  import { whoWeServeNavItems } from '../data/whoWeServeNav';
  import { CLIENT_PORTAL_LOGIN_URL } from '../data/siteUrls';
  let scrolled = false;
  let mobileOpen = false;
  let menuToggleLabel = 'OPEN';
  let labelAnimToken = 0;
  let prefersReducedMotion = false;
  let navInnerElement: HTMLElement;
  let mobileMenuMaxHeight = 'calc(100dvh - 88px - env(safe-area-inset-bottom))';

  const navLinksRest = [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/#case-studies' },
  ];

  const phoneDisplay = '304-992-6568';
  const phoneHref = 'tel:+13049926568';
  const howWeWorkTogetherHref = '/solutions/how-we-work-together';

  const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

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
    if (next) {
      void tick().then(updateMobileMenuHeight);
    }
    if (prefersReducedMotion) {
      menuToggleLabel = next ? 'CLOSE' : 'OPEN';
      return;
    }
    void playLabelTransition(next ? 'CLOSE' : 'OPEN');
  }

  function closeMobileMenu() {
    mobileOpen = false;
    if (prefersReducedMotion) {
      menuToggleLabel = 'OPEN';
      return;
    }
    void playLabelTransition('OPEN');
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handler = () => {
      scrolled = window.scrollY > 24;
      if (mobileOpen) {
        void tick().then(updateMobileMenuHeight);
      }
    };
    const resizeHandler = () => {
      if (mobileOpen) updateMobileMenuHeight();
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });
    window.visualViewport?.addEventListener('resize', resizeHandler, { passive: true });
    window.visualViewport?.addEventListener('scroll', resizeHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', resizeHandler);
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
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
        <a href="/support" class="mobile-link mobile-support-first" on:click={closeMobileMenu}>Support</a>
        <a href={phoneHref} class="mobile-phone" on:click={closeMobileMenu}>{phoneDisplay}</a>

        <div class="mobile-group">
          <span class="mobile-group-label">Services</span>
          {#each serviceNavItems as item}
            <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}
              >{item.title}</a
            >
          {/each}
          <a href="/#services" class="mobile-link mobile-sublink mobile-sublink-all" on:click={closeMobileMenu}
            >All services overview</a
          >
        </div>

        <div class="mobile-group">
          <span class="mobile-group-label">Solutions</span>
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

        <div class="mobile-group">
          <span class="mobile-group-label">Who we serve</span>
          {#each whoWeServeNavItems as item}
            <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}
              >{item.title}</a
            >
          {/each}
        </div>

        <div class="mobile-group">
          <span class="mobile-group-label">Resources</span>
          {#each resourcesNavItems as item}
            <a href={item.href} class="mobile-link mobile-sublink" on:click={closeMobileMenu}
              >{item.title}</a
            >
          {/each}
        </div>

        {#each navLinksRest as link}
          <a href={link.href} class="mobile-link" on:click={closeMobileMenu}>{link.label}</a>
        {/each}
        <div class="mobile-actions">
          <a href={CLIENT_PORTAL_LOGIN_URL} class="btn btn-secondary" style="width:100%;justify-content:center" on:click={closeMobileMenu}
            >Portal</a
          >
          <a href="/contact" class="btn btn-primary" style="width:100%;justify-content:center" on:click={closeMobileMenu}
            >Get Started</a
          >
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
    background: var(--bg);
    border: 1.5px solid var(--primary);
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
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
    user-select: none;
    transition: color 0.18s ease;
  }

  .mobile-toggle__label {
    display: inline-block;
    width: 5ch;
    min-width: 5ch;
    text-align: center;
  }

  .mobile-toggle:hover .mobile-toggle__surface {
    background: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 4px 14px rgb(3 105 161 / 0.22);
  }

  .mobile-toggle:hover .mobile-toggle__text {
    color: #fff;
  }

  .mobile-toggle:active {
    transform: translateY(1px);
  }

  .mobile-toggle:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }

  .mobile-toggle--open .mobile-toggle__surface {
    background: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 4px 14px rgb(3 105 161 / 0.22);
  }

  .mobile-toggle--open .mobile-toggle__text {
    color: #fff;
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

  .mobile-support-first {
    margin-bottom: 6px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .mobile-group {
    padding: 8px 0 12px;
    margin-bottom: 4px;
    border-bottom: 1px solid #e2e8f0;
  }

  .mobile-group-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    color: #94a3b8;
    padding: 4px 12px 8px;
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
    background: transparent;
    border-color: var(--primary);
  }

  :global([data-theme='dark']) .mobile-toggle__text {
    color: var(--primary);
  }

  :global([data-theme='dark']) .mobile-toggle:hover .mobile-toggle__surface,
  :global([data-theme='dark']) .mobile-toggle--open .mobile-toggle__surface {
    background: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 4px 14px rgb(56 189 248 / 0.22);
  }

  :global([data-theme='dark']) .mobile-toggle:hover .mobile-toggle__text,
  :global([data-theme='dark']) .mobile-toggle--open .mobile-toggle__text {
    color: #0f172a;
  }
</style>
