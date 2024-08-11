
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false, 
});

export default function Home() {
  return (
    <>
        <Head>
          <title>Map Example</title>
        </Head>
        <div style={{ height: '100vh', width: '100%' }}>
          <Map />
        </div>
    </>
  );
}
