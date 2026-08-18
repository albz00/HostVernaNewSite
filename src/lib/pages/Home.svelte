<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Hero from '../sections/Hero.svelte';
  import Stats from '../sections/Stats.svelte';
  import QualificationPreview from '../sections/QualificationPreview.svelte';
  import Services from '../sections/Services.svelte';
  import Ownership from '../sections/Ownership.svelte';
  import WhyUs from '../sections/WhyUs.svelte';
  import CTA from '../sections/CTA.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollQualifierPrompt from '../components/ScrollQualifierPrompt.svelte';
</script>

<Navbar />
<main id="main-content">
  <Hero />
  <Services />
  <QualificationPreview />
  <Stats />
  <Ownership />
  <WhyUs />
  <CTA />
</main>
<Footer />
<ScrollQualifierPrompt />
