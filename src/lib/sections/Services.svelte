<script lang="ts">
  import { onMount } from 'svelte';
  import ContentHighlight from '../components/ContentHighlight.svelte';

  const webDesignGalleryUrls = [
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/e7411c78-6148-419c-edba-edf1b5d57600/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/7235dcdb-a1d5-452f-0461-513b2d203000/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/747d39cd-8323-4c4b-7a35-605f9e248c00/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/74b37047-5e66-43cb-e67d-4558ac093600/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/2bf4cd4f-d625-43f3-0c87-43f95ac83b00/public',
  ] as const;

  const businessSoftwareGalleryUrls = [
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/7e7293f0-2161-4ffa-80e9-dc0150aa8e00/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/9a436251-63ba-4058-855e-2193e8359800/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/95a5524a-9151-4a51-c492-e874a017c300/public',
    'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/207d7cd9-5109-43ca-4f9a-1b44be5cd600/public',
  ] as const;

  let webDesignGalleryIndex = 0;
  let businessSoftwareGalleryIndex = 0;

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const idWeb = window.setInterval(() => {
      webDesignGalleryIndex = (webDesignGalleryIndex + 1) % webDesignGalleryUrls.length;
    }, 5500);
    const idBiz = window.setInterval(() => {
      businessSoftwareGalleryIndex =
        (businessSoftwareGalleryIndex + 1) % businessSoftwareGalleryUrls.length;
    }, 5500);

    return () => {
      clearInterval(idWeb);
      clearInterval(idBiz);
    };
  });

  const services = [
    {
      title: 'Website Design & Development',
      iconUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/a4e7e3e5-d316-4016-1b6a-9dc2f4627200/public',
      galleryId: 'web-design' as const,
      galleryUrls: webDesignGalleryUrls,
      galleryLabel: 'Rotating website design examples',
      description: `Most business websites are templates with your logo swapped in. We don't do that.\n\nEvery site we build is designed from scratch around your specific business: how you work, who you serve, and what actually needs to be said. No generic layouts. No filler copy. No features you didn't ask for.\n\nAnd when it's done, it's yours. Not ours to hold over you with a monthly fee.`,
      placeholder: 'Website Redesign',
      quote:
        '"Every other so-called custom proposal still looked like the same layout with our logo swapped in. This one finally looks like us, not a template."',
      quoteName: 'J. Harrow',
      flip: false,
    },
    {
      title: 'Business Software & Tools',
      iconUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/d5e9235c-c02f-4fe0-e09d-e6f1288f1000/public',
      galleryId: 'business-software' as const,
      galleryUrls: businessSoftwareGalleryUrls,
      galleryLabel: 'Rotating business software examples',
      description: `Off-the-shelf software almost fits. Almost. The remaining gap is where time gets wasted and frustration builds.\n\nWe build internal tools, client portals, and web applications tailored to your exact workflow. You stop bending your process around someone else's product and start using something built specifically for how you operate.`,
      placeholder: 'Internal Ops Platform',
      quote:
        '"We were duct-taping four subscriptions together and still doing half the work in spreadsheets. One build replaced the pile, and it matches how we actually operate."',
      quoteName: 'M. Torres',
      flip: true,
    },
    {
      title: 'CRM & Client Management',
      iconUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/f7c712dd-6a21-4483-43b4-3a5d91006f00/public',
      visualUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/858fe79c-7a72-4f46-2a6a-ad20c0374e00/public',
      visualLabel: 'CRM workflow automation example',
      description: `A CRM that nobody uses is just a database with a price tag. The problem is usually setup: the wrong fields, missing automation, no training, no buy-in.\n\nWe configure your CRM around your actual sales process and make sure your team knows how to use it. Then we stay involved so it doesn't fall apart a month later.`,
      placeholder: 'CRM Dashboard',
      quote:
        '"Half our staff never logged into the old CRM. They use this one because the fields and workflow match how we sell, and we didn\'t have to bend our process around the software."',
      quoteName: 'S. Okafor',
      flip: false,
    },
    {
      title: 'Managed IT Support',
      iconUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/bd24b10b-266a-4306-9ec0-3249b8afc300/public',
      visualUrl:
        'https://imagedelivery.net/FvOXf_HoZxDXgXU5xPiCfw/a01968f3-730e-4a92-27aa-8b9eb15c0100/public',
      visualLabel: 'IT collaboration and support',
      description: `You shouldn't need a computer science degree to run your business. But you also shouldn't be on hold for 40 minutes every time something breaks.\n\nWe act as your IT department: monitoring, responding, and fixing things before you notice them. You call, we answer. No ticket queue. No outsourced support desk.`,
      placeholder: 'Infrastructure Overview',
      quote:
        '"Email went sideways the morning of a big job. I figured I’d get voicemail. Someone picked up, stayed on the line, and we got it sorted. That’s what I was looking for."',
      quoteName: 'R. Patel',
      flip: true,
    },
  ];
