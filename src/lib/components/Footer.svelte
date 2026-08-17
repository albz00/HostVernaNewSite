<script lang="ts">
  const footerLinks = {
    'IT Services': [
      { label: 'Managed IT Services', href: '/services/it-solutions' },
      { label: 'IRS Security Six', href: '/services/irs-security-six' },
      { label: 'WISP Services', href: '/services/wisp-services' },
    ],
    'Who We Serve': [
      { label: 'CPA Firms', href: '/accounting-tax-firms' },
      { label: 'Tax Preparers & EAs', href: '/accounting-tax-firms' },
      { label: 'Bookkeeping Firms', href: '/accounting-tax-firms' },
      { label: 'Payroll Providers', href: '/accounting-tax-firms' },
    ],
    'Get Started': [
      { label: 'Schedule a Consultation', href: '/contact' },
      { label: 'Discuss Your IT Needs', href: '/contact' },
      { label: 'Request a Security Six Review', href: '/contact' },
      { label: 'Discuss Your WISP', href: '/contact' },
      { label: 'Support', href: '/support' },
    ],
    Company: [
      { label: 'About HostVerna', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How We Work', href: '/#use-cases' },
      { label: 'Careers', href: '/careers' },
      { label: 'FAQ', href: '/faq' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'SLA', href: '/sla' },
    ],
  };
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="logo">
          <span class="logo-host">Host</span><span class="logo-verna">Verna</span>
        </a>
        <p class="brand-desc">
          West Virginia-based managed IT support for CPAs, accounting firms, tax preparers,
          enrolled agents, bookkeeping firms, and payroll providers.
        </p>
        <div class="brand-contact">
          <a href="mailto:info@hostverna.com" class="contact-link">info@hostverna.com</a>
          <a
            href="https://www.facebook.com/hostverna"
            class="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >Facebook</a>
        </div>
      </div>

      <nav class="footer-nav">
        {#each Object.entries(footerLinks) as [category, links]}
          <div class="footer-col">
            <h3 class="footer-col-title">{category}</h3>
            <ul class="footer-link-list">
              {#each links as link}
                <li>
                  <a href={link.href} class="footer-link">{link.label}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </nav>
    </div>

    <div class="footer-trust">
      <span class="ft-item">West Virginia-based</span>
      <span class="ft-sep">/</span>
      <span class="ft-item">Managed IT Support</span>
      <span class="ft-sep">/</span>
      <span class="ft-item">IRS Security Six</span>
      <span class="ft-sep">/</span>
      <span class="ft-item">WISP Creation &amp; Updates</span>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">
        &copy; 2026 HostVerna. All rights reserved.
      </span>
      <div class="footer-tagline">
        IT implementation and documentation support only. Not legal or tax advice.
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #0f172a;
    color: #94a3b8;
    padding: 72px 0 0;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .footer-top {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 64px;
    padding-bottom: 56px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
  }

  .logo-host {
    color: #38bdf8;
  }

  .logo-verna {
    color: #2dd4bf;
  }

  .brand-desc {
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.65;
    max-width: 240px;
  }

  .brand-contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .contact-link {
    font-size: 13px;
    color: #38bdf8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s;
  }

  .contact-link:hover {
    color: #2dd4bf;
  }

  .footer-nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }

  .footer-col-title {
    font-size: 12px;
    font-weight: 700;
    color: #e2e8f0;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .footer-link-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-link {
    font-size: 13.5px;
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.15s;
    font-weight: 400;
  }

  .footer-link:hover {
    color: #ffffff;
  }

  .footer-trust {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    flex-wrap: wrap;
  }

  .ft-item {
    font-size: 11px;
    color: #94a3b8;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  .ft-sep {
    color: #1e293b;
    font-size: 11px;
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    gap: 16px;
    flex-wrap: wrap;
  }

  .footer-copy {
    font-size: 13px;
    color: #cbd5e1;
  }

  .footer-tagline {
    font-size: 13px;
    color: #94a3b8;
    font-style: italic;
  }

  @media (max-width: 960px) {
    .footer-top {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .footer-nav {
      grid-template-columns: repeat(2, 1fr);
    }
    .brand-desc {
      max-width: 100%;
    }
  }

  @media (max-width: 500px) {
    .footer-nav {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 360px) {
    .footer {
      padding-top: 56px;
    }

    .footer-nav {
      grid-template-columns: 1fr;
      gap: 18px;
    }
  }
</style>
