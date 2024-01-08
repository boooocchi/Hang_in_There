export type WeatherDescription = {
  description: string;
};

export type WeatherData = {
  weatherData: {
    currentTemp: number;
    feelsLike: number;
    weatherDescription: string;
    minTemp: number;
    maxTemp: number;
  };
};
