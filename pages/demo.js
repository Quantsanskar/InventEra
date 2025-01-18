import { AboutPage } from "@/components/homepage/AboutPage";
import CTA from "@/components/homepage/call-to-action";
import { FeaturesSectionWithHoverEffectsDemo } from "@/components/homepage/FeaturesSectionWithHoverEffectsDemo";
import Navigation from "@/components/homepage/Navigation";
import DynamicMarquee from "@/components/homepage/ScrollBar";
import ScrollReveal from "@/components/homepage/ScrollReveal";


import { Hero } from "@/components/ui/animated-hero";
import { TextRevealByWord } from "@/components/ui/text-reveal";

export default function demo() {
  return (
    <div className="block bg-black">
      <Navigation />
      <Hero />
      <DynamicMarquee />
      <ScrollReveal />
      <AboutPage />
      <FeaturesSectionWithHoverEffectsDemo />
      <CTA />
   
    </div>
  );
}
