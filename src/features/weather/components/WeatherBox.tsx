import React from 'react';

import { WeatherIcon } from '../icons/Svgs';
import { WeatherData } from '../types/weatherType';

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <>
      {weatherData ? (
        <div className="w-full flex justify-center items-start px-xl gap-lg">
          <div className="flex flex-col  justify-center items-center text-xl ">
            <span className="text-sm text-center mb-1">{weatherData.weatherDescription}</span>
            <WeatherIcon description={weatherData.weatherDescription} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold ml-1 -mb-1 leading-[28px]">
              {weatherData.currentTemp}
              <sup className="text-base">°C</sup>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-sm mt-1">Feels: {weatherData.feelsLike}</div>
              <div className="flex  justify-center  gap-2 text-sm">
                <div>H: {weatherData.maxTemp}</div>
                <div>L: {weatherData.minTemp}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">No weather data</div>
      )}
    </>
  );
};

export default WeatherBox;
