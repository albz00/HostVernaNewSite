<script lang="ts">
  const resources = [
    {
      source: 'IRS',
      title: 'Taxes-Security-Together Checklist',
      description: 'The IRS checklist covering the Security Six, written security plans, phishing, data theft, and recovery.',
      href: 'https://www.irs.gov/tax-professionals/tax-security-2-point-0-the-taxes-security-together-checklist',
    },
    {
      source: 'IRS Publication 4557',
      title: 'Safeguarding Taxpayer Data',
      description: 'Security guidance for tax professionals, including safeguards and FTC Safeguards Rule responsibilities.',
      href: 'https://www.irs.gov/pub/irs-pdf/p4557.pdf',
    },
    {
      source: 'IRS Publication 5708',
      title: 'Creating a Written Information Security Plan',
      description: 'A sample WISP and planning resource for tax and accounting practices, especially smaller firms.',
      href: 'https://www.irs.gov/pub/irs-pdf/p5708.pdf',
    },
    {
      source: 'IRS Publication 5709',
      title: 'How to Create a WISP for Data Safety',
      description: 'A concise overview of WISP requirements, maintenance, and practical next steps.',
      href: 'https://www.irs.gov/pub/irs-pdf/p5709.pdf',
    },
    {
      source: 'Federal Trade Commission',
      title: 'FTC Safeguards Rule guidance',
      description: 'The federal compliance guidance explaining who is covered and what a written information security program requires.',
      href: 'https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know',
    },
  ];
</script>

<section class="official-resources" aria-labelledby="official-resources-title">
  <div class="container official-resources-inner">
    <div class="official-resources-heading">
      <h2 id="official-resources-title">Official security and compliance resources</h2>
      <p>
        Use these IRS and FTC materials to understand the Security Six, WISP guidance, and the requirements that may
        apply to your firm.
      </p>
    </div>

    <div class="official-resources-grid">
      {#each resources as resource}
        <a href={resource.href} target="_blank" rel="noopener noreferrer" class="official-resource">
          <span class="resource-source">{resource.source}</span>
          <span class="resource-title">
            {resource.title}
            <span aria-hidden="true">↗</span>
          </span>
          <span class="resource-description">{resource.description}</span>
        </a>
      {/each}
    </div>

    <p class="resource-note">
      These links are provided for general information. Requirements depend on your organization and circumstances;
      consult qualified legal or compliance counsel when needed.
    </p>
  </div>
</section>

<style>
  .official-resources {
    padding: 84px 0;
    border-block: 1px solid var(--border);
    background: var(--bg-subtle);
  }

  .official-resources-inner {
    max-width: 1120px;
  }

  .official-resources-heading {
    max-width: 760px;
    margin-bottom: 30px;
  }

  h2 {
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: clamp(28px, 3.6vw, 42px);
    line-height: 1.12;
    letter-spacing: -0.035em;
  }

  .official-resources-heading > p:last-child {
    margin: 14px 0 0;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }

  .official-resources-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .official-resource {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 21px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile-sm);
    background: var(--bg);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
  }

  .official-resource:hover {
    border-color: rgb(var(--primary-rgb) / 0.4);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .resource-source {
    color: var(--primary);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .resource-title {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 700;
    line-height: 1.3;
  }

  .resource-title span {
    color: var(--primary);
    font-family: system-ui, sans-serif;
    font-weight: 500;
  }

  .resource-description {
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.6;
  }

  .resource-note {
    max-width: 850px;
    margin: 20px 0 0;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.6;
  }

  @media (max-width: 680px) {
    .official-resources {
      padding: 64px 0;
    }

    .official-resources-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
