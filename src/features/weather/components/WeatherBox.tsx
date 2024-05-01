import React from 'react';

import { WeatherIcon } from '../icons/Svgs';
import { WeatherData } from '../types/weatherType';

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <div className="w-full h-full shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] rounded-lg flex items-center justify-center bg-gray py-md px-sm xs:py-md">
      {weatherData ? (
        <div className="w-full flex flex-col xs:flex-row xs:justify-center items-center xs:items-start xs:px-xl xs:gap-lg gap-sm">
          <div className="flex xs:flex-col gap-md xs:gap-xs justify-center items-center text-xl">
            <WeatherIcon description={weatherData.weatherDescription} />
            <span className="max-w-[80px] text-sm text-center mb-1">{weatherData.weatherDescription}</span>
          </div>
          <div className="flex xs:flex-col gap-md xs:gap-sm items-center justify-center">
            <div className="xs:text-2xl text-xl font-boldest xs:ml-1 -mb-1 leading-[28px]">
              {weatherData.currentTemp}
              <sup className="text-base">°C</sup>
            </div>
            <div className="flex xs:flex-col items-center">
              <div className="text-center text-sm xs:mt-1 xs:flex hidden">Feels: {weatherData.feelsLike}</div>
              <div className="flex flex-col xs:flex-row justify-center gap-1 xs:gap-2 text-sm">
                <div>H: {weatherData.maxTemp}</div>
                <div>L: {weatherData.minTemp}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">No weather data</div>
      )}
    </div>
  );
};

export default WeatherBox;
