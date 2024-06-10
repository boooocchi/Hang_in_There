import React from 'react';

import { mainFont } from '@/constants/FontFamily';
import { CancelIcon, ErrorIllustration, SuccessIllustration } from '@/constants/icons/icons';
import { useToast } from '@/contexts/ToastContext';

import ClientPortal from '../../portal/Portal';

const ToastMessages: React.FC = () => {
  const { textsState, setTextsState } = useToast();

  return (
    <ClientPortal selector="#myportal">
      <div className="fixed -right-[400px] h-[500px] top-[50px] text z-[950]">
        {textsState.map((textState, index) => {
          return (
            <div
              key={index}
              className={`relative mb-sm rounded-md min-w-[300px] xs:max-w-[500px] max-w-[300px] ease-in transition-all duration-[300]  ${textState.type !== 'error' ? 'bg-middleGreen' : 'bg-accentOrange'} flex items-center shadow-md  z-[990]  ${
                textState.show ? 'xs:-translate-x-[450px] -translate-x-[415px]' : 'translate-x-[0] opacity-0'
              }`}
            >
              <div className="flex items-center px-md justify-center">
                {textState.type === 'error' ? <ErrorIllustration /> : <SuccessIllustration />}
              </div>
              <div
                className={`bg-gray relative h-full w-full xs:p-lg p-lg  rounded-r-md text-md text-sm ${mainFont.className}`}
              >
                {textState.text !== '' ? textState.text : `Success!`}
                <button
                  className="rounded-full right-3 top-[50%] border-1 border-lighterGreen h-5 w-5 translate-y-[-50%] absolute flex items-center justify-center"
                  onClick={() =>
                    setTextsState((prev) => {
                      return prev.map(
                        (
                          state: {
                            text: string;
                            show: boolean;
                            type: 'success' | 'error';
                            timeStamp: number;
                          },
                          i: number,
                        ) => {
                          if (i === index) {
                            return { ...state, show: false };
                          }
                          return state;
                        },
                      );
                    })
                  }
                >
                  <CancelIcon style="stroke-lighterGreen h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ClientPortal>
  );
};

export default ToastMessages;
