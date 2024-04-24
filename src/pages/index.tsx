import React from 'react';

import DashboardCard from '@/components/elements/card/DashboardCard';
import { WardrobeIcon, RegisterIcon, DendoOutfitIcon, SuggestionIcon } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';
import MainLayout from '@/components/layouts/layout/MainLayout';
import Charts from '@/features/progressPieChart/components/Charts';
import WeatherBox from '@/features/weather/components/WeatherBox';
import { WeatherData } from '@/features/weather/types/weatherType';
import DashboardWIshList from '@/features/wishList/components/DashboardWIshList';
import { useAuth } from '@/hooks/useAuth';

import '@radix-ui/themes/styles.css';

export default function Home({ weatherData }: WeatherData) {
  const { status, userId } = useAuth();

  if (status === 'loading' || status === 'unauthenticated') return <Loading size="large" />;

  const cards = [
    {
      title: 'Your Wardrobe',
      icon: <WardrobeIcon style="absolute right-3 fill-richGreen  stroke-translate  -bottom-6 w-[95px] h-[95px]" />,
      link: '/wardrobe',
    },
    {
      title: 'Register Peace',
      icon: <RegisterIcon style="fill-richGreen  absolute -bottom-6 right-2 w-[105px] h-[105px]" />,
      link: '/registerPiece',
    },
    {
      title: 'Dendo Outfit',
      icon: <DendoOutfitIcon style="absolute -bottom-7 right-2 fill-richGreen w-[105px] h-[105px]" />,
      link: `/dendoOutfit/${userId}`,
    },
    {
      title: 'Suggestion',
      icon: <SuggestionIcon style="stroke-richGreen stroke-[1px] absolute -bottom-6 right-2 w-[105px] h-[105px]" />,
      link: '/wishList',
    },
  ];

  return (
    <MainLayout title="DashBoard">
      <section className="flex flex-col h-full w-[99%] gap-6">
        <div className="h-[35%] flex gap-6 justify-between font-bold">
          {cards.map((card) => (
            <DashboardCard key={card.title} title={card.title} link={card.link}>
              {card.icon}
            </DashboardCard>
          ))}
        </div>
        <div className="h-[65%] w-full flex gap-6 ">
          <div className="h-full w-1/2  flex flex-col  gap-6">
            <div className="h-1/2 w-full">
              <div className="w-full h-full border-2 border-lightGreen rounded-md flex py-md  bg-white ">
                <h2
                  className={` text-lg  text-center h-full items-center flex justify-center bg-white border-r border-lightGreen font-extraBold px-lg  w-[150px] min-w-[150px] `}
                >
                  <span>
                    Today&apos;s <br /> Weather
                  </span>
                </h2>
                <WeatherBox weatherData={weatherData} />
              </div>
            </div>
            <div className="h-1/2 w-full">
              <DashboardWIshList />
            </div>
          </div>
          <div className="h-full w-1/2   bg-white p-xl rounded-md flex flex-col gap-1 justify-center border-2 border-lightGreen">
            <h2 className={` text-xl flex items-center justify-center  h-[10%] font-extraBold`}>
              Your Wardrobe Capacity
            </h2>
            <div className="h-[90%] flex items-center justify-center ">
              <Charts />
            </div>
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
