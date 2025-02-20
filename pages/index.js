import { AboutPage } from "../components/homepage/AboutPage";
import CTA from "../components/homepage/call-to-action";
import { FeaturesSectionWithHoverEffectsDemo } from "../components/homepage/FeaturesSectionWithHoverEffectsDemo";
import Navigation from "../components/homepage/Navigation";
import DynamicMarquee from "../components/homepage/ScrollBar"
import ScrollReveal from "../components/homepage/ScrollReveal";
// import { TimeLine } from "@/components/homepage/TimeLine";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Hero } from "../components/ui/animated-hero";
// import AnimatedCoolText from "../components/ui/AnimatedCoolText";
import { Analytics } from "@vercel/analytics/react"
import { Footer } from "../components/footer";


export default function demo() {

  return (

    <div className="block bg-black">
      <SpeedInsights/>
      <Analytics/>
      <Navigation />
      <Hero />
      <DynamicMarquee />
      <ScrollReveal />
      <AboutPage />
      <CTA />
      <FeaturesSectionWithHoverEffectsDemo />
      {/* <AnimatedCoolText /> */}
      {/* <TimeLine /> */}
      <DynamicMarquee />
      <Footer />
    </div>
  );
}
