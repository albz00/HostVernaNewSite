<script lang="ts">
  const fitSignals = [
    'CPA, accounting, or tax firm',
    'No formal IT provider or only break-fix support',
    'Owner or office manager handles most technology',
    'Questions about MFA, backups, encryption, endpoints, or WISP',
    'Need clearer responsibility for users, devices, and cloud accounts',
    'Specific gap or uncertainty with an existing provider',
  ];
</script>

<section class="qualification-preview" id="who-we-serve">
  <div class="image-layer" aria-hidden="true"></div>
  <div class="container preview-grid">
    <div class="preview-copy">
      <h2>
        Is HostVerna the right fit for
        <span class="title-accent">your accounting or tax firm?</span>
      </h2>
      <p>
        Review the fit checklist, then share the details HostVerna needs for a focused technology and
        security discovery meeting.
      </p>
      <a href="/qualification" class="btn btn-primary btn-lg">Start Qualification</a>
    </div>

    <div class="checklist-card">
      <h3>Strong-fit signals</h3>
      <ul>
        {#each fitSignals as signal}
          <li><span aria-hidden="true">✓</span>{signal}</li>
        {/each}
      </ul>
      <p class="note">The discovery meeting is not an audit, penetration test, or compliance certification.</p>
    </div>
  </div>
</section>

<style>
  .qualification-preview {
    position: relative;
    overflow: hidden;
    padding: 112px 0;
    color: #f8fafc;
    background: #061933;
    isolation: isolate;
  }

  .image-layer {
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      linear-gradient(90deg, rgb(2 15 32 / 0.9), rgb(2 15 32 / 0.38)),
      linear-gradient(180deg, rgb(2 15 32 / 0.15), rgb(2 15 32 / 0.75)),
      url('/images/it-finance-security-background.png') center right / cover no-repeat;
  }

  .image-layer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(800px 520px at 15% 20%, rgb(56 189 248 / 0.14), transparent 68%);
  }

  .preview-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(340px, 0.7fr);
    gap: clamp(42px, 7vw, 90px);
    align-items: center;
  }

  .preview-copy {
    max-width: 650px;
  }

  h2 {
    margin: 0 0 22px;
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 5vw, 62px);
    line-height: 1.05;
    letter-spacing: -0.035em;
  }

  .title-accent {
    color: #67e8f9;
  }

  .preview-copy p {
    max-width: 590px;
    margin: 0 0 30px;
    color: #cbd5e1;
    font-size: 17px;
    line-height: 1.75;
  }

  .checklist-card {
    padding: clamp(26px, 4vw, 38px);
    border: 1px solid rgb(148 196 255 / 0.28);
    border-radius: var(--radius-tile);
    background: rgb(2 15 32 / 0.76);
    box-shadow: 0 24px 70px rgb(2 6 23 / 0.42);
    backdrop-filter: blur(12px);
  }

  .checklist-card h3 {
    margin: 0 0 20px;
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
  }

  ul {
    display: grid;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 10px;
    color: #e2e8f0;
    line-height: 1.5;
  }

  li span {
    color: #5eead4;
    font-weight: 800;
  }

  .note {
    margin: 24px 0 0;
    padding-top: 18px;
    border-top: 1px solid rgb(148 163 184 / 0.22);
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.6;
  }

  @media (max-width: 820px) {
    .qualification-preview {
      padding: 80px 0;
    }

    .preview-grid {
      grid-template-columns: 1fr;
    }

    .image-layer {
      background:
        linear-gradient(180deg, rgb(2 15 32 / 0.68), rgb(2 15 32 / 0.9)),
        url('/images/it-finance-security-background.png') 68% center / cover no-repeat;
    }
  }
</style>
