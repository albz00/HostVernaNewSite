<script lang="ts">
  import USMap from '../components/USMap.svelte';

  const trustedBy = ['Apex Realty', 'NorthTide Co.', 'GridFlow', 'Beacon Labs', 'Harrow & Co.'];

  const chartBars = [38, 52, 44, 67, 55, 78, 62, 85, 71, 90, 76, 94];

  const projects = [
    { name: 'Apex Realty', type: 'Website', status: 'Live', uptime: '99.9%', ping: 12 },
    { name: 'GridFlow Inc.', type: 'Software', status: 'Live', uptime: '100%', ping: 8 },
    { name: 'NorthTide HVAC', type: 'Website', status: 'Live', uptime: '99.7%', ping: 24 },
  ];

  const activity = [
    { label: 'SSL renewed', time: '2m ago', icon: 'shield' },
    { label: 'Deploy pushed', time: '1h ago', icon: 'upload' },
    { label: 'Ticket closed', time: '3h ago', icon: 'check' },
  ];
</script>

<section class="hero">
  <div class="hero-map">
    <USMap opacity={0.13} />
  </div>
  <div class="hero-stripe"></div>
  <div class="hero-glow-1"></div>
  <div class="hero-glow-2"></div>

  <div class="container hero-content">
    <h1 class="hero-title">
      Your site. Your software.<br />
      <span class="gradient-text">Actually yours.</span>
    </h1>

    <p class="hero-sub">
      We design and build everything from scratch. No templates, no locked subscriptions.
      You own your site outright, get the tools to manage it, and have a team you can actually reach.
    </p>

    <div class="trust-bar">
      <div class="tb-item">
        <div class="tb-dot"></div>
        <span class="tb-label">WV Licensed &amp; Insured</span>
      </div>
      <div class="tb-sep"></div>
      <div class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" class="tb-icon">
          <rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M8 8V6a4 4 0 018 0v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="tb-label">Financing Available</span>
      </div>
      <div class="tb-sep"></div>
      <div class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" class="tb-icon">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="tb-label">You Own It Outright</span>
      </div>
      <div class="tb-sep"></div>
      <div class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" class="tb-icon">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="tb-label">Nationwide</span>
      </div>
    </div>

    <div class="hero-actions">
      <a href="#contact" class="btn btn-primary btn-lg">Get a Free Consultation</a>
      <a href="#ownership" class="btn btn-secondary btn-lg">How Ownership Works</a>
    </div>

    <div class="hero-proof">
      <span class="proof-label">Trusted by business owners across the US</span>
      <div class="proof-list">
        {#each trustedBy as brand}
          <span class="proof-brand">{brand}</span>
        {/each}
      </div>
    </div>
  </div>

  <div class="container">
    <div class="hero-visual-row">
      <div class="hero-mockup">
        <div class="mockup-bar">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
          <span class="mockup-url">hostverna.com/dashboard</span>
          <div class="mockup-bar-right">
            <div class="live-badge">
              <div class="live-dot"></div>
              <span>All systems live</span>
            </div>
          </div>
        </div>
        <div class="mockup-body">
          <div class="mockup-sidebar">
            <div class="sb-logo"></div>
            <div class="sb-nav">
              <div class="snav active">
                <div class="snav-icon filled"></div>
                <div class="snav-label"></div>
              </div>
              <div class="snav">
                <div class="snav-icon"></div>
                <div class="snav-label short"></div>
              </div>
              <div class="snav">
                <div class="snav-icon"></div>
                <div class="snav-label"></div>
              </div>
              <div class="snav">
                <div class="snav-icon"></div>
                <div class="snav-label short"></div>
              </div>
            </div>
            <div class="sb-footer">
              <div class="sb-avatar"></div>
            </div>
          </div>
          <div class="mockup-main">
            <div class="mm-topbar">
              <div class="mm-page-title"></div>
              <div class="mm-actions">
                <div class="mm-btn"></div>
                <div class="mm-btn filled"></div>
              </div>
            </div>

            <div class="kpi-row">
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val gradient-text">24</span>
                  <div class="kpi-delta up">+2</div>
                </div>
                <span class="kpi-label">Active Sites</span>
                <div class="kpi-sparkline">
                  {#each [30,45,38,52,44,60] as h}
                    <div class="sp-bar" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val gradient-text">99.9%</span>
                  <div class="kpi-delta up">Stable</div>
                </div>
                <span class="kpi-label">Avg Uptime</span>
                <div class="kpi-sparkline">
                  {#each [85,90,88,92,95,99] as h}
                    <div class="sp-bar" style="height:{h}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val" style="color:#0f172a">2</span>
                  <div class="kpi-delta neutral">Open</div>
                </div>
                <span class="kpi-label">Tickets</span>
                <div class="kpi-sparkline">
                  {#each [8,5,6,3,4,2] as h}
                    <div class="sp-bar amber" style="height:{h * 10}%"></div>
                  {/each}
                </div>
              </div>
              <div class="kpi">
                <div class="kpi-top">
                  <span class="kpi-val" style="color:#16a34a">$0</span>
                  <div class="kpi-delta up">Saved</div>
                </div>
                <span class="kpi-label">Subscription Fees</span>
                <div class="kpi-sparkline">
                  {#each [0,0,0,0,0,0] as h}
                    <div class="sp-bar green" style="height: 4px"></div>
                  {/each}
                </div>
              </div>
            </div>

            <div class="chart-panel">
              <div class="cp-header">
                <div class="cp-title-block">
                  <div class="cp-title-line"></div>
                  <div class="cp-sub-line"></div>
                </div>
                <div class="cp-tabs">
                  <div class="cp-tab active"></div>
                  <div class="cp-tab"></div>
                  <div class="cp-tab"></div>
                </div>
              </div>
              <div class="chart-area">
                <div class="chart-y-labels">
                  {#each ['100', '75', '50', '25'] as l}
                    <span class="cy-label">{l}</span>
                  {/each}
                </div>
                <div class="chart-bars-wrap">
                  <div class="chart-grid">
                    {#each [0,1,2,3] as _}
                      <div class="grid-line"></div>
                    {/each}
                  </div>
                  <div class="chart-bars">
                    {#each chartBars as h, i}
                      <div class="bar" style="height:{h}%" class:highlight={i === chartBars.length - 1}></div>
                    {/each}
                  </div>
                </div>
              </div>
              <div class="chart-x-labels">
                {#each ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as m}
                  <span class="cx-label">{m}</span>
                {/each}
              </div>
            </div>

            <div class="bottom-panels">
              <div class="projects-panel">
                <div class="panel-header">
                  <div class="ph-title"></div>
                </div>
                {#each projects as p}
                  <div class="proj-row">
                    <div class="proj-avatar"></div>
                    <div class="proj-info">
                      <div class="proj-name">{p.name}</div>
                      <div class="proj-type">{p.type}</div>
                    </div>
                    <div class="proj-ping">{p.ping}ms</div>
                    <div class="proj-status live">{p.status}</div>
                  </div>
                {/each}
              </div>
              <div class="activity-panel">
                <div class="panel-header">
                  <div class="ph-title"></div>
                </div>
                {#each activity as a}
                  <div class="act-row">
                    <div class="act-dot"></div>
                    <div class="act-info">
                      <div class="act-label">{a.label}</div>
                      <div class="act-time">{a.time}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding-top: 140px;
    padding-bottom: 0;
    overflow: hidden;
    background: #fff;
  }

  .hero-map {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-stripe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent 0%, #0369a1 30%, #0d9488 70%, transparent 100%);
    pointer-events: none;
  }

  .hero-glow-1 {
    position: absolute;
    top: -80px;
    left: -80px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(3,105,161,0.10) 0%, rgba(13,148,136,0.04) 50%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-glow-2 {
    position: absolute;
    top: 60px;
    right: -80px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding-bottom: 56px;
  }

  .hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(44px, 7vw, 80px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: #0f172a;
    margin-bottom: 20px;
  }

  .hero-sub {
    font-size: clamp(15px, 1.8vw, 18px);
    color: #475569;
    max-width: 520px;
    margin: 0 auto 28px;
    line-height: 1.7;
    font-weight: 400;
  }

  .trust-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 28px;
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(3,105,161,0.04), rgba(13,148,136,0.04));
    border: 1px solid rgba(3,105,161,0.12);
    border-radius: 2px 0 2px 0;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
  }

  .tb-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tb-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0d9488;
    box-shadow: 0 0 0 2px rgba(13,148,136,0.25);
    animation: pulse 2.5s ease infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 2px rgba(13,148,136,0.25); }
    50% { box-shadow: 0 0 0 4px rgba(13,148,136,0.1); }
  }

  .tb-icon {
    color: #0369a1;
    flex-shrink: 0;
  }

  .tb-label {
    font-size: 11.5px;
    font-weight: 600;
    color: #0f172a;
    font-family: 'Space Grotesk', sans-serif;
    white-space: nowrap;
  }

  .tb-sep {
    width: 1px;
    height: 14px;
    background: rgba(3,105,161,0.15);
    flex-shrink: 0;
  }

  .hero-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }

  .hero-proof {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .proof-label {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
  }

  .proof-list {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .proof-brand {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    letter-spacing: 0.02em;
    font-family: 'Space Grotesk', sans-serif;
  }

  .hero-visual-row {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 16px;
    align-items: flex-end;
    max-width: 980px;
    margin: 0 auto;
  }

  .hero-mockup {
    flex: 1;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 6px 6px 0 0;
    box-shadow: 0 -4px 48px rgba(3,105,161,0.08), 0 0 0 1px rgba(226,232,240,0.5);
    overflow: hidden;
  }

  .mockup-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 9px 14px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #e2e8f0;
  }

  .dot.red { background: #fc8181; }
  .dot.yellow { background: #f6c344; }
  .dot.green { background: #68d391; }

  .mockup-url {
    font-size: 10px;
    color: #94a3b8;
    margin-left: 6px;
    font-family: 'DM Mono', monospace;
    flex: 1;
  }

  .mockup-bar-right {
    display: flex;
    align-items: center;
  }

  .live-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    font-family: 'DM Mono', monospace;
    color: #0d9488;
    background: rgba(13,148,136,0.08);
    border: 1px solid rgba(13,148,136,0.18);
    border-radius: 10px;
    padding: 2px 8px;
    letter-spacing: 0.04em;
  }

  .live-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0d9488;
    animation: pulse 2s ease infinite;
  }

  .mockup-body {
    display: flex;
    height: 380px;
  }

  .mockup-sidebar {
    width: 52px;
    background: #0f172a;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sb-logo {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: linear-gradient(135deg, #0369a1, #0d9488);
    margin: 0 auto 10px;
  }

  .sb-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .snav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 6px 4px;
    border-radius: 3px;
    cursor: pointer;
  }

  .snav.active {
    background: rgba(255,255,255,0.1);
  }

  .snav-icon {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    background: rgba(255,255,255,0.2);
  }

  .snav-icon.filled {
    background: linear-gradient(135deg, #0369a1, #0d9488);
  }

  .snav-label {
    width: 24px;
    height: 3px;
    border-radius: 1px;
    background: rgba(255,255,255,0.15);
  }

  .snav-label.short { width: 16px; }

  .sb-footer {
    display: flex;
    justify-content: center;
    padding-top: 8px;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: auto;
  }

  .sb-avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: 1.5px solid rgba(255,255,255,0.2);
  }

  .mockup-main {
    flex: 1;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    background: #f8fafc;
  }

  .mm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 8px 12px;
  }

  .mm-page-title {
    width: 90px;
    height: 8px;
    border-radius: 2px;
    background: #0f172a;
    opacity: 0.7;
  }

  .mm-actions {
    display: flex;
    gap: 5px;
  }

  .mm-btn {
    width: 40px;
    height: 20px;
    border-radius: 2px;
    background: #e2e8f0;
  }

  .mm-btn.filled {
    background: linear-gradient(90deg, #0369a1, #0d9488);
  }

  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .kpi {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .kpi-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .kpi-val {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .kpi-delta {
    font-size: 8px;
    font-family: 'DM Mono', monospace;
    border-radius: 2px;
    padding: 1px 4px;
  }

  .kpi-delta.up {
    background: #dcfce7;
    color: #16a34a;
  }

  .kpi-delta.neutral {
    background: #fff7ed;
    color: #c2410c;
  }

  .kpi-label {
    font-size: 8px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .kpi-sparkline {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 18px;
    margin-top: 5px;
  }

  .sp-bar {
    flex: 1;
    background: linear-gradient(180deg, #0369a1, #0d9488);
    border-radius: 1px 1px 0 0;
    opacity: 0.5;
    min-height: 2px;
  }

  .sp-bar.amber {
    background: linear-gradient(180deg, #f59e0b, #f97316);
  }

  .sp-bar.green {
    background: #16a34a;
    height: 4px !important;
  }

  .chart-panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 10px 12px 6px;
  }

  .cp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .cp-title-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cp-title-line {
    width: 80px;
    height: 6px;
    background: #0f172a;
    opacity: 0.7;
    border-radius: 1px;
  }

  .cp-sub-line {
    width: 50px;
    height: 4px;
    background: #e2e8f0;
    border-radius: 1px;
  }

  .cp-tabs {
    display: flex;
    gap: 4px;
  }

  .cp-tab {
    width: 28px;
    height: 16px;
    border-radius: 2px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
  }

  .cp-tab.active {
    background: linear-gradient(90deg, #0369a1, #0d9488);
    border-color: transparent;
  }

  .chart-area {
    display: flex;
    gap: 6px;
    height: 68px;
  }

  .chart-y-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 2px;
  }

  .cy-label {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #cbd5e1;
  }

  .chart-bars-wrap {
    flex: 1;
    position: relative;
  }

  .chart-grid {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }

  .grid-line {
    width: 100%;
    height: 1px;
    background: #f1f5f9;
  }

  .chart-bars {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 3px;
    align-items: flex-end;
  }

  .bar {
    flex: 1;
    background: linear-gradient(180deg, rgba(3,105,161,0.4), rgba(13,148,136,0.3));
    border-radius: 2px 2px 0 0;
    min-height: 3px;
  }

  .bar.highlight {
    background: linear-gradient(180deg, #0369a1, #0d9488);
    opacity: 1;
  }

  .chart-x-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
  }

  .cx-label {
    font-size: 6.5px;
    font-family: 'DM Mono', monospace;
    color: #cbd5e1;
  }

  .bottom-panels {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 8px;
    flex: 1;
  }

  .projects-panel,
  .activity-panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
  }

  .panel-header {
    padding-bottom: 5px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 2px;
  }

  .ph-title {
    width: 60px;
    height: 5px;
    border-radius: 1px;
    background: #0f172a;
    opacity: 0.5;
  }

  .proj-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .proj-avatar {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
    flex-shrink: 0;
  }

  .proj-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .proj-name {
    font-size: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #0f172a;
  }

  .proj-type {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
  }

  .proj-ping {
    font-size: 7.5px;
    font-family: 'DM Mono', monospace;
    color: #64748b;
  }

  .proj-status {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    padding: 2px 5px;
    border-radius: 2px;
  }

  .proj-status.live {
    background: #dcfce7;
    color: #16a34a;
  }

  .act-row {
    display: flex;
    align-items: flex-start;
    gap: 6px;
  }

  .act-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0369a1, #0d9488);
    flex-shrink: 0;
    margin-top: 3px;
  }

  .act-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .act-label {
    font-size: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #0f172a;
  }

  .act-time {
    font-size: 7px;
    font-family: 'DM Mono', monospace;
    color: #94a3b8;
  }

  @media (max-width: 760px) {
    .hero {
      padding-top: 110px;
    }
    .trust-bar {
      gap: 10px;
    }
    .tb-sep {
      display: none;
    }
  }
</style>
