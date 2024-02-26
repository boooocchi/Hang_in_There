import React from 'react';

import { WeatherIcon } from '../icons/Svgs';
import { WeatherData } from '../types/weatherType';

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <>
      {weatherData ? (
        <div className="w-full py-md px-xl flex justify-center items-center  bg-white gap-2">
          <div className="flex flex-col items-center justify-center w-1/2">
            <div className="text-2xl font-bold ml-2 -mb-1">
              {weatherData.currentTemp}
              <sup className="text-base ">°C</sup>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-xs mt-1">Feels: {weatherData.feelsLike}</div>
              <div className="flex  justify-center gap-2 text-xs">
                <div>H: {weatherData.maxTemp}</div>
                <div>L: {weatherData.minTemp}</div>
              </div>
            </div>
          </div>
          <div className="text-2xl text-richGreen">|</div>
          <div className="flex flex-col w-1/2 justify-center items-center text-xl ">
            <WeatherIcon description={weatherData.weatherDescription} />
            <span className="text-base">{weatherData.weatherDescription}</span>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">No weather data</div>
      )}
    </>
  );
};

export default WeatherBox;
