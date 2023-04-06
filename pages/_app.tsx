import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{pageProps.metaTitle ?? 'Yachting APP - Rent and sale your boat'}</title>
        <meta
          name="description"
          content={
            pageProps.metaDescription ??
            'Search for all types of boat rentals near you, including sailing boats, motorboats, and luxury yachts.'
          }
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