</script>

<section class="section services" id="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        Built for your business.<br />
        <ContentHighlight tone="accent">Not built for everyone.</ContentHighlight>
      </h2>
    </div>

    <div class="services-list">
      {#each services as svc}
        <div class="service-row" class:flip={svc.flip}>
          <div class="service-visual">
            {#if svc.galleryUrls && svc.galleryLabel}
              <div class="svc-visual" aria-label={svc.galleryLabel}>
                {#each svc.galleryUrls as url, i}
                  <img
                    src={url}
                    alt=""
                    class="svc-gallery-img"
                    class:active={svc.galleryId === 'web-design'
                      ? i === webDesignGalleryIndex
                      : i === businessSoftwareGalleryIndex}
                    width={1600}
                    height={1000}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                {/each}
              </div>
            {:else if svc.visualUrl && svc.visualLabel}
              <div class="svc-visual" aria-label={svc.visualLabel}>
                <img
                  src={svc.visualUrl}
                  alt=""
                  class="svc-visual-img"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            {:else}
              <div class="svc-placeholder">
                <span class="ph-label">{svc.placeholder}</span>
              </div>
            {/if}
          </div>

          <div class="service-text">
            <div class="svc-title-block">
              <img
                src={svc.iconUrl}
                width="128"
                height="128"
                alt=""
                class="svc-section-icon"
                loading="lazy"
                decoding="async"
              />
              <h3 class="svc-title">{svc.title}</h3>
            </div>
            <div class="svc-desc">
              {#each svc.description.split('\n\n') as para}
                <p>{para}</p>
              {/each}
            </div>
            <blockquote class="svc-quote">
              <p class="quote-text">{svc.quote}</p>
              <cite class="quote-cite">{svc.quoteName}</cite>
            </blockquote>
            <a href="/contact" class="btn btn-outline-primary" style="align-self:flex-start; margin-top: 8px;">
              Learn more
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .section-header {
    text-align: center;
    margin-bottom: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    line-height: 1.15;
  }

  .services-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .service-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 5vw, 64px);
    align-items: center;
    padding: clamp(32px, 4vw, 48px) clamp(28px, 3vw, 40px);
    border-radius: var(--radius-tile);
    border: 1px solid var(--border);
    background: var(--bg);
    box-shadow: var(--shadow-tile);
    transition: box-shadow 0.22s ease;
  }

  .service-row:hover {
    box-shadow: var(--shadow-tile-hover);
  }

  .service-row.flip {
    direction: rtl;
  }

  .service-row.flip > * {
    direction: ltr;
  }

  .service-visual {
    position: relative;
    border-radius: var(--radius-tile);
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    box-shadow: var(--shadow-sm);
    aspect-ratio: 16/10;
  }

  .svc-visual {
    position: absolute;
    inset: 0;
    background: #0f172a;
  }

  .svc-gallery-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    opacity: 0;
    transition: opacity 0.7s ease;
  }

  .svc-gallery-img.active {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .svc-gallery-img {
      transition-duration: 0.01ms;
    }
  }

  .svc-visual-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .svc-placeholder {
    width: 100%;
    height: 100%;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  .ph-label {
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    color: #0369a1;
    text-align: center;
    padding: 16px;
    letter-spacing: 0.04em;
    opacity: 0.7;
  }

  .service-text {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .svc-title-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: clamp(14px, 3vw, 28px);
    width: 100%;
  }

  .svc-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin: 0;
    flex: 1;
    min-width: 0;
  }

  .svc-section-icon {
    width: min(64px, 18vw);
    max-width: 80px;
    height: auto;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }

  @media (max-width: 420px) {
    .svc-title-block {
      align-items: flex-start;
    }

    .svc-section-icon {
      width: min(56px, 22vw);
      margin-top: 4px;
    }
  }

  .svc-desc {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .svc-desc p {
    font-size: 14.5px;
    color: #475569;
    line-height: 1.75;
  }

  .svc-quote {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-tile);
    padding: 12px 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    box-shadow: var(--shadow-sm);
  }

  .quote-text {
    font-size: 13.5px;
    color: #374151;
    font-style: italic;
    line-height: 1.5;
  }

  .quote-cite {
    font-size: 11px;
    color: #94a3b8;
    font-style: normal;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
  }

  @media (max-width: 820px) {
    .service-row {
      grid-template-columns: 1fr;
      gap: 32px;
      direction: ltr;
    }
    .service-row.flip {
      direction: ltr;
    }
    .service-visual {
      order: -1;
      aspect-ratio: 16/8;
    }
  }
</style>
