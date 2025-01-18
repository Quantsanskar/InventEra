import Head from 'next/head';
import { AboutPage } from "@/components/homepage/AboutPage";
import CTA from "@/components/homepage/call-to-action";
import { FeaturesSectionWithHoverEffectsDemo } from "@/components/homepage/FeaturesSectionWithHoverEffectsDemo";
import Navigation from "@/components/homepage/Navigation";
import DynamicMarquee from "@/components/homepage/ScrollBar";
import ScrollReveal from "@/components/homepage/ScrollReveal";
import { TimeLine } from "@/components/homepage/TimeLine";
import { Hero } from "@/components/ui/animated-hero";
import { Footerdemo } from "@/components/ui/footer-section";
import MainPage from '../components/Home';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Buildspace</title>
        <meta name="description" content="Work on ideas that excite you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <HomePage/> */}
      <Navigation />
      <Hero />
      <DynamicMarquee />
      <ScrollReveal />
      <AboutPage />
      <FeaturesSectionWithHoverEffectsDemo />
      <CTA />
      <TimeLine />
      <DynamicMarquee />
      <Footerdemo />
      

    </div>
  );
}



// Remove getServerSideProps or getStaticProps if present
export async function getStaticProps() {
  return {
    props: {}
  };
}