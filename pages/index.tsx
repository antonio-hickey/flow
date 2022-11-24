import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc';


export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'client' });

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Flow</title>
        <meta name="description" content="idk a tool to help manage life/work flow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
          <p>{hello.data.greeting}</p>
        </h1>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
};
