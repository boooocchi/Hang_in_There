import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import LoadingPage from '@/components/layouts/layout/LoadingPage';
import MainLayout from '@/components/layouts/layout/MainLayout';
import { mainTitle } from '@/constants/FontFamily';
import Charts from '@/features/progressPieChart/components/Charts';
import WeatherBox from '@/features/weather/components/WeatherBox';
import { WeatherData } from '@/features/weather/types/weatherType';
import { useAuth } from '@/hooks/useAuth';
import '@radix-ui/themes/styles.css';

export default function Home({ weatherData }: WeatherData) {
  const { status } = useAuth();

  if (status === 'loading') return <LoadingPage />;
  if (status === 'unauthenticated') return <LoadingPage />;

  return (
    <main>
      <MainLayout>
        <div className="flex flex-col h-full">
          <section className="flex flex-col h-full w-full flex-grow  gap-6">
            <div className="h-[45%] flex gap-6 justify-between">
              <div className="h-full w-full relative overflow-hidden group rounded-md">
                <Link href="/wardrobe" className="overflow-hidden">
                  <Image
                    src="/image/home/wardrobe.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110  transition-all duration-200 ease-in "
                  />
                </Link>
                <h2
                  className={`${mainTitle.className} text-2xl text-white drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  transition-all duration-300`}
                >
                  Wardrobe
                </h2>
              </div>
              <div className="h-full  w-full   relative overflow-hidden group rounded-md">
                <Link href="/registerPiece" className="overflow-hidden">
                  <Image
                    src="/image/home/register.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-all duration-300 ease-in "
                  />
                </Link>
                <h2
                  className={`${mainTitle.className} text-xl text-center text-white drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  transition-all duration-300`}
                >
                  Register Your Peace
                </h2>
              </div>
              <div className="h-full  w-full    relative overflow-hidden group rounded-md">
                <Link href="/dendoOutfit" className="overflow-hidden">
                  <Image
                    src="/image/home/dendo_outfit.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-all duration-300 ease-in "
                  />
                </Link>
                <h2
                  className={`${mainTitle.className} text-center text-xl text-white drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  transition-all duration-300`}
                >
                  Dendo Outfit
                </h2>
              </div>
              <div className="h-full  w-full    relative overflow-hidden group rounded-md">
                <Link href="/verdict" className="overflow-hidden">
                  <Image
                    src="/image/home/do_i_look_okay.jpg"
                    alt="Wardrobe"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-all duration-300 ease-in "
                  />
                </Link>
                <h2
                  className={`${mainTitle.className} text-xl text-center text-white drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  transition-all duration-300`}
                >
                  Do I Look Okay?
                </h2>
              </div>
            </div>
            <div className="h-[55%] w-full flex gap-6">
              <div className="h-full w-1/2  flex flex-col gap-6">
                <div className="w-full h-1/2 border border-richGreen rounded-md   flex">
                  <h2
                    className={`${mainTitle.className} text-lg  text-center h-full items-center flex text-white bg-richGreen p-lg w-[150px] min-w-[150px]`}
                  >
                    <span>Today&apos;s Weather</span>
                  </h2>
                  <WeatherBox weatherData={weatherData} />
                </div>
                <div className="w-full h-1/2  flex gap-6 ">
                  <div className="w-full h-full  rounded-md  p-0 border border-lighterGreen flex">
                    <h2
                      className={`${mainTitle.className} text-lg leading-[16px] text-center h-full items-center flex justify-center text-white bg-richGreen p-lg w-[150px]`}
                    >
                      To Buy List
                    </h2>
                  </div>
                </div>
              </div>
              <div className="h-full w-1/2  border bg-richGreen p-lg rounded-md flex flex-col gap-3">
                <h2
                  className={`${mainTitle.className} text-lg flex items-center justify-center pb-sm text-white h-1/5 `}
                >
                  Your Wardrobe Capacity
                </h2>
                <div className="h-4/5 flex items-center">
                  <Charts />
                </div>
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=vancouver,BC,CA&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
    );
    const locations = await res.json();
    const { lat, lon } = locations[0] || {};

    if (lat && lon) {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
      );
      const weatherData = await weatherResponse.json();

      const weatherDescription = weatherData.daily[0].weather[0].description;
      const maxTemp = Math.round(weatherData.daily[0].temp.max * 10) / 10;
      const minTemp = Math.round(weatherData.daily[0].temp.min * 10) / 10;
      const currentTemp = Math.round(weatherData.current.temp * 10) / 10;
      const feelsLike = Math.round(weatherData.current.feels_like * 10) / 10;

      return {
        props: { weatherData: { weatherDescription, maxTemp, minTemp, currentTemp, feelsLike, weatherData } },
      };
    }
  } catch (err) {
    console.error(err);
  }

  return { props: { weatherData: null } };
}
