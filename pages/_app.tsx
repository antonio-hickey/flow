import { trpc } from '../utils/trpc';
import type { AppProps } from 'next/app';
import '../styles/globals.css';


const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}


export default trpc.withTRPC(App);
