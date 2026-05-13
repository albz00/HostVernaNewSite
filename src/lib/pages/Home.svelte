<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Hero from '../sections/Hero.svelte';
  import Stats from '../sections/Stats.svelte';
  import FitForm from '../sections/FitForm.svelte';
  import Services from '../sections/Services.svelte';
  import Ownership from '../sections/Ownership.svelte';
  import WhyUs from '../sections/WhyUs.svelte';
  import CTA from '../sections/CTA.svelte';
  import Footer from '../components/Footer.svelte';
  import FinancingBubble from '../components/FinancingBubble.svelte';
  import ScrollQualifierPrompt from '../components/ScrollQualifierPrompt.svelte';
</script>

<svelte:head>
  <title>HostVerna | Custom websites, software & IT that fit your business</title>
  <meta
    name="description"
    content="Custom websites, managed hosting, CRM setup, IT support, and software built around your business, with clear ownership when the project wraps."
  />
</svelte:head>

<Navbar />
<Hero />
<Stats />
<FitForm />
<Services />
<Ownership />
<WhyUs />
<CTA />
<Footer />
<FinancingBubble />
<ScrollQualifierPrompt />
