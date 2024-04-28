import React from 'react';

import { WeatherIcon } from '../icons/Svgs';
import { WeatherData } from '../types/weatherType';

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <div className="w-full h-full shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] rounded-lg flex items-center justify-center bg-gray">
      {weatherData ? (
        <div className="w-full flex justify-center items-start px-xl gap-lg">
          <div className="flex flex-col  justify-center items-center text-xl ">
            <WeatherIcon description={weatherData.weatherDescription} />
            <span className="text-sm text-center mb-1">{weatherData.weatherDescription}</span>
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
    </div>
  );
};

export default WeatherBox;
