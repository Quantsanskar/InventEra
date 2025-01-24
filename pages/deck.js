import BuildersSpaceHero from "../components/mainhero";
import VibeSection from "../components/mainsecond";
import WhatYouGetSection from "../components/mainthird";
import BuilderSpacePlans from "../components/main4th";
import TheNights from "../components/main5th";
import EventHighlights from "../components/main6th";
import NetworkingLounges from "../components/main7th";
import ContactFooter from "../components/mainlast";

const deck = () => {
  return (
    <div>
      <BuildersSpaceHero />
      <VibeSection />
      <WhatYouGetSection />
      <BuilderSpacePlans />
      <TheNights />
      <EventHighlights />
      <NetworkingLounges />
      <ContactFooter />
    </div>
  );
};

export default deck;
