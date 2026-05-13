<script lang="ts">
  const footerLinks = {
    Services: [
      { label: 'Web Development', href: '/#services' },
      { label: 'Business Software', href: '/#services' },
      { label: 'CRM Setup', href: '/#services' },
      { label: 'IT Support', href: '/#services' },
      { label: 'Managed Hosting', href: '/#services' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Process', href: '/#use-cases' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/contact' },
    ],
    Resources: [
      { label: 'Resources hub', href: '/resources' },
      { label: 'Greenbrier County, WV', href: '/greenbrier-county-wv' },
      { label: 'Connect', href: '/connect' },
      { label: 'Case Studies', href: '/#case-studies' },
      { label: 'Documentation', href: '/learn' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Status', href: '/contact' },
      { label: 'Contact', href: '/contact' },
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
          Web development and managed services for your business.
          One partner, everything digital.
        </p>
        <div class="brand-contact">
          <a href="mailto:info@hostverna.co" class="contact-link">info@hostverna.co</a>
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
            <h4 class="footer-col-title">{category}</h4>
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
      <span class="ft-item">WV Licensed Business</span>
      <span class="ft-sep">/</span>
      <span class="ft-item">Fully Insured</span>
      <span class="ft-sep">/</span>
      <span class="ft-item">Serving Clients Nationwide*</span>
      <span class="ft-sep">/</span>
      <span class="ft-item">Financing Available</span>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">
        &copy; {new Date().getFullYear()} HostVerna. All rights reserved.
      </span>
      <div class="footer-tagline">
        Websites, software, CRM, and IT support. One partner.
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
    color: #64748b;
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
    color: #64748b;
    text-decoration: none;
    transition: color 0.15s;
    font-weight: 400;
  }

  .footer-link:hover {
    color: #94a3b8;
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
    color: #475569;
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
    color: #475569;
  }

  .footer-tagline {
    font-size: 13px;
    color: #334155;
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
