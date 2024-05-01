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
        className={`text-sm top-[50px] right-[50px] fixed flex flex-col gap-3 text z-[999] ${!isMessage && 'z-[0] pointer-events-none'}`}
      >
        {textsState.map((textState, index) => (
          <div
            key={index}
            className={`rounded-md max-w-[400px]  ease-in transition-all duration-[300] ${!textState.show && 'z-[0] pointer-events-none'} ${textState.type !== 'error' ? 'bg-lightGreen' : 'bg-lightOrange'} flex items-center shadow-md    ${
              textState.show ? 'translate-x-[0]' : 'translate-x-[100%] opacity-0'
            }`}
          >
            <div className=" flex items-center px-md justify-center">
              {textState.type === 'error' ? <ErrorIllustration /> : <SuccessIllustration />}
            </div>
            <div className="bg-gray h-full w-full py-lg px-lg  rounded-r-md">{textState.text}</div>
          </div>
        ))}
      </div>
    </ClientPortal>
  );
};

export default PortalToasty;
