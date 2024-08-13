export type WeatherDescription = {
  description: string
}

export type WeatherData = {
  weatherData: {
    temp: number
    feelsLike: number
    weatherDescription: string
    minTemp: number
    maxTemp: number
  }[]
}
