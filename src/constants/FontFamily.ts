import { Mr_Dafoe, Lobster, Mulish } from 'next/font/google';

export const mainFont = Mulish({
  weight: ['700', '600', '500', '300'],
  subsets: ['latin'],
  display: 'swap',
});

export const logoFont = Mr_Dafoe({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const titleFont = Lobster({
  weight: ['400'],
  subsets: ['latin'],
});
