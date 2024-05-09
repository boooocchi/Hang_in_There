import React from 'react';

import { ErrorIllustration, SuccessIllustration } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';

import ClientPortal from '../Portal';

const PortalToasty: React.FC = () => {
  const { textsState } = useToast();

  return (
    <ClientPortal selector="#myportal">
      <div className={` fixed -right-[400px] h-[500px] top-[50px] text z-[999]`}>
        {textsState.map((textState, index) => {
          return (
            <div
              key={index}
              className={`relative mb-sm rounded-md min-w-[300px] xs:max-w-[500px] max-w-[300px] ease-in transition-all duration-[300]  ${textState.type !== 'error' ? 'bg-lightGreen' : 'bg-lightOrange'} flex items-center shadow-md  z-[999]  ${
                textState.show ? 'xs:-translate-x-[450px] -translate-x-[415px]' : 'translate-x-[0] opacity-0'
              }`}
            >
              <div className="flex items-center px-md justify-center">
                {textState.type === 'error' ? <ErrorIllustration /> : <SuccessIllustration />}
              </div>
              <div className="bg-gray h-full w-full xs:p-lg p-md  rounded-r-md text-md">
                {textState.text !== '' ? textState.text : `dummy`}
              </div>
            </div>
          );
        })}
      </div>
    </ClientPortal>
  );
};

export default PortalToasty;
