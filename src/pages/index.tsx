import React from 'react'

import DashboardCard from '@/components/elements/card/DashboardCard'
import MainLayout from '@/components/layouts/layout/MainLayout'
import { WardrobeIcon, RegisterIcon, DendoOutfitIcon, SuggestionIcon } from '@/constants/icons/icons'
import Charts from '@/features/progressPieChart/components/Charts'
import WeatherBox from '@/features/weather/components/WeatherBox'
import { WeatherData } from '@/features/weather/types/weatherType'
import DashboardWIshList from '@/features/wishList/components/DashboardWIshList'
import { useAuth } from '@/hooks/useAuth'

import '@radix-ui/themes/styles.css'

export default function Home({ weatherData }: WeatherData) {
  const { userId } = useAuth()

  const cards = [
    {
      title: 'Your Wardrobe',
      icon: <WardrobeIcon style=" fill-gray" />,
      link: `/wardrobe/${userId}`
    },
    {
      title: 'Register Piece',
      icon: <RegisterIcon style="fill-gray" />,
      link: '/registerPiece'
    },
    {
      title: 'Dendo Outfit',
      icon: <DendoOutfitIcon style="fill-gray " />,
      link: `/dendoOutfitGallery/${userId}`
    },
    {
      title: 'Suggestion',
      icon: <SuggestionIcon style="stroke-gray stroke-[1px]" />,
      link: '/suggestion'
    }
  ]

  return (
    <MainLayout>
      <section className="flex flex-col h-full xs:w-full w-full gap-md max-xs:items-center">
        <div className="h-[35%] max-xs:min-h-[220px] flex xs:gap-md gap-sm w-full font-bold">
          <div className="w-full relative">
            <WeatherBox weatherData={weatherData} />
          </div>
        </div>
        <div className="xs:flex xs:gap-md gap-sm grid grid-cols-2 w-full">
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
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=vancouver,BC,CA&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    )

    const locations = await res.json()
    const { lat, lon } = locations[0]

    if (lat && lon) {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      )
      const weatherData = await weatherResponse.json()

      const weatherDescription = weatherData.daily[0].weather[0].description
      const maxTemp = Math.round(weatherData.daily[0].temp.max * 10) / 10
      const minTemp = Math.round(weatherData.daily[0].temp.min * 10) / 10
      const temp = Math.round(weatherData.current.temp * 10) / 10
      const feelsLike = Math.round(weatherData.current.feels_like * 10) / 10

      const tmrwWeatherDescription = weatherData.daily[1].weather[0].description
      const tmrwMaxTemp = Math.round(weatherData.daily[1].temp.max * 10) / 10
      const tmrwMinTemp = Math.round(weatherData.daily[1].temp.min * 10) / 10
      const tmrwTemp = Math.round(weatherData.daily[1].temp.day * 10) / 10
      const tmrwFeelsLike = Math.round(weatherData.daily[1].feels_like.day * 10) / 10

      const datmWeatherDescription = weatherData.daily[2].weather[0].description
      const datmTemp = Math.round(weatherData.daily[2].temp.day * 10) / 10
      const datmMaxTemp = Math.round(weatherData.daily[1].temp.max * 10) / 10
      const datmMinTemp = Math.round(weatherData.daily[1].temp.min * 10) / 10

      const in4daysWeatherDescription = weatherData.daily[3].weather[0].description
      const in4daysTemp = Math.round(weatherData.daily[3].temp.day * 10) / 10
      const in4daysMaxTemp = Math.round(weatherData.daily[1].temp.max * 10) / 10
      const in4daysMinTemp = Math.round(weatherData.daily[1].temp.min * 10) / 10

      return {
        props: {
          weatherData: [
            { weatherDescription, maxTemp, minTemp, temp, feelsLike },
            {
              weatherDescription: tmrwWeatherDescription,
              maxTemp: tmrwMaxTemp,
              minTemp: tmrwMinTemp,
              temp: tmrwTemp,
              feelsLike: tmrwFeelsLike
            },
            {
              weatherDescription: datmWeatherDescription,
              temp: datmTemp,
              maxTemp: datmMaxTemp,
              minTemp: datmMinTemp
            },
            {
              weatherDescription: in4daysWeatherDescription,
              temp: in4daysTemp,
              maxTemp: in4daysMaxTemp,
              minTemp: in4daysMinTemp
            }
          ],
          revalidate: 3600
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  return { props: { weatherData: null } }
}
