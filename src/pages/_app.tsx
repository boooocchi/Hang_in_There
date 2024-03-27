import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Mulish } from 'next/font/google';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalToasty from '@/components/elements/message/PortalToasty';
import Header from '@/components/layouts/menu/Header';
import SideMenu from '@/components/layouts/menu/SideMenu';
import { ToastProvider } from '@/hooks/ToastContext';
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
        <ToastProvider>
          <div className={`flex lg:max-w-[1470px] ${mainFont.className}  font-normal tracking-tight text-richGreen `}>
            {pathname !== '/auth/signup' && pathname !== '/auth/signin' && <SideMenu />}
            <div className="flex flex-col px-4xl py-2xl w-full  bg-gray h-screen gap-[45px] min-h-[750px] max-h-[800px]">
              <Header />
              <div className="flex-grow overflow-hidden">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
          <PortalToasty></PortalToasty>
        </ToastProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
