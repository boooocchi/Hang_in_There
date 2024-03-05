import React from 'react';

import { useToast } from '@/hooks/ToastContext';

import ClientPortal from '../Portal';

const PortalToasty: React.FC = () => {
  const { isShow, text, error } = useToast();

  return (
    <>
      <ClientPortal selector="#myportal">
        <div
          className={`rounded-md fixed ease-in transition-all duration-[150] bg-lightGreen flex items-center shadow-md   top-[50px] right-[50px] ${
            isShow ? 'translate-x-[0] ' : 'translate-x-[25%] opacity-0'
          }`}
        >
          <div className=" flex items-center px-md justify-center">
            {error ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 stroke-accentOrange"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-8 h-8 stroke-accentOrange"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
          </div>
          <div className="bg-white h-full w-full py-md px-lg  rounded-r-md">{text}</div>
        </div>
      </ClientPortal>
    </>
  );
};

export default PortalToasty;
