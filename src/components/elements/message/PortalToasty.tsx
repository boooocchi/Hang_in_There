import React from 'react';

import { ErrorIllustration, SuccessIllustration } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';

import ClientPortal from '../Portal';

const PortalToasty: React.FC = () => {
  const { textsState } = useToast();

  const isMessage = textsState.some((textState) => textState.show);
  return (
    <ClientPortal selector="#myportal">
      <div
        className={`w-[400px] fixed gap-sm -right-[400px] top-[50px] flex flex-col text z-[999] ${!isMessage && 'z-[0] pointer-events-none'}`}
      >
        {textsState.map((textState, index) => {
          return (
            <div
              key={index}
              className={`relative  rounded-md max-w-[300px]  ease-in transition-all duration-[300]  ${textState.type !== 'error' ? 'bg-lightGreen' : 'bg-lightOrange'} flex items-center shadow-md  z-[999]  ${
                textState.show ? 'xs:-translate-x-[350px] -translate-x-[320px]' : 'translate-x-[0] opacity-0'
              }`}
            >
              <div className=" flex items-center px-md justify-center">
                {textState.type === 'error' ? <ErrorIllustration /> : <SuccessIllustration />}
              </div>
              <div className="bg-gray h-full w-full py-lg px-lg  rounded-r-md">{textState.text}</div>
            </div>
          );
        })}
      </div>
    </ClientPortal>
  );
};

export default PortalToasty;
