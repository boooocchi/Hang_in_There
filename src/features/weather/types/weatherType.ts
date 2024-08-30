export type WeatherDescription = {
  description: string
  size?: boolean
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
