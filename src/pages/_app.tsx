import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalToasty from '@/components/elements/message/PortalToasty';
import PageLayout from '@/components/layouts/layout/PageLayout';
import { mainFont } from '@/constants/FontFamily';
import { ToastProvider } from '@/contexts/ToastContext';
import apolloClient from '@/lib/apollo';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  React.useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <ToastProvider>
          <div className="flex w-full bg-darkGray 2xl:justify-center">
            <div
              className={`flex xs:max-w-[1536px] xs:min-w-[1280px] xs:max-h-[800px] ${mainFont.className} text-base font-normal tracking-tight text-deepGreen bg-darkGray w-full xs:h-screen`}
            >
              {pathname === '/auth/signup' || pathname === '/auth/signin' ? (
                <Component {...pageProps} />
              ) : (
                <PageLayout>
                  <Component {...pageProps} />
                </PageLayout>
              )}
            </div>
          </div>
          <PortalToasty></PortalToasty>
        </ToastProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
