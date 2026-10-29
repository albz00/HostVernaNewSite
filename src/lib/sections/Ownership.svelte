<script lang="ts">
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const painPoints = [
    {
      pain: 'Tax season exposes every weak IT process at once.',
      context:
        'Busy-season uptime matters. Remote access has to be controlled, and the team needs help without waiting days for a response.',
      answer:
        'We review the environment before filing season, fix practical gaps, and stay available when the workload spikes.',
    },
    {
      pain: 'Every computer is configured differently.',
      context:
        'Inconsistent devices, accounts, and software create avoidable problems for staff and make support harder.',
      answer:
        'We standardize what can be standardized and document the important setup, access, and support processes.',
    },
    {
      pain: 'No one knows whether backups are actually working.',
      context:
        'Client files and business-critical systems need a reliable backup process and a clear recovery plan.',
      answer:
        'We configure and monitor backups appropriate to your environment and document what is protected.',
    },
    {
      pain: 'The WISP no longer matches the firm.',
      context:
        'Staff, vendors, locations, systems, and safeguards change. A downloaded template does not stay useful on its own.',
      answer:
        'HostVerna provides technology implementation and documentation assistance. Your firm remains responsible for its legal, regulatory, and professional obligations.',
    },
  ];

  const ownership = [
    {
      actor: 'we',
      step: 'Assess.',
      detail:
        'Review users, devices, email, backups, remote access, tax applications, vendors, and current security controls.',
    },
    {
      actor: 'you',
      step: 'Standardize.',
      detail:
        'Fix configuration gaps, establish documented processes, and bring systems under consistent management.',
    },
    {
      actor: 'you',
      step: 'Support.',
      detail:
        'Provide ongoing help desk and administration so small problems do not become filing-season emergencies.',
    },
    {
      actor: 'we',
      step: 'Review and improve.',
      detail:
        'Revisit access, backups, devices, vendors, and documentation as the firm changes and before busy season forces the issue.',
    },
  ];
</script>

<section class="section pain-section" id="ownership">
  <div class="container pain-container">

    <header class="pain-lede">
      <h2 class="pain-title">
        Built for firms that handle sensitive<br />
        financial and taxpayer data every day.
      </h2>
      <p class="pain-sub">
        Technology for an accounting practice has to work differently.
        <ContentHighlight tone="comment">Tax season should not be your annual IT stress test.</ContentHighlight>
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
          Support the people.<br />
          Manage the systems.
        </h2>
        <p class="own-body">
          Rather than selling disconnected tools, HostVerna brings core IT operations into
          <ContentHighlight tone="accent">one accountable support relationship.</ContentHighlight>
        </p>
        <p class="own-body">
          Keep the technology understandable. Standardize what can be standardized. Document the important things. Respond when users need help.
        </p>

        <figure class="own-transfer-fig">
          <img
            class="own-transfer-img"
            src="/images/site-ownership-handshake.jpg"
            width="1400"
            height="935"
            alt="Two business people agreeing on practical technology support"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="own-transfer-cap">Security Six is a baseline checklist, not a complete security or compliance program. HostVerna does not provide legal advice or certify regulatory compliance.</figcaption>
        </figure>
      </div>

      <div class="own-right">
        <ol class="own-stages" aria-label="Managed IT support phases">
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
    color: var(--primary);
  }

  :global([data-theme='dark']) .pain-statement {
    color: var(--text-primary);
  }

  :global([data-theme='dark']) .pain-context {
    color: var(--text-secondary);
  }

  :global([data-theme='dark']) .pain-answer {
    color: var(--primary);
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
