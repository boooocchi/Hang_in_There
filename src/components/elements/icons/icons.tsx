import React from 'react';

type Props = {
  style?: string;
};

const CancelIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="white"
    className={style ?? 'w-4 h-4'}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const EditIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={style ?? 'w-4 h-4'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const TrashbinIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={style ?? 'w-4 h-4'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const PlusIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    className={style ?? 'w-4 h-4'}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const DashboardIcon: React.FC<Props> = ({ style }) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    id="dashboard"
    className={style ?? 'mt-[1px]'}
  >
    <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
  </svg>
);

const WardrobeIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 108.99 122.88"
    width="19"
    height="19"
    className={style}
  >
    <g>
      <path d="M25.77,4.5l27.95,30.89L83.18,4.48c-0.42-0.26-0.91-0.42-1.44-0.42H61.61l-35.08,0.1C26.26,4.23,26,4.35,25.77,4.5 L25.77,4.5z M56.96,42.33v76.05h45.05c0.68,0,1.3-0.28,1.75-0.73c0.45-0.45,0.73-1.07,0.73-1.75V28.76c0-0.68-0.28-1.3-0.73-1.75 c-0.45-0.45-1.07-0.73-1.75-0.73H88.52c0.01,10.05-0.18,18.42-1.29,22.68c-1.47,5.66-6.3,3.54-10.14,1.91L56.96,42.33L56.96,42.33z M51.87,118.38V41.83L25.8,52.02c-2.38,0.93-4.38,0.14-4.69-6.16c-0.23-4.68-0.45-11.53-0.55-19.6c-0.11,0.02-0.22,0.02-0.33,0.02 H6.98c-0.68,0-1.3,0.28-1.75,0.73c-0.45,0.45-0.73,1.07-0.73,1.75v87.14c0,0.68,0.28,1.3,0.73,1.75c0.45,0.45,1.07,0.73,1.75,0.73 H51.87L51.87,118.38z M88.5,21.78h13.51c1.92,0,3.67,0.79,4.93,2.05c1.26,1.26,2.05,3.01,2.05,4.93v87.14 c0,1.92-0.78,3.67-2.05,4.93c-1.26,1.26-3.01,2.05-4.93,2.05H6.98c-1.92,0-3.67-0.78-4.93-2.05C0.78,119.57,0,117.82,0,115.9V28.76 c0-1.92,0.78-3.67,2.05-4.93c1.26-1.26,3.01-2.05,4.93-2.05h13.26c0.1,0,0.19,0.01,0.28,0.02c-0.03-4.74-0.02-9.82,0.05-15.06 c0-1.29,0.36-2.49,0.99-3.51c0.42-1.76,2-3.07,3.89-3.07l0.65,0c0.37-0.06,0.75-0.1,1.14-0.1V0.04h0.01h40.34L83.63,0v0 c0.96,0,1.93,0.34,2.7,1.05c0.73,0.67,1.15,1.53,1.27,2.44c0.53,0.96,0.84,2.07,0.84,3.25h0.02v0.01h-0.02 C88.43,11.88,88.47,16.97,88.5,21.78L88.5,21.78z M50.05,37.33L24.56,9.05v36.69c0,1.85,1.82,1.85,3.98,1.08 C34.77,44.61,46.9,38.79,50.05,37.33L50.05,37.33z M84.43,9.03L57.37,37.32l24.38,11.11c1.33,0.64,2.69-1.21,2.69-2.69V9.03 L84.43,9.03z M20.55,6.74L20.55,6.74L20.55,6.74z" />
    </g>
  </svg>
);

const RegisterIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="120 120 500 500"
    id="hanger"
    width="20"
    height="20"
    className={style}
  >
    <path d="M596.36,494.22,399.45,327.89a38,38,0,0,0-12.75-7c1.92-19.71,9.95-37.3,22.74-49.22a50.51,50.51,0,1,0-84.95-36.95,11.23,11.23,0,0,0,22.45,0,28.08,28.08,0,1,1,47.19,20.53c-17.21,16-27.81,39.5-29.91,65.4a37.67,37.67,0,0,0-13.67,7.28L153.64,494.22c-13.21,11.17-17.83,29.09-11.76,45.67,5.76,15.75,20,25.93,36.22,25.93H571.9c16.24,0,30.46-10.18,36.22-25.93C614.19,523.31,609.57,505.39,596.36,494.22ZM587,532.17c-1,2.62-4.89,11.2-15.14,11.2H178.1c-10.25,0-14.18-8.58-15.14-11.2-2.22-6.06-2-14.71,5.18-20.8L365,345A15.19,15.19,0,0,1,385,345l196.9,166.33C589.07,517.46,589.26,526.11,587,532.17Z"></path>
  </svg>
);

const DendoOutfitIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    id="mirror"
    width="21"
    height="21"
    transform="scale(1.2,1)"
    className={style}
  >
    <path d="M29,41.752V56H24a3,3,0,0,0-3,3v2a1,1,0,0,0,1,1H42a1,1,0,0,0,1-1V59a3,3,0,0,0-3-3H35V41.752C44.61,40.155,52,31.009,52,20V18a1,1,0,0,0-2,0v1H47.955C47.49,9.541,40.522,2,32,2S16.51,9.541,16.045,19H14V18a1,1,0,0,0-2,0v2C12,31.009,19.39,40.155,29,41.752ZM41,59v1H23V59a1,1,0,0,1,1-1H40A1,1,0,0,1,41,59ZM33,42V56H31V42Zm-1-2c-9.621,0-17.481-8.438-17.954-19h2C16.51,30.459,23.478,38,32,38s15.49-7.541,15.955-17h2C49.481,31.562,41.621,40,32,40ZM32,4c7.72,0,14,7.178,14,16S39.72,36,32,36,18,28.822,18,20,24.28,4,32,4Z"></path>
  </svg>
);

const SuggestionIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    width="21"
    height="21"
    className={style}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    />
  </svg>
);

const SettingIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="white"
    width="20"
    height="20"
    className={style ?? 'mr-5 group-hover:stroke-lighterOrange'}
  >
    <path
      strokeLinecap="square"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
    />
    <path strokeLinecap="square" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ListIcon: React.FC<Props> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="list">
    <g data-name="Layer" className={style}>
      <g data-name="list">
        <circle cx="3" cy="7" r="1"></circle>
        <circle cx="3" cy="12" r="1"></circle>
        <circle cx="3" cy="17" r="1"></circle>
        <rect width="14" height="1" x="7" y="12" rx=".94" ry=".94"></rect>
        <rect width="14" height="1" x="7" y="17" rx=".94" ry=".94"></rect>
        <rect width="14" height="1" x="7" y="7" rx=".94" ry=".94"></rect>
      </g>
    </g>
  </svg>
);

const EllipsisIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={style ?? 'w-4 h-4'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

const SendIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={style ?? 'w-5 h-5'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
    />
  </svg>
);

const GoogleIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="15.25"
    viewBox="0 0 488 512"
    stroke="white"
    className={style ?? 'h-5 w-5 color-gray'}
  >
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
  </svg>
);

const AlertIcon: React.FC<Props> = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    className={style ?? 'w-5 h-5 stroke-deepGreen'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
    />
  </svg>
);

export {
  CancelIcon,
  EditIcon,
  TrashbinIcon,
  PlusIcon,
  DashboardIcon,
  WardrobeIcon,
  RegisterIcon,
  DendoOutfitIcon,
  SuggestionIcon,
  SettingIcon,
  ListIcon,
  EllipsisIcon,
  SendIcon,
  GoogleIcon,
  AlertIcon,
};
