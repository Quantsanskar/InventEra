import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import HomePage from '@/components/Home';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Buildspace</title>
        <meta name="description" content="Work on ideas that excite you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage/>
    </div>
  );
}



// Remove getServerSideProps or getStaticProps if present
export async function getStaticProps() {
  return {
    props: {}
  };
}