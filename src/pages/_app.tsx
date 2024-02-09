import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Mulish } from 'next/font/google';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import SideMenu from '@/components/layouts/menu/SideMenu';
import apolloClient from '@/lib/apollo';

import 'bootstrap/dist/css/bootstrap.min.css';

export const mainFont = Mulish({
  weight: ['700', '600', '500', '300'],
  subsets: ['latin'],
  display: 'swap',
});

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <div className={`flex justify-center  ${mainFont.className}  font-normal tracking-tight text-richGreen`}>
          <div className=" flex lg:w-[1470px] overflow-x-scroll">
            {pathname !== '/auth/signup' && pathname !== '/auth/signin' && <SideMenu />}
            <div className="flex-grow  bg-gray min-w-[980px]">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}
