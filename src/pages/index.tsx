import React from 'react';

import DashboardCard from '@/components/elements/card/DashboardCard';
import {
  WardrobeIcon,
  RegisterIcon,
  DendoOutfitIcon,
  SuggestionIcon,
  DashboardHeroIcon,
} from '@/components/elements/icons/icons';
import MainLayout from '@/components/layouts/layout/MainLayout';
import { titleFont } from '@/constants/FontFamily';
import Charts from '@/features/progressPieChart/components/Charts';
import WeatherBox from '@/features/weather/components/WeatherBox';
import { WeatherData } from '@/features/weather/types/weatherType';
import DashboardWIshList from '@/features/wishList/components/DashboardWIshList';
import { useAuth } from '@/hooks/useAuth';

import '@radix-ui/themes/styles.css';
// eslint-disable-next-line import/order
import { useSession } from 'next-auth/react';

export default function Home({ weatherData }: WeatherData) {
  const { data } = useSession();
  const userName = data?.user?.userName;
  const { userId } = useAuth();

  const cards = [
    {
      title: 'Your Wardrobe',
      icon: <WardrobeIcon style=" fill-gray  " />,
      link: `/wardrobe/${userId}`,
    },
    {
      title: 'Register Piece',
      icon: <RegisterIcon style="fill-gray" />,
      link: '/registerPiece',
    },
    {
      title: 'Dendo Outfit',
      icon: <DendoOutfitIcon style="fill-gray " />,
      link: `/dendoOutfitGallery/${userId}`,
    },
    {
      title: 'Suggestion',
      icon: <SuggestionIcon style="stroke-gray stroke-[1px]" />,
      link: '/suggestion',
    },
  ];

  return (
    <MainLayout title="DashBoard">
      <section className="flex flex-col h-full w-full gap-md">
        <div className="h-[30%] flex gap-md  font-bold">
          <div className="p-md w-[70%] relative  bg-gray rounded-lg shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)]">
            <div className="text-2xl font-extraBold">
              <span className={`${titleFont.className} tracking-normal`}>Hello,</span> {userName}!!
            </div>
            <DashboardHeroIcon style="z-10 absolute right-5 bottom-0" />
          </div>
          <div className="h-full w-[30%]">
            <WeatherBox weatherData={weatherData} />
          </div>
        </div>
        <div className="h-[15%] flex gap-sm">
          {cards.map((card) => (
            <DashboardCard key={card.title} title={card.title} link={card.link}>
              {card.icon}
            </DashboardCard>
          ))}
        </div>
        <div className="h-[55%] w-full flex gap-md">
          <Charts />
          <div className="h-full w-1/2">
            <DashboardWIshList />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=vancouver,BC,CA&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
    );

    const locations = await res.json();
    const { lat, lon } = locations[0];

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
