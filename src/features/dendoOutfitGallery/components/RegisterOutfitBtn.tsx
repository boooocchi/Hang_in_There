import Link from 'next/link';
import React from 'react';

const RegisterOutfitBtn = () => {
  return (
    <Link href="/registerDendoOutfit">
      <button className="w-10 h-10 stroke-gray bg-middleGreen rounded-full flex justify-center items-center fixed xs:bottom-[50px] xs:right-[80px]  right-[30px] bottom-[30px] hover:bg-darkGray group border-2 border-transparent hover:border-middleGreen hover:border-2 transition-all duration-300 ">
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
  );
};

export default RegisterOutfitBtn;