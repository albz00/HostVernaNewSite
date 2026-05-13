<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';

  const faqs: { question: string; answer: string[] }[] = [
    {
      question: 'What does HostVerna actually help with?',
      answer: [
        'We handle websites, custom software, CRM setup, managed hosting, and ongoing IT support. Most clients start with one pain point and then fold in adjacent needs so they can work with one team instead of juggling multiple vendors.',
      ],
    },
    {
      question: 'Do you work with existing websites, or only full rebuilds?',
      answer: [
        'Both. If your current site can be improved safely, we can optimize speed, fix structure, and modernize design in phases. If the foundation is holding you back, we will recommend a rebuild and explain why before any commitment.',
      ],
    },
    {
      question: 'How does pricing work?',
      answer: [
        'Pricing depends on scope, timeline, and complexity. After a short discovery conversation, we provide a clear proposal with ranges, assumptions, and phased options when useful.',
        'If you are not sure where to start, we can begin with a small paid planning sprint so you get direction before larger build decisions.',
      ],
    },
    {
      question: 'How quickly can we start a project?',
      answer: [
        'Small updates can often start quickly. Larger projects usually begin with a short planning window so requirements, priorities, and delivery phases are clear.',
        'If you have a hard launch date, tell us early so we can evaluate scope against your timeline and suggest tradeoffs if needed.',
      ],
    },
    {
      question: 'Do you provide hosting and maintenance after launch?',
      answer: [
        'Yes. We offer managed hosting and support plans for updates, uptime monitoring, security maintenance, and issue response. We also support teams that prefer to host elsewhere and only need build or advisory help.',
      ],
    },
    {
      question: 'Can you help with domains, DNS, and business email setup?',
      answer: [
        'Yes. We regularly help with domain transfers, DNS records, and email provider setup. We plan these changes carefully to avoid downtime and document what was configured so your team is not left guessing later.',
      ],
    },
    {
      question: 'What kinds of businesses do you serve?',
      answer: [
        'We work with local businesses, public-sector teams, and organizations with specialized operations. If your workflow is unique, that is normal for us. We design around your process instead of forcing a one-size-fits-all template.',
      ],
    },
    {
      question: 'How do we get started?',
      answer: [
        'Use the contact form or call us directly. Share what you are trying to improve, any timeline constraints, and budget context if available.',
        'We will follow up with practical next steps, not a generic autoresponder funnel.',
      ],
    },
  ];

  const faqStructuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.join(' '),
      },
    })),
  });
</script>

<svelte:head>
  <title>FAQ | HostVerna</title>
  <meta
    name="description"
    content="Answers to common questions about HostVerna services, pricing, timelines, support, and how to get started."
  />
  <script type="application/ld+json">
    {@html faqStructuredData}
  </script>
</svelte:head>

<Navbar />

<main class="faq-page">
  <div class="container faq-inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span class="breadcrumb-current">FAQ</span>
    </nav>

    <header class="faq-header">
      <h1 class="faq-h1">Frequently asked questions</h1>
      <p class="faq-lede">
        Straight answers about how we work, what to expect, and how projects typically begin.
      </p>
    </header>

    <section class="faq-list" aria-label="Frequently asked questions">
      {#each faqs as item, i}
        <details class="faq-item" open={i === 0}>
          <summary class="faq-question">{item.question}</summary>
          <div class="faq-answer">
            {#each item.answer as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
        </details>
      {/each}
    </section>

    <aside class="faq-cta">
      <h2 class="faq-cta-title">Still have questions?</h2>
      <p class="faq-cta-body">Tell us what you are evaluating and we will point you to the right next step.</p>
      <div class="faq-cta-actions">
        <a href="/contact" class="btn btn-primary">Contact us</a>
        <a href="/resources" class="btn btn-secondary">Browse resources</a>
      </div>
    </aside>
  </div>
</main>

<Footer />

<style>
  .faq-page {
    padding-top: calc(120px + var(--hv-promo-h));
    padding-bottom: 72px;
    min-height: 50vh;
    background: var(--bg);
  }

  @media (min-width: 901px) {
    .faq-page {
      padding-top: calc(152px + var(--hv-promo-h));
    }
  }

  .faq-inner {
    max-width: 820px;
  }

  .breadcrumb {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--primary);
  }

  .breadcrumb-sep {
    margin: 0 8px;
    opacity: 0.5;
  }

  .breadcrumb-current {
    color: var(--text-muted);
  }

  .faq-header {
    margin-bottom: 28px;
  }

  .faq-h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 12px;
  }

  .faq-lede {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
    max-width: 650px;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-item {
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg-subtle);
    overflow: clip;
  }

  .faq-question {
    list-style: none;
    cursor: pointer;
    padding: 18px 20px;
    font-family: var(--font-display);
    font-size: 18px;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: var(--text-primary);
    position: relative;
    padding-right: 48px;
  }

  .faq-question::-webkit-details-marker {
    display: none;
  }

  .faq-question::after {
    content: '+';
    position: absolute;
    right: 18px;
    top: 16px;
    font-size: 24px;
    line-height: 1;
    color: var(--text-muted);
    transition: transform 0.14s ease;
  }

  .faq-item[open] .faq-question::after {
    transform: rotate(45deg);
    color: var(--primary);
  }

  .faq-answer {
    padding: 0 20px 18px;
    border-top: 1px solid var(--border);
    background: var(--bg);
  }

  .faq-answer p {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-secondary);
  }

  .faq-cta {
    margin-top: 34px;
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    background: var(--bg-subtle);
    padding: 24px;
  }

  .faq-cta-title {
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--text-primary);
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }

  .faq-cta-body {
    margin: 0 0 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 15px;
  }

  .faq-cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media (max-width: 640px) {
    .faq-question {
      font-size: 16px;
      padding: 16px 44px 16px 16px;
    }

    .faq-question::after {
      right: 14px;
      top: 13px;
    }

    .faq-answer {
      padding: 0 16px 16px;
    }
  }
</style>
