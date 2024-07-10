import { Theme } from '@radix-ui/themes';
import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <body>
        <Theme>
          <Main />
          <div id="myportal" />
          <NextScript />
        </Theme>
      </body>
    </Html>
  );
}
