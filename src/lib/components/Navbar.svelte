<script lang="ts">
  import { onMount } from 'svelte';

  let scrolled = false;
  let mobileOpen = false;

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
  ];

  onMount(() => {
    const handler = () => {
      scrolled = window.scrollY > 24;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });
</script>

<header class="nav-wrapper" class:scrolled>
  <nav class="nav-bar" class:scrolled>
    <div class="nav-inner">
      <a href="/" class="logo">
        <span class="logo-host">Host</span><span class="logo-verna">Verna</span>
      </a>

      <ul class="nav-links">
        {#each navLinks as link}
          <li>
            <a href={link.href} class="nav-link">{link.label}</a>
          </li>
        {/each}
      </ul>

      <div class="nav-actions">
        <a href="#contact" class="btn btn-secondary nav-btn">Sign in</a>
        <a href="#contact" class="btn btn-primary nav-btn">Get Started</a>
      </div>

      <button
        class="mobile-toggle"
        on:click={() => mobileOpen = !mobileOpen}
        aria-label="Toggle menu"
      >
        <span class="toggle-bar" class:open={mobileOpen}></span>
        <span class="toggle-bar" class:open={mobileOpen}></span>
        <span class="toggle-bar" class:open={mobileOpen}></span>
      </button>
    </div>

    {#if mobileOpen}
      <div class="mobile-menu">
        {#each navLinks as link}
          <a href={link.href} class="mobile-link" on:click={() => mobileOpen = false}>{link.label}</a>
        {/each}
        <div class="mobile-actions">
          <a href="#contact" class="btn btn-secondary" style="width:100%;justify-content:center">Sign in</a>
          <a href="#contact" class="btn btn-primary" style="width:100%;justify-content:center">Get Started</a>
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
    padding: 16px 24px;
    transition: padding 0.2s ease;
  }

  .nav-wrapper.scrolled {
    padding: 10px 24px;
  }

  .nav-bar {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 4px;
    padding: 0 4px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.06);
  }

  .nav-bar.scrolled {
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 4px 16px rgb(0 0 0 / 0.08);
    border-color: rgba(226, 232, 240, 1);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    gap: 0;
    height: 56px;
    padding: 0 16px;
  }

  .logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
    flex-shrink: 0;
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
  }

  .nav-link {
    display: block;
    padding: 8px 16px;
    font-size: 13.5px;
    font-weight: 500;
    color: #475569;
    text-decoration: none;
    border-radius: 2px;
    transition: color 0.15s ease, background 0.15s ease;
    letter-spacing: 0.01em;
  }

  .nav-link:hover {
    color: #0f172a;
    background: rgba(3, 105, 161, 0.06);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .nav-btn {
    padding: 7px 16px;
    font-size: 13px;
  }

  .mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
  }

  .toggle-bar {
    display: block;
    width: 22px;
    height: 2px;
    background: #0f172a;
    border-radius: 1px;
    transition: all 0.2s ease;
  }

  .mobile-menu {
    padding: 12px 16px 16px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .mobile-link {
    display: block;
    padding: 10px 12px;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    border-radius: 2px;
    transition: all 0.15s;
  }

  .mobile-link:hover {
    color: #0f172a;
    background: #f8fafc;
  }

  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }

  @media (max-width: 900px) {
    .nav-links {
      display: none;
    }
    .nav-actions {
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
  }
</style>
