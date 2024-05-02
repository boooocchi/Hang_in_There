import React from 'react';

import { WeatherIcon } from '../icons/Svgs';
import { WeatherData } from '../types/weatherType';

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <div className="w-full h-full shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] rounded-lg flex items-center justify-center bg-gray py-md max-xs:pl-md max-xs:pr-sm">
      {weatherData ? (
        <div className="flex flex-col gap-sm xs:flex-row  items-center justify-center xs:items-start w-full">
          <div className="xs:w-1/3 w-full flex xs:flex-col gap-xs xs:gap-xs justify-center items-center text-xl ">
            <div className="xs:h-[50px] flex items-center justify-center  max-xs:w-1/2">
              <WeatherIcon description={weatherData.weatherDescription} />
            </div>
            <span className="text-sm mb-1 whitespace-normal max-xs:w-1/2 max-w-[80px] xs:text-center">
              {weatherData.weatherDescription}
            </span>
          </div>
          <div className="xs:w-1/3 w-full flex xs:flex-col h-full gap-xs items-center justify-center">
            <div className="xs:text-2xl text-xl font-boldest ml-2 xs:h-[50px] max-xs:w-1/2 flex items-center justify-center leading-[1.3]">
              {weatherData.currentTemp}
              <span className="xs:text-base text-sm">°C</span>
            </div>
            <div className="flex xs:flex-col items-center max-xs:w-1/2">
              <div className="text-center text-sm  xs:flex hidden max-xs:w-full">Feels: {weatherData.feelsLike}</div>
              <div className="flex flex-col xs:flex-row justify-center gap-1 xs:gap-2 text-sm max-xs:w-full">
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
