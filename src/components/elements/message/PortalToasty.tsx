import React from 'react';

import ClientPortal from '../Portal';

export type PortalToastyProps = {
  show: boolean;
  text: string;
};

const PortalToasty: React.FC<PortalToastyProps> = ({ show, text }) => {
  return (
    <>
      <ClientPortal selector="#myportal">
        <div
          className={` ${
            show ? 'translate-x-0' : 'translate-x-[250px]'
          }  rounded-md fixed  transition-transform duration-[3000] bg-lightGreen flex items-center shadow-md  top-10 right-5 `}
        >
          <div className=" flex items-center px-md justify-center">
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
          </div>
          <div className="bg-white h-full w-full py-md px-lg  rounded-r-md">{text}</div>
        </div>
      </ClientPortal>
    </>
  );
};

export default PortalToasty;
