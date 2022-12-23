import { trpc } from '../utils/trpc';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';


const App = ({ Component, pageProps: { session, ...pageProps} }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}


export default trpc.withTRPC(App);
