import { Staatliches, Mulish } from 'next/font/google';

export const mainFont = Mulish({
  weight: ['700', '600', '500', '300'],
  subsets: ['latin'],
  display: 'swap',
});

export const titleFont = Staatliches({
  weight: ['400'],
  subsets: ['latin'],
});
