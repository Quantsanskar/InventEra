import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Buildspace</title>
        <meta name="description" content="Work on ideas that excite you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <MainContent />
    </div>
  );
}



// Remove getServerSideProps or getStaticProps if present
export async function getStaticProps() {
  return {
    props: {}
  };
}