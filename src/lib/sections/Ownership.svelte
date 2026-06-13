<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const painPoints = [
    {
      pain: 'You keep paying for a site you never own.',
      context:
        'Recurring fees continue indefinitely, and leaving the platform often means losing the delivered asset.',
      answer:
        'Ownership transfers to you. Code, content, domain, and credentials are documented and controlled by your business.',
    },
    {
      pain: 'Every little change turns into a support ticket.',
      context:
        'Routine updates should not require long vendor response cycles.',
      answer:
        'We build for maintainability so your team can handle routine updates, with optional support available when needed.',
    },
    {
      pain: 'When something breaks, nobody answers.',
      context:
        'Operations should not pause while requests sit in a queue.',
      answer:
        'You have direct access to the team that built the system, with timely support response.',
    },
    {
      pain: 'Your attention goes everywhere except your website.',
      context:
        'Google profiles, social pages, printed materials, and messaging channels should direct people to one reliable destination.',
      answer:
        'We build your site as the central destination and align core touchpoints so visitors can find accurate information and contact paths quickly.',
    },
  ];

  const ownership = [
    {
      actor: 'we',
      step: 'We build it.',
      detail:
        'Custom designed and developed for your business. No recycled theme, filler copy, or launch-day scramble.',
    },
    {
      actor: 'you',
      step: 'You use it.',
      detail:
        'The site launches and we walk you through it, so you can update common content without guessing.',
    },
    {
      actor: 'you',
      step: 'You own it.',
      detail:
        'After a set number of months, the site is yours. Code, credentials, documentation, and hosting access all move to you.',
    },
    {
      actor: 'we',
      step: 'We stay available.',
      detail:
        'No mandatory retainer. Call us when you want help, a new page, or another project entirely.',
    },
  ];
</script>

