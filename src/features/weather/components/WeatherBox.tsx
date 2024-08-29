import React from 'react'

import { SunIcon } from '../../../constants/icons/icons'
import { WeatherIcon } from '../icons/Svgs'
import { WeatherData } from '../types/weatherType'

const WeatherCard = ({
  data,
  index
}: {
  data: {
    temp: number
    feelsLike: number
    weatherDescription: string
    minTemp: number
    maxTemp: number
  }
  index: number
}) => {
  const date = index === 0 ? 'Today' : 'Tomorrow'

  return (
    <div
      className={`flex flex-col items-center xs:px-lg justify-between xs:items-start w-full xs:w-1/2 h-full ${index === 1 && 'max-xs:hidden'}`}
      key={index}
    >
      <h1 className="w-full h-[30px] max-xs:mb-1 flex items-center justify-start text-md font-boldest uppercase">
        {date}
      </h1>
      <div className="w-full px-sm flex-grow flex flex-col justify-center items-center">
        <div className="flex max-xs:1/2 max-xs:flex-col xs:gap-xs xs:justify-center items-center text-xl w-full xs:w-full">
          <div className="w-full flex items-center justify-center xs:w-1/2">
            <WeatherIcon description={data.weatherDescription} />
          </div>
          <div className="xs:text-xl text-lg w-full font-boldest  xs:w-1/2 flex items-center justify-center mb-sm">
            {data.temp.toFixed(1)}
            <span className="xs:text-base text-sm">°C</span>
          </div>
        </div>
        <div className="w-full flex justify-center gap-xs items-center max-xs:h-1/2">
          <div className="text-sm whitespace-normal w-1/2 text-center max-xs:hidden">{data.weatherDescription}</div>
          <div className="flex w-1/2 flex-col items-center xs:w-1/2 xs:min-w-[80px]">
            <div className="text-center text-sm xs:flex  max-xs:w-full">Feels: {data.feelsLike}</div>
            <div className="flex flex-col xs:flex-row items-center justify-center xs:gap-2 text-sm max-xs:w-full">
              <div>H: {data.maxTemp}</div>
              <div>L: {data.minTemp}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SmallWeatherCard = ({
  data,
  index
}: {
  data: {
    weatherDescription: string
    temp: number
    maxTemp: number
    minTemp: number
  }
  index: number
}) => {
  const today = new Date()
  const date = new Date(today)
  let formattedDate

  if (index === 1) {
    date.setDate(today.getDate() + 1)
    formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
  } else if (index === 2) {
    date.setDate(today.getDate() + 2)
    formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
  } else if (index === 3) {
    date.setDate(today.getDate() + 3)
    formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <div className={`flex w-full xs:h-1/2 h-1/3 xs:justify-between gap-2 ${index === 1 && 'xs:hidden'}`}>
      <div className="max-xs:text-xs flex w-[30px] h-[30px] justify-center items-center text-md font-boldest uppercase">
        {formattedDate}
      </div>
      <div className="flex gap-2">
        <div className="flex items-center h-full">
          <WeatherIcon description={data.weatherDescription} />
        </div>
        <div className="flex text-sm items-center justify-center h-full max-w-1/5 max-xs:hidden">
          {data.weatherDescription}
        </div>
      </div>
      <div className="xs:text-lg text-lg font-boldest flex items-center justify-center h-full">
        {data.temp.toFixed(1)}
        <span className="xs:text-base text-sm">°C</span>
      </div>
      <div className="flex h-full items-center text-sm max-xs:hidden">
        <div className="flex-col justify-center gap-2">
          <div>H: {data.maxTemp}</div>
          <div>L: {data.minTemp}</div>
        </div>
      </div>
    </div>
  )
}

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <div className="w-full xs:h-full h-[250px] shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] rounded-lg flex flex-col  bg-gray p-[15px] xs:p-md">
      <h2 className="text-base flex gap-sm font-bolder h-[30px] items-center mb-sm">
        <span className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md">
          <SunIcon style="fill-white w-7 h-7"></SunIcon>
        </span>
        Weather
      </h2>
      <div className="w-full h-full flex">
        {weatherData.length > 2 ? (
          <>
            <div className="xs:w-3/5 w-1/2 h-full flex  items-center justify-center">
              {weatherData.map((data, index) => {
                if (index > 1) return
                return (
                  <>
                    <WeatherCard data={data} index={index} key={index} />
                    {index !== weatherData.length - 1 && (
                      <div
                        className={`h-full w-[1px] bg-black opacity-70 ${index == weatherData.length - 2 && 'hidden xs:flex'} ${index === 1 && 'max-xs:hidden'}`}
                      ></div>
                    )}
                  </>
                )
              })}
            </div>
            <div className="xs:w-2/5 w-1/2 flex-col h-full xs:pl-xl xs:pr-lg px-sm">
              {weatherData.map((data, index) => {
                if (index < 1) return
                return <SmallWeatherCard data={data} index={index} key={index} />
              })}
            </div>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center">No weather data</div>
        )}
      </div>
    </div>
  )
}

export default WeatherBox
