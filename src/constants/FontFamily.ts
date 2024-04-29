import { Mr_Dafoe, Staatliches, Mulish } from 'next/font/google';

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

export const titleFont = Staatliches({
  weight: ['400'],
  subsets: ['latin'],
});
