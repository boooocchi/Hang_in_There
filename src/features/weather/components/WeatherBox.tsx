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
  const today = new Date()
  const datm = new Date(today)
  datm.setDate(today.getDate() + 2)

  const formattedDate = `${datm.getMonth() + 1}/${datm.getDate()}`
  const date = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : formattedDate

  return (
    <div
      className={`flex flex-col items-center justify-center xs:items-start w-full xs:w-1/3 h-full ${index === 2 && 'max-xs:hidden'}`}
      key={index}
    >
      <h1 className="w-full h-[30px] max-xs:mb-1 flex items-center justify-center text-md font-boldest uppercase">
        {date}
      </h1>
      <div className="w-full flex-grow flex flex-col xs:justify-center items-center">
        <div className="flex max-xs:flex-col xs:gap-xs xs:justify-center items-center text-xl w-full xs:w-3/5">
          <div className="w-full flex items-center justify-center xs:w-1/2">
            <WeatherIcon description={data.weatherDescription} />
          </div>
          <div className="xs:text-xl text-lg w-full font-boldest  xs:w-1/2 flex items-center justify-center mb-[5px]">
            {data.temp}
            <span className="xs:text-base text-sm">°C</span>
          </div>
        </div>
        <div className="w-2/3 xs:w-3/5 flex justify-center gap-xs items-center">
          <div className="text-sm whitespace-normal max-xs:w-3/5 w-1/2 text-center">{data.weatherDescription}</div>
          <div className="flex w-1/2 xs:flex-col items-center max-xs:w-2/5">
            <div className="text-center text-sm xs:flex hidden max-xs:w-full">Feels: {data.feelsLike}</div>
            <div className="flex flex-col xs:flex-row justify-center gap-2 text-sm max-xs:w-full">
              <div>H: {data.maxTemp}</div>
              <div>L: {data.minTemp}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <div className="w-full h-full shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] rounded-lg flex flex-col  bg-gray p-[15px] xs:p-md">
      <h2 className="text-base flex gap-sm font-bolder h-[30px] items-center">
        <span className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md">
          <SunIcon style="fill-white w-7 h-7"></SunIcon>
        </span>
        Weather
      </h2>
      <div className="w-full h-full">
        {weatherData.length > 2 ? (
          <div className="w-full h-full flex  items-center justify-center ">
            {weatherData.map((data, index) => (
              <>
                <WeatherCard data={data} index={index} key={index} />
                {index !== weatherData.length - 1 && (
                  <div
                    className={`h-full w-[1px] bg-black opacity-70 ${index == weatherData.length - 2 && 'hidden xs:flex'}`}
                  ></div>
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">No weather data</div>
        )}
      </div>
    </div>
  )
}

export default WeatherBox
