import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';
import MainLayout from '@/components/layouts/layout/MainLayout';
import { mainTitle } from '@/constants/FontFamily';

import '@radix-ui/themes/styles.css';

export default function Home() {
  return (
    <main>
      <MainLayout>
        <div className="flex flex-col h-full">
          <PageTitle>Dashboard</PageTitle>
          <section className="flex h-full w-full flex-grow gap-md">
            <div className="h-full w-2/5 relative overflow-hidden group">
              <Link href="/wardrobe" className="overflow-hidden">
                <Image
                  src="/image/home/wardrobe.jpg"
                  alt="Wardrobe"
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-110  transition-all duration-200 ease-in grayscale group-hover:grayscale-0"
                />
              </Link>
              <h2
                className={`${mainTitle.className} text-3xl text-white drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                Wardrobe
              </h2>
            </div>
            <div className="grid grid-cols-2 w-3/5 gap-md">
              <div className="overflow-hidden  relative group">
                <Link href="/registerPiece">
                  {' '}
                  <Image
                    src="/image/home/register.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-all duration-300 ease-in grayscale group-hover:grayscale-0"
                  />
                </Link>
                <h2 className={`${mainTitle.className} text-xl text-white drop-shadow-2xl absolute bottom-5 left-5 `}>
                  Register
                </h2>
              </div>
              <div className="overflow-hidden  relative group">
                <Link href="/dendoOutfit">
                  {' '}
                  <Image
                    src="/image/home/dendo_outfit.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-all duration-300 ease-in grayscale group-hover:grayscale-0"
                  />
                </Link>
                <h2 className={`${mainTitle.className} text-xl text-white drop-shadow-2xl absolute top-5 left-5`}>
                  Dendo <br />
                  Outfit
                </h2>
              </div>
              <div className="overflow-hidden relative group">
                <Link href="/verdict">
                  {' '}
                  <Image
                    src="/image/home/do_i_look_okay.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-all duration-300 ease-in grayscale group-hover:grayscale-0"
                  />
                </Link>
                <h2
                  className={`${mainTitle.className} text-xl text-white drop-shadow-2xl absolute top-1/2 right-5 -translate-y-1/2 text-center`}
                >
                  Do I <br /> Look <br />
                  Okay?
                </h2>
              </div>
              <div className="overflow-hidden relative group">
                <Link href="/setting">
                  {' '}
                  <Image
                    src="/image/home/wardrobe.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110  hover:grayscale-0-0 transition-all duration-300 ease-in grayscale group-hover:grayscale-0"
                  />
                </Link>
                <h2
                  className={`${mainTitle.className} text-xl text-white drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  Register
                </h2>
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </main>
  );
}
