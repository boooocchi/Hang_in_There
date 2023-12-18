import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import React from 'react';

import SideMenu from '@/components/layouts/menu/SideMenu';
import apolloClient from '@/lib/apollo';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="flex">
        <SideMenu />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  );
}
