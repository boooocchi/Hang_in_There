import React from 'react';

import { subFont } from '../../../constants/FontFamily';
import { WeatherIcon } from '../icons/Svgs';
import { WeatherData } from '../types/weatherType';

const WeatherBox = ({ weatherData }: WeatherData) => {
  return (
    <>
      {weatherData ? (
        <div className={`w-full p-md flex justify-center items-center  ${subFont.className}`}>
          <div className="flex flex-col items-center justify-center w-1/2 gap-1">
            <div className="text-3xl font-bold ml-3 leading-[48px] ">
              {weatherData.currentTemp}
              <sup className="text-lg ">°C</sup>
            </div>
            <div className="flex flex-col">
              <div>Feels: {weatherData.feelsLike}</div>
              <div className="flex -mt-1 gap-1">
                <div>H:{weatherData.maxTemp}</div>
                <div>L:{weatherData.minTemp}</div>
              </div>
            </div>
          </div>
          <div className="text-4xl font-extralight text-richGreen">|</div>
          <div className="flex flex-col w-1/2 justify-center items-center text-xl gap-1">
            <WeatherIcon description={weatherData.weatherDescription} />
            <span className="text-base">{weatherData.weatherDescription}</span>
          </div>
        </div>
      ) : (
        <div>No weather data</div>
      )}
    </>
  );
};

export default WeatherBox;
