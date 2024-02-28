import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Mulish } from 'next/font/google';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import Header from '@/components/layouts/menu/Header';
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
        <div className={`flex lg:w-[1470px] ${mainFont.className}  font-normal tracking-tight text-richGreen `}>
          {pathname !== '/auth/signup' && pathname !== '/auth/signin' && <SideMenu />}
          <div className="flex flex-col px-4xl py-2xl w-full  bg-gray h-screen gap-[45px] min-h-[750px] ">
            <Header />
            <div className="flex-grow overflow-hidden">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}

{
  /* <div className="xl:min-h-[450px] xl:min-w-[1190px] flex flex-col   justify-center  flex-grow w-full">
{pageTitle && <PageTitle button={button}>{pageTitle}</PageTitle>}
<div className=" w-full flex flex-col justify-center overflow-y-scroll ">{children}</div>
</div> */
}
