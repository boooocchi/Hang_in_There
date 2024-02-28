import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import MainLayout from '@/components/layouts/layout/MainLayout';
import { titleFont } from '@/constants/FontFamily';
import Charts from '@/features/progressPieChart/components/Charts';
import WeatherBox from '@/features/weather/components/WeatherBox';
import { WeatherData } from '@/features/weather/types/weatherType';
import { WISH_LIST_QUERY } from '@/features/wishList/components/WishListForm';
import { useAuth } from '@/hooks/useAuth';

import '@radix-ui/themes/styles.css';
import { mainFont } from './_app';

export default function Home({ weatherData }: WeatherData) {
  const { status, session } = useAuth();
  const userid = session?.user?.id;
  const { data: wishListData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId: userid,
    },
  });

  if (status === 'loading' || status === 'unauthenticated') return <Loading size="large" />;

  return (
    <MainLayout title="DashBoard">
      <section className="flex flex-col h-full w-[99%] gap-6">
        <div className="h-[35%] flex gap-6 justify-between font-bold">
          <div className="h-full w-full  group rounded-md shadow-[3px_3px_5px_1px_#aaa] bg-lightGreen relative overflow-hidden p-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="clothes"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              width="105"
              height="105"
              className="stroke-richGreen stroke-[1px] absolute -bottom-7 right-2"
            >
              <path d="m14.43 3-.29.49a2.5 2.5 0 0 1-4.29 0L9.57 3H6.76L2 5.38V11h4v10h12V11h4V5.38L17.24 3Z"></path>
            </svg>
            <h2
              className={`text-xl  text-richGreen relative   transition-all duration-300 group-hover:opacity-100 ease-in  w-full font-extraBold  ${titleFont.className}`}
            >
              <p>Your Wardrobe</p>
              <Link
                href="/wardrobe"
                className={`bg-accentOrange text-white rounded-md px-md  text-center text-sm mt-3 py-[7px] inline-block font-boldest ${mainFont.className}`}
              >
                View
              </Link>
            </h2>
          </div>
          <div className="h-full  w-full  overflow-hidden group rounded-md shadow-[3px_3px_5px_1px_#aaa] bg-lightGreen relative p-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="120 120 500 500"
              id="hanger"
              className=" fill-richGreen  absolute -bottom-6 right-2"
              width="105"
              height="105"
            >
              <path d="M596.36,494.22,399.45,327.89a38,38,0,0,0-12.75-7c1.92-19.71,9.95-37.3,22.74-49.22a50.51,50.51,0,1,0-84.95-36.95,11.23,11.23,0,0,0,22.45,0,28.08,28.08,0,1,1,47.19,20.53c-17.21,16-27.81,39.5-29.91,65.4a37.67,37.67,0,0,0-13.67,7.28L153.64,494.22c-13.21,11.17-17.83,29.09-11.76,45.67,5.76,15.75,20,25.93,36.22,25.93H571.9c16.24,0,30.46-10.18,36.22-25.93C614.19,523.31,609.57,505.39,596.36,494.22ZM587,532.17c-1,2.62-4.89,11.2-15.14,11.2H178.1c-10.25,0-14.18-8.58-15.14-11.2-2.22-6.06-2-14.71,5.18-20.8L365,345A15.19,15.19,0,0,1,385,345l196.9,166.33C589.07,517.46,589.26,526.11,587,532.17Z"></path>
            </svg>
            <h2
              className={`relative z-5 text-xl  text-richGreen  transition-all duration-300 group-hover:opacity-100 ease-in font-extraBold bg-accent   ${titleFont.className}`}
            >
              <h2
                className={`text-xl  text-richGreen relative   transition-all duration-300 group-hover:opacity-100 ease-in  w-2/3 font-extraBold  ${titleFont.className}`}
              >
                <p>Register Peace</p>
                <Link
                  href="/registerPiece"
                  className={`bg-accentOrange text-white font-boldest rounded-md px-md  text-center text-sm mt-3 py-[7px] inline-block   ${mainFont.className}`}
                >
                  Register
                </Link>
              </h2>
            </h2>
          </div>
          <div className="h-full  w-full  shadow-[3px_3px_5px_1px_#aaa]  relative overflow-hidden group rounded-md bg-lightGreen p-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 108.99 122.88"
              width="95"
              height="95"
              className="absolute -bottom-7 right-2 fill-richGreen"
            >
              <g>
                <path d="M25.77,4.5l27.95,30.89L83.18,4.48c-0.42-0.26-0.91-0.42-1.44-0.42H61.61l-35.08,0.1C26.26,4.23,26,4.35,25.77,4.5 L25.77,4.5z M56.96,42.33v76.05h45.05c0.68,0,1.3-0.28,1.75-0.73c0.45-0.45,0.73-1.07,0.73-1.75V28.76c0-0.68-0.28-1.3-0.73-1.75 c-0.45-0.45-1.07-0.73-1.75-0.73H88.52c0.01,10.05-0.18,18.42-1.29,22.68c-1.47,5.66-6.3,3.54-10.14,1.91L56.96,42.33L56.96,42.33z M51.87,118.38V41.83L25.8,52.02c-2.38,0.93-4.38,0.14-4.69-6.16c-0.23-4.68-0.45-11.53-0.55-19.6c-0.11,0.02-0.22,0.02-0.33,0.02 H6.98c-0.68,0-1.3,0.28-1.75,0.73c-0.45,0.45-0.73,1.07-0.73,1.75v87.14c0,0.68,0.28,1.3,0.73,1.75c0.45,0.45,1.07,0.73,1.75,0.73 H51.87L51.87,118.38z M88.5,21.78h13.51c1.92,0,3.67,0.79,4.93,2.05c1.26,1.26,2.05,3.01,2.05,4.93v87.14 c0,1.92-0.78,3.67-2.05,4.93c-1.26,1.26-3.01,2.05-4.93,2.05H6.98c-1.92,0-3.67-0.78-4.93-2.05C0.78,119.57,0,117.82,0,115.9V28.76 c0-1.92,0.78-3.67,2.05-4.93c1.26-1.26,3.01-2.05,4.93-2.05h13.26c0.1,0,0.19,0.01,0.28,0.02c-0.03-4.74-0.02-9.82,0.05-15.06 c0-1.29,0.36-2.49,0.99-3.51c0.42-1.76,2-3.07,3.89-3.07l0.65,0c0.37-0.06,0.75-0.1,1.14-0.1V0.04h0.01h40.34L83.63,0v0 c0.96,0,1.93,0.34,2.7,1.05c0.73,0.67,1.15,1.53,1.27,2.44c0.53,0.96,0.84,2.07,0.84,3.25h0.02v0.01h-0.02 C88.43,11.88,88.47,16.97,88.5,21.78L88.5,21.78z M50.05,37.33L24.56,9.05v36.69c0,1.85,1.82,1.85,3.98,1.08 C34.77,44.61,46.9,38.79,50.05,37.33L50.05,37.33z M84.43,9.03L57.37,37.32l24.38,11.11c1.33,0.64,2.69-1.21,2.69-2.69V9.03 L84.43,9.03z M20.55,6.74L20.55,6.74L20.55,6.74z" />
              </g>
            </svg>
            <h2
              className={`text-xl  text-richGreen relative   transition-all duration-300 group-hover:opacity-100 ease-in  w-full font-extraBold  ${titleFont.className} whitespace-nowrap `}
            >
              <p>Dendo Outfit</p>
              <Link
                href={`/dendoOutfit/${userid}`}
                className={`bg-accentOrange font-boldest rounded-md   text-center text-sm mt-3 py-[7px] inline-block text-white px-md ${mainFont.className}`}
              >
                View
              </Link>
            </h2>
          </div>
          <div className="h-full  w-full shadow-[3px_3px_5px_1px_#aaa]   relative overflow-hidden group rounded-md   bg-lightGreen p-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              id="mirror"
              className="absolute right-0 fill-richGreen  stroke-translate  -bottom-8 "
              width="105"
              height="105"
              transform="scale(1.1,1)"
            >
              <path d="M29,41.752V56H24a3,3,0,0,0-3,3v2a1,1,0,0,0,1,1H42a1,1,0,0,0,1-1V59a3,3,0,0,0-3-3H35V41.752C44.61,40.155,52,31.009,52,20V18a1,1,0,0,0-2,0v1H47.955C47.49,9.541,40.522,2,32,2S16.51,9.541,16.045,19H14V18a1,1,0,0,0-2,0v2C12,31.009,19.39,40.155,29,41.752ZM41,59v1H23V59a1,1,0,0,1,1-1H40A1,1,0,0,1,41,59ZM33,42V56H31V42Zm-1-2c-9.621,0-17.481-8.438-17.954-19h2C16.51,30.459,23.478,38,32,38s15.49-7.541,15.955-17h2C49.481,31.562,41.621,40,32,40ZM32,4c7.72,0,14,7.178,14,16S39.72,36,32,36,18,28.822,18,20,24.28,4,32,4Z"></path>
            </svg>
            <h2
              className={`text-xl  text-richGreen relative   transition-all duration-300 group-hover:opacity-100 ease-in  w-2/3 font-extraBold  ${titleFont.className}`}
            >
              <p>Verdic on Outfit</p>
              <Link
                href="/dendoOutfit"
                className={`bg-accentOrange font-boldest rounded-md  text-white  text-center text-sm mt-3 py-[7px] inline-block  px-md ${mainFont.className}`}
              >
                Look
              </Link>
            </h2>
          </div>
        </div>
        <div className="h-[65%] w-full flex gap-6 ">
          <div className="h-full w-1/2  flex flex-col gap-6">
            <div className="w-full h-1/2 border-1 border-lightGreen rounded-md flex py-md  bg-white">
              <h2
                className={` text-lg  text-center h-full items-center flex justify-center text-richGreen bg-white border-r border-lightGreen font-extraBold px-lg  w-[150px] min-w-[150px] `}
              >
                <span>
                  Today&apos;s <br /> Weather
                </span>
              </h2>
              <WeatherBox weatherData={weatherData} />
            </div>
            <div className="w-full h-[50%] rounded-md   flex gap-6 border-1 border-lightGreen py-md bg-white">
              <div className="w-full h-full flex  ">
                <div className="flex flex-col gap-2 items-center justify-center border-r border-r-lightGreen w-[125px] min-w-[150px]  px-lg">
                  <h2 className=" text-lg leading-[16px] text-center  items-center flex justify-center text-richGreen bg-white  font-extraBold  ">
                    <span className=" whitespace-nowrap">Wish List</span>
                  </h2>
                  <Link
                    href="/wishList"
                    className={`bg-accentOrange font-boldest rounded-md  text-white w-[70px] text-center text-sm px-sm  py-[3px] inline-block    ${mainFont.className}`}
                  >
                    view
                  </Link>
                </div>
                {wishListData?.wishList.length > 0 && (
                  <div className="h-full  overflow-y-scroll  bg-white w-full px-2xl">
                    <ul className="h-full w-full  ">
                      {wishListData?.wishList.map((item: { itemName: string; id: string }) => (
                        <li
                          key={item.id}
                          className="border-b border-lightGreen h-9 w-full flex items-center justify-start gap-3 text-richGreen"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-accentOrange border-lightGreen
                          focus:ring-0 ring-0 rounded-sm form-checkbox"
                          />

                          <span className="w-full truncate">{item.itemName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-full w-1/2   bg-white p-xl rounded-md flex flex-col gap-1 justify-center border-1 border-lightGreen">
            <h2 className={` text-xl flex items-center justify-center  text-richGreen h-[10%] font-extraBold`}>
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