<section class="section pain-section" id="ownership">
  <div class="container pain-container">

    <header class="pain-lede">
      <h2 class="pain-title">
        For owners who would rather run<br />
        their business than their website.
      </h2>
      <p class="pain-sub">
        If you have ever thought
        <ContentHighlight tone="comment">"I need a team to handle this correctly,"</ContentHighlight>
        you're in the right place.
      </p>
    </header>

    <div class="pain-stories">
      {#each painPoints as item}
        <article class="pain-story">
          <p class="pain-statement">{item.pain}</p>
          <p class="pain-context">{item.context}</p>
          <p class="pain-answer">{item.answer}</p>
        </article>
      {/each}
    </div>

  </div>
</section>

<section class="section ownership-section">
  <div class="container">
    <div class="own-layout">
      <div class="own-left">
        <h2 class="own-title">
          You pay for it once.<br />
          Then it is yours.
        </h2>
        <p class="own-body">
          Many agencies rent website access while retaining platform control.
          <ContentHighlight tone="accent">That creates ongoing cost without long-term ownership.</ContentHighlight>
          We do the opposite.
        </p>
        <p class="own-body">
          We build the site, train your team on core operations, and transfer code, tools, and hosting access after a defined term. We also align key channels so your digital presence points to one central destination.
        </p>

        <figure class="own-transfer-fig">
          <img
            class="own-transfer-img"
            src="/images/site-ownership-handshake.jpg"
            width="1400"
            height="935"
            alt="Two business people shaking hands across a table after agreeing on next steps"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="own-transfer-cap">After ownership transfer, you retain source code, hosting access, management tools, and documentation. Support remains available on your terms.</figcaption>
        </figure>
      </div>

      <div class="own-right">
        <ol class="own-stages" aria-label="Ownership transfer phases">
          {#each ownership as item}
            <li class="own-stage" data-actor={item.actor}>
              <h3 class="own-stage-title">{item.step}</h3>
              <p class="own-stage-detail">{item.detail}</p>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  </div>
</section>

<style>
  /* ----------------------------------------------------------------
     Section 1: "Built for the business owner who has no time for this"
     Editorial layout. No icons, no badges, no card chrome.
     Three short stories separated by hairline rules.
  ---------------------------------------------------------------- */
  .pain-section {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .pain-container {
    max-width: 880px;
  }

  .pain-lede {
    margin-bottom: 56px;
    max-width: 720px;
  }

  .pain-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(30px, 4.4vw, 48px);
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #0f172a;
    line-height: 1.08;
    margin: 0;
  }

  .pain-sub {
    margin-top: 20px;
    font-size: 17px;
    color: #475569;
    max-width: 560px;
    line-height: 1.6;
  }

  :global([data-theme='dark']) .pain-title {
    color: var(--text-primary);
  }

  :global([data-theme='dark']) .pain-sub {
    color: var(--text-secondary);
  }

  .pain-stories {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }

  .pain-story {
    padding: 36px 0 38px;
    border-bottom: 1px solid var(--border);
    max-width: 660px;
  }

  .pain-statement {
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(20px, 2.4vw, 26px);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: #0f172a;
  }

  .pain-context {
    margin: 12px 0 0;
    font-size: 15.5px;
    line-height: 1.7;
    color: #475569;
  }

  .pain-answer {
    margin: 14px 0 0;
    font-size: 15.5px;
    line-height: 1.7;
    color: #1e293b;
    border-left: 2px solid var(--primary);
    padding-left: 16px;
  }

  :global([data-theme='dark']) .pain-statement {
    color: var(--text-primary);
  }

  :global([data-theme='dark']) .pain-context {
    color: var(--text-secondary);
  }

  :global([data-theme='dark']) .pain-answer {
    color: var(--text-primary);
    border-left-color: #38bdf8;
  }

  /* ----------------------------------------------------------------
     Section 2: "You pay for it once. Then it's yours."
     Two columns: editorial copy left, simple typographic timeline right.
     No mini-scenes, no accordion, no stacked-paper effect.
  ---------------------------------------------------------------- */
  .ownership-section {
    background: var(--bg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .own-layout {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 88px;
    align-items: start;
  }

  .own-left {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .own-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(30px, 4.4vw, 48px);
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #0f172a;
    line-height: 1.08;
    margin: 0;
  }

  .own-body {
    font-size: 16px;
    color: #475569;
    line-height: 1.7;
    margin: 0;
    max-width: 56ch;
  }

  :global([data-theme='dark']) .own-title {
    color: var(--text-primary);
  }

  :global([data-theme='dark']) .own-body {
    color: var(--text-secondary);
  }

  .own-transfer-fig {
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .own-transfer-img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: var(--radius-tile);
  }

  .own-transfer-cap {
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--text-muted);
    max-width: 56ch;
  }

  /* Right column: conversation layout.
     "We" steps flush left, "You" steps flush right.
     The text drifts across the page as ownership moves from us to the owner,
     then returns at the end for ongoing support. No numbers, no rails. */
  .own-right {
    position: sticky;
    top: 100px;
  }

  .own-stages {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(40px, 6vw, 60px);
  }

  .own-stage {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 86%;
  }

  .own-stage[data-actor='we'] {
    align-self: flex-start;
    text-align: left;
  }

  .own-stage[data-actor='you'] {
    align-self: flex-end;
    text-align: right;
  }

  .own-stage-title {
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(26px, 3.6vw, 34px);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.08;
    color: #0f172a;
  }

  .own-stage-detail {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #475569;
  }

  :global([data-theme='dark']) .own-stage-title {
    color: var(--text-primary);
  }

  :global([data-theme='dark']) .own-stage-detail {
    color: var(--text-secondary);
  }

  /* ----------------------------------------------------------------
     Responsive
  ---------------------------------------------------------------- */
  @media (max-width: 960px) {
    .own-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .own-right {
      position: static;
    }
  }

  @media (max-width: 600px) {
    .pain-lede {
      margin-bottom: 36px;
    }

    .pain-story {
      padding: 28px 0 30px;
    }

    .pain-statement {
      font-size: 19px;
    }

    .pain-context,
    .pain-answer {
      font-size: 14.5px;
    }

    .own-stages {
      gap: 36px;
    }

    .own-stage,
    .own-stage[data-actor='you'] {
      align-self: stretch;
      text-align: left;
      max-width: none;
    }

    .own-stage-title {
      font-size: 22px;
    }

    .own-stage-detail {
      font-size: 14.5px;
    }
  }
</style>
