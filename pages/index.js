import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import BuildersSpaceHero from '../components/mainhero';
import VibeSection from '../components/mainsecond';
import WhatYouGetSection from '../components/mainthird';
import BuilderSpacePlans from '../components/main4th';
import TheNights from '../components/main5th';
import EventHighlights from '../components/main6th';
import NetworkingLounges from '../components/main7th';
import ContactFooter from '../components/mainlast';
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
      {/* <BuildersSpaceHero/>
      <VibeSection/>
      <WhatYouGetSection/>
      <BuilderSpacePlans/>
      <TheNights/>
      <EventHighlights/>
      <NetworkingLounges/>  
      <ContactFooter/> */}
      <MainPage/>

    </div>
  );
}



// Remove getServerSideProps or getStaticProps if present
export async function getStaticProps() {
  return {
    props: {}
  };
}