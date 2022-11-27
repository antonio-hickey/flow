import Head from 'next/head'
import { trpc } from '../utils/trpc';


export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'client' });

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-[2rem]">
      <Head>
        <title>Flow</title>
        <meta name="description" content="idk yet, just a tool to help manage life/work flow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center py-[4rem]">
        <h1 className="text-3xl font-bold underline">
          <p>{hello.data.greeting}</p>
        </h1>
      </main>

      <footer className="">
      </footer>
    </div>
  )
};
