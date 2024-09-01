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
      className={`flex flex-col items-center xs:px-lg xs:gap-2 gap-1 xs:items-start w-full xs:w-1/2 h-full ${index === 1 && 'max-xs:hidden'}`}
      key={index}
    >
      <h1 className="w-full max-xs:h-[25px] flex items-start justify-center text-md font-boldest uppercase">{date}</h1>
      <div className="flex flex-grow gap-1 w-full items-center justify-center ml-2 max-xs:flex-col-reverse">
        <div className="w-[100px] flex flex-col items-center gap-1 justify-center">
          <div className="text-xl w-full font-boldest  xs:w-1/2 flex items-center justify-center">
            {data.temp.toFixed(1)}
            <span className="xs:text-base text-sm">°C</span>
          </div>
          <div className="flex items-center justify-center text-sm xs:flex bg-darkGray rounded-lg py-[2px] px-2">
            feels {data.feelsLike}
            <span className="text-xs">°C</span>
          </div>
          <div className="flex flex-col xs:flex-row items-center justify-center xs:gap-2 text-sm bg-darkGray rounded-lg py-[2px] px-2">
            <div>
              {data.minTemp}
              <span className="text-xs">°C</span> / {data.maxTemp}
              <span className="text-xs">°C</span>
            </div>
          </div>
        </div>
        <div className="w-[100px] flex flex-col items-center justify-center h-full text-center xs:gap-1">
          <WeatherIcon description={data.weatherDescription} size />
          <div className="text-xs whitespace-normal w-full flex justify-center leading-snug">
            {data.weatherDescription}
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
    <div className={`flex w-full xs:h-1/2 h-1/3 xs:gap-3 xs:justify-center max-xs:gap-2 ${index === 1 && 'xs:hidden'}`}>
      <div className="max-xs:text-xs flex w-[30px] h-[30px] justify-center items-start text-md font-boldest uppercase">
        {formattedDate}
      </div>
      <div className="flex gap-2">
        <div className="flex items-center h-full w-[45px] justify-center">
          <WeatherIcon description={data.weatherDescription} size={false} />
        </div>
      </div>
      <div className="xs:text-lg text-lg font-boldest flex items-center justify-center h-full">
        {data.temp.toFixed(1)}
        <span className="xs:text-base text-sm">°C</span>
      </div>
      <div className="flex h-full items-center text-sm max-xs:hidden xs:min-w-[65px]">
        <div className="flex-col justify-center gap-2">
          <div className="rounded-lg bg-darkGray px-1 py-[2px]">
            {data.minTemp.toFixed(0)}
            <span className="text-xs">°C</span> / {data.maxTemp.toFixed(0)}
            <span className="text-xs">°C</span>
          </div>
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
            <div className="xs:w-2/3 w-1/2 h-full flex  items-center justify-center">
              {weatherData.map((data, index) => {
                if (index > 1) return
                return (
                  <>
                    <WeatherCard data={data} index={index} key={index} />
                    {index !== weatherData.length - 1 && (
                      <div
                        className={`h-full w-[1px] bg-black opacity-30 ${index == weatherData.length - 2 && 'hidden xs:flex'} ${index === 1 && 'max-xs:hidden'}`}
                      ></div>
                    )}
                  </>
                )
              })}
            </div>
            <div className="xs:w-1/3 w-1/2 flex-col h-full xs:pl-xl xs:pr-lg px-sm">
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
