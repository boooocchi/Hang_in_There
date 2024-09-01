import React from 'react'

import { WeatherDescription } from '../types/weatherType'
export const WeatherIcon = ({ description, size }: WeatherDescription) => {
  if (description.includes('clouds')) description = 'clouds'
  if (
    description.includes('mist') ||
    description.includes('smoke') ||
    description.includes('haze') ||
    description.includes('sand') ||
    description.includes('fog') ||
    description.includes('dust') ||
    description.includes('ash') ||
    description.includes('squall') ||
    description.includes('tornado')
  )
    description = 'mist'
  if (description.includes('rain') || description.includes('drizzle')) description = 'rain'
  if (description.includes('snow')) description = 'snow'
  if (description.includes('thunderstorm')) description = 'thunderstorm'
  switch (description) {
    case 'clear sky':
      return <Sunny size={size} />
    case 'few clouds':
      return <FewClouds size={size} />
    case 'clouds':
      return <Cloudy size={size} />
    case 'rain':
      return <Rainy size={size} />
    case 'snow':
      return <Snowy size={size} />
    case 'thunderstorm':
      return <ThunderStorm size={size} />
    case 'mist':
      return <Misty size={size} />
    default:
      return <div>cant get the data</div>
  }
}

const Sunny = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fill-accentOrange stroke-[0.5px] stroke-accentOrange ${size ? 'xs:w-[70px] w-[53px]' : 'xs:w-[48px] w-[35px]'}`}
    viewBox="0 12 100 80"
    strokeWidth="0.5"
    id="sun"
    fill="none"
  >
    <path d="M50.5 34C41.4 34 34 41.4 34 50.5S41.4 67 50.5 67 67 59.6 67 50.5 59.6 34 50.5 34zm0 28.2c-6.4 0-11.7-5.2-11.7-11.7S44 38.8 50.5 38.8 62.2 44 62.2 50.5s-5.3 11.7-11.7 11.7zM50.5 28.8c1.3 0 2.4-1.1 2.4-2.4v-7.6c0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4v7.6c0 1.3 1.1 2.4 2.4 2.4zM50.5 72.2c-1.3 0-2.4 1.1-2.4 2.4v7.6c0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4v-7.6c0-1.3-1.1-2.4-2.4-2.4zM67.5 35.9c.6 0 1.2-.2 1.7-.7l5.4-5.4c.9-.9.9-2.5 0-3.4s-2.5-.9-3.4 0l-5.4 5.4c-.9.9-.9 2.5 0 3.4.5.4 1.1.7 1.7.7zM31.8 65.8l-5.4 5.4c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l5.4-5.4c.9-.9.9-2.5 0-3.4s-2.5-.9-3.4 0zM82.2 48.1h-7.6c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h7.6c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4zM28.8 50.5c0-1.3-1.1-2.4-2.4-2.4h-7.6c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h7.6c1.3 0 2.4-1.1 2.4-2.4zM69.2 65.8c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l5.4 5.4c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-5.4-5.4zM31.8 35.2c.5.5 1.1.7 1.7.7s1.2-.2 1.7-.7c.9-.9.9-2.5 0-3.4l-5.4-5.4c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l5.4 5.4z"></path>
  </svg>
)

const Cloudy = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2"
    viewBox="8 12 115 105"
    id="cloud"
    className={`${size ? 'xs:w-[53px] w-[45px]' : 'xs:w-[36px] w-[30px]'}`}
  >
    <path
      className="fill-accentOrange stroke-accentOrange "
      d="M90.6 45c-2.6 0-5 .3-7.4.9-1.8-11.9-11.9-21-24.3-21-13.6 0-24.6 11-24.6 24.6 0 1.8.2 3.6.6 5.4h-.4C21 54.9 10 65.9 10 79.4s10.9 24.4 24.4 24.4h56.1c16.2 0 29.4-13.2 29.4-29.4C120 58.2 106.8 45 90.6 45zm0 54.8H34.5C23.2 99.8 14 90.6 14 79.4 14 68.1 23.1 59 34.4 59h.4l5.1.1-1.1-5c-.3-1.5-.5-3-.5-4.5 0-11.4 9.2-20.6 20.6-20.6 10.1 0 18.9 7.5 20.3 17.6l.1.9c-5 2.3-9.3 5.9-12.4 10.4l3.3 2.3C74.8 53.7 82.1 49 90.6 49c14 0 25.4 11.4 25.4 25.4 0 14-11.4 25.4-25.4 25.4z"
    ></path>
  </svg>
)

const Rainy = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="3"
    className={`fill-accentOrange stroke-accentOrange stroke-[0.5px] ${size ? 'xs:w-[55px] w-[48px]' : 'xs:w-[40px] w-[35px]'}`}
    viewBox="0 0 64 58"
    id="rain"
  >
    <path d="M58.18 31.32a12.37 12.37 0 0 0 .93-4.59 12 12 0 0 0-12-12h-.63a9 9 0 0 0-8.6-6.64 8.7 8.7 0 0 0-6.93 3.3 16.4 16.4 0 0 0-3.49-.34c-.53 0-1.05 0-1.56.07a16.32 16.32 0 0 0-10.37 5l-.09.1c-.24.26-.47.52-.69.79s-.24.29-.35.44-.26.35-.39.53-.37.54-.54.82l-.15.25a15.79 15.79 0 0 0-2 5.58s0 .07 0 .11c0 .23-.08.45-.11.68a9.23 9.23 0 0 0 1 18.39h42.03a6.93 6.93 0 0 0 3.94-12.51zm-4 10.51h-42a7.23 7.23 0 0 1-.09-14.45H13l.06-.9a14.41 14.41 0 0 1 28.78 1 14.72 14.72 0 0 1-.66 4.32 1 1 0 0 0 .65 1.2 1 1 0 0 0 .29.05 1 1 0 0 0 1-.71 16.68 16.68 0 0 0 .75-4.91 17.15 17.15 0 0 0-.19-2.4 8.8 8.8 0 0 1 3 .81 8 8 0 0 1 3.68 10.63 1 1 0 0 0 .47 1.34 1.07 1.07 0 0 0 .43.09 1 1 0 0 0 .9-.57 10 10 0 0 0-4.63-13.29 10.28 10.28 0 0 0-4.3-1A16.45 16.45 0 0 0 33 12.05a6.77 6.77 0 0 1 4.83-2A7 7 0 0 1 44.69 16l.17 1.08 1.06-.26a4.84 4.84 0 0 1 1.17-.09 10 10 0 0 1 10 10A10.68 10.68 0 0 1 56 31.28l-.39.86.83.45a4.93 4.93 0 0 1-2.25 9.24zM23.77 46.4a1 1 0 0 0-1.29.57l-1.54 4a1 1 0 0 0 .58 1.29.92.92 0 0 0 .36.07 1 1 0 0 0 .93-.65l1.54-4a1 1 0 0 0-.58-1.28zm18.59 0a1 1 0 0 0-1.29.57l-1.54 4a1 1 0 0 0 .58 1.29.91.91 0 0 0 .35.07 1 1 0 0 0 .94-.65l1.54-4a1 1 0 0 0-.58-1.28zm-8.66-.01a1 1 0 0 0-1.28.6l-2.72 7.58a1 1 0 0 0 .6 1.28 1 1 0 0 0 .34.06 1 1 0 0 0 .94-.66l2.72-7.58a1 1 0 0 0-.6-1.28z"></path>
  </svg>
)

const Snowy = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    id="snow"
    className={`${size ? 'xs:w-[70px] w-[50px]' : 'xs:w-[50px] w-[35px]'}`}
    viewBox="3 5 18 14"
    strokeWidth="0.1px"
  >
    <path
      fill="#E96C49"
      d="M13.955 17.073a.346.346 0 0 1-.216-.075l-1.764-1.384-1.709 1.381a.35.35 0 0 1-.567-.229l-.278-2.24-2.186-.226a.35.35 0 0 1-.239-.564l1.386-1.762-1.384-1.734a.349.349 0 0 1 .234-.566l2.216-.251.251-2.184a.35.35 0 0 1 .566-.234l1.709 1.355 1.766-1.384a.351.351 0 0 1 .564.236l.252 2.211 2.213.251a.349.349 0 0 1 .234.566l-1.384 1.734 1.386 1.762a.35.35 0 0 1-.235.564l-2.189.252-.276 2.215a.35.35 0 0 1-.35.306zm-1.982-2.256a.35.35 0 0 1 .216.075l1.496 1.174.233-1.875a.35.35 0 0 1 .308-.304l1.841-.211-1.17-1.487a.349.349 0 0 1 .002-.435l1.162-1.457-1.861-.211a.35.35 0 0 1-.309-.308l-.213-1.866-1.49 1.168a.353.353 0 0 1-.434-.001l-1.433-1.136-.211 1.835a.35.35 0 0 1-.309.308l-1.863.211L9.1 11.754a.349.349 0 0 1 .002.435l-1.164 1.48 1.831.189a.352.352 0 0 1 .312.305l.234 1.892 1.437-1.16a.351.351 0 0 1 .221-.078z"
    ></path>
    <path
      fill="#E96C49"
      d="M12 17.835a.35.35 0 0 1-.35-.35V6.515a.35.35 0 1 1 .7 0v10.971a.35.35 0 0 1-.35.349z"
    ></path>
    <path fill="#E96C49" d="M17.494 12.35H6.506a.35.35 0 0 1 0-.7h10.988a.35.35 0 0 1 0 .7z"></path>
    <path
      fill="#E96C49"
      d="M8.121 16.224a.35.35 0 0 1-.248-.598l7.758-7.776a.349.349 0 0 1 .495 0 .35.35 0 0 1 .001.495l-7.758 7.776a.347.347 0 0 1-.248.103z"
    ></path>
    <path
      fill="#E96C49"
      d="M15.879 16.224a.347.347 0 0 1-.248-.103L7.873 8.345a.35.35 0 0 1 .001-.495.35.35 0 0 1 .495 0l7.758 7.776a.35.35 0 0 1-.248.598z"
    ></path>
  </svg>
)

const Misty = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 48 48"
    viewBox="0 0 48 42"
    id="mist"
    strokeWidth="1"
    className={`fill-accentOrange stroke-accentOrange stroke-[0.5px]  w-[35px] ${size ? 'xs:w-[60px] w-[50px]' : 'xs:w-[40px] w-[30px]'}`}
  >
    <rect width="34" height="3" x="4" y="10"></rect>
    <rect width="29" height="3" x="4" y="26"></rect>
    <rect width="28" height="2" x="16" y="18"></rect>
    <rect width="35" height="2" x="9" y="34"></rect>
  </svg>
)

const FewClouds = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 10 80 60"
    id="cloud-sun"
    strokeWidth="5"
    className={`fill-accentOrange stroke-accentOrange stroke-[0.5px]  w-[35px] ${size ? 'xs:w-[70px]  w-[50px]' : 'xs:w-[50px] w-[35px]'}`}
  >
    <path d="M65.185 44.66c-.127 0-.254.002-.379.007.08-.506.12-1.016.12-1.525 0-4.202-2.658-7.784-6.377-9.181.078-.493.131-.988.131-1.482 0-5.155-4.194-9.35-9.35-9.35a9.304 9.304 0 0 0-8.562 5.618 12.222 12.222 0 0 0-3.287-.457c-6.201 0-11.349 4.6-12.207 10.568a13.492 13.492 0 0 0-6.681-1.754C11.098 37.104 5 43.202 5 50.697S11.098 64.29 18.593 64.29h46.592c5.412 0 9.815-4.403 9.815-9.815s-4.403-9.815-9.815-9.815zM49.33 25.13c4.053 0 7.35 3.297 7.35 7.35 0 .324-.023.65-.066.975a9.778 9.778 0 0 0-1.503-.128c-2.342 0-4.58.834-6.344 2.33a12.361 12.361 0 0 0-6.106-6.217 7.304 7.304 0 0 1 6.67-4.31zm15.855 37.16H18.593C12.2 62.29 7 57.09 7 50.697s5.2-11.593 11.593-11.593c2.524 0 4.93.802 6.956 2.32l1.599 1.197v-1.998c0-5.697 4.636-10.333 10.333-10.333 4.587 0 8.665 3.067 9.919 7.459l.515 1.806 1.21-1.436a7.821 7.821 0 0 1 5.986-2.792c4.31 0 7.815 3.506 7.815 7.815 0 .8-.125 1.601-.37 2.383l-.51 1.627 1.669-.35a7.215 7.215 0 0 1 1.47-.142c4.31 0 7.815 3.506 7.815 7.815 0 4.31-3.506 7.815-7.815 7.815zM48.333 16.71h2v4.638h-2z"></path>
    <path d="M60.696 31.594h4.638v2h-4.638zM37.313 22.103l1.414-1.414 3.28 3.28-1.414 1.414zM56.661 23.969l3.28-3.28 1.414 1.414-3.28 3.28z"></path>
  </svg>
)

const ThunderStorm = ({ size }: { size?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 2 64 55"
    id="thunderstorm"
    strokeWidth="2"
    className={`fill-accentOrange stroke-accentOrange stroke-[0.5px] ${size ? 'xs:w-[60px] w-[45px]' : 'xs:w-[40px] w-[30px]'}`}
  >
    <path d="M58.18 31.32a12.37 12.37 0 0 0 .93-4.59 12 12 0 0 0-12-12h-.64a9 9 0 0 0-8.6-6.64 8.7 8.7 0 0 0-6.93 3.3 16.4 16.4 0 0 0-3.49-.34c-.53 0-1.05 0-1.56.07a16.27 16.27 0 0 0-10.36 5l-.11.1c-.23.26-.46.52-.67.79a4.94 4.94 0 0 0-.36.44A6.42 6.42 0 0 0 14 18c-.19.27-.38.54-.55.82 0 .08-.1.16-.14.24a15.71 15.71 0 0 0-2.05 5.6v.08c0 .24-.08.47-.11.7a9.23 9.23 0 0 0 1 18.39h10.08a1 1 0 1 0 0-2H12.17a7.23 7.23 0 0 1-.09-14.45h.91l.06-.9a14.41 14.41 0 0 1 28.78 1 14.72 14.72 0 0 1-.66 4.32 1 1 0 0 0 .66 1.2 1 1 0 0 0 .29.05 1 1 0 0 0 1-.71 16.68 16.68 0 0 0 .75-4.91 17.15 17.15 0 0 0-.19-2.4 8.86 8.86 0 0 1 3 .81 8 8 0 0 1 3.67 10.63 1 1 0 0 0 .48 1.34 1.07 1.07 0 0 0 .43.09 1 1 0 0 0 .9-.57 10 10 0 0 0-4.63-13.29 10.28 10.28 0 0 0-4.3-1A16.45 16.45 0 0 0 33 12.05a6.77 6.77 0 0 1 4.83-2A7 7 0 0 1 44.69 16l.17 1.09 1.06-.27a4.88 4.88 0 0 1 1.18-.09 10 10 0 0 1 10 10 10.68 10.68 0 0 1-1.1 4.55l-.39.86.83.45a4.93 4.93 0 0 1-2.25 9.24H31.94a1 1 0 1 0 0 2h22.3a6.93 6.93 0 0 0 3.94-12.51zM42.6 46.4a1 1 0 0 0-1.29.57l-1.54 4a1 1 0 0 0 .57 1.29.92.92 0 0 0 .36.07 1 1 0 0 0 .94-.65l1.54-4a1 1 0 0 0-.58-1.28zm-8.06 0a1 1 0 0 0-1.29.58l-2.84 7.58a1 1 0 0 0 .59 1.29 1 1 0 0 0 1.29-.59l2.84-7.58a1 1 0 0 0-.59-1.28zm-17.18-.01a1 1 0 0 0-1.28.6l-2.72 7.58a1 1 0 0 0 .6 1.28 1 1 0 0 0 .34.06 1 1 0 0 0 .94-.66L18 47.67a1 1 0 0 0-.64-1.28zm32.69.01a1 1 0 0 0-1.29.58l-2.84 7.58a1 1 0 0 0 .59 1.29 1 1 0 0 0 .35.06 1 1 0 0 0 .93-.65l2.85-7.58a1 1 0 0 0-.59-1.28z"></path>
    <path d="M30.83 36.54a1.07 1.07 0 0 0-1-1.08h-7l4.64-10.32a.93.93 0 0 0-.59-1.27 1 1 0 0 0-1.38.49l-5.3 11.79a1.08 1.08 0 0 0 .59 1.38 1 1 0 0 0 .39.07h7.1L23.17 51a1 1 0 0 0 .59 1.27 1.07 1.07 0 0 0 1.37-.59l5.56-14.62a1.11 1.11 0 0 0 .14-.52Z"></path>
  </svg>
)
