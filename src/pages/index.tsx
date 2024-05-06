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
        <div className="h-[25%] max-xs:h-[150px] flex xs:gap-md gap-sm font-bold">
          <div className="h-full py-md px-md xs:w-[70%] w-1/2 relative  bg-gray rounded-lg shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)]">
            <div className="xs:text-2xl text-xl font-boldest leading-[1]">
              <span className={`${titleFont.className}`}>Hello,</span> {userName}!!
            </div>
            <DashboardHeroIcon style="absolute xs:right-5 right-1 bottom-0 xs:h-[200px] xs:w-[200px] h-[80px] w-[80px]" />
          </div>
          <div className="xs:h-full xs:w-[30%] w-1/2">
            <WeatherBox weatherData={weatherData} />
          </div>
        </div>
        <div className="xs:h-[10%] xs:flex xs:gap-md gap-sm grid grid-cols-2">
          {cards.map((card) => (
            <DashboardCard key={card.title} title={card.title} link={card.link}>
              {card.icon}
            </DashboardCard>
          ))}
        </div>
        <div className="xs:flex-grow w-full flex flex-col xs:flex-row gap-md">
          <Charts />
          <DashboardWIshList />
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
