import Link from 'next/link';
import React from 'react';

const RegisterOutfitBtn = ({ isInstruction }: { isInstruction: boolean }) => {
  return (
    <div className="absolute xs:right-0 right-2 bottom-0 flex flex-col gap-sm">
      {isInstruction && (
        <div className="flex flex-col items-center animate-bounce">
          <div>get started here!</div>
          <div className="rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      )}
      <Link href="/registerDendoOutfit" className="flex justify-center">
        <button className="w-10 h-10 stroke-gray bg-middleGreen rounded-full flex justify-center items-center  hover:bg-darkGray group border-2 border-transparent hover:border-middleGreen hover:border-2 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            className="w-5 h-5 group-hover:stroke-middleGreen duration-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default RegisterOutfitBtn;
