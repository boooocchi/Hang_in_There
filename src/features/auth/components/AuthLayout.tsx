import Image from 'next/image';
import React from 'react';

import { titleFont } from '@/constants/FontFamily';
import { SigninIllustration } from '@/constants/icons/icons';
import { Children } from '@/types/types';

const AuthLayout: React.FC<Children> = ({ children }) => {
  return (
    <div className="w-full bg-middleGreen bg-cover h-screen xs:flex items-center justify-center hidden">
      <div className="w-1/2 flex justify-center">
        <div className="w-2/3 flex flex-col items-center text-gray">
          <div className=" w-[80px] h-[55px] relative">
            <Image alt="logo" src="/image/logo.png" fill objectFit="contain" />
          </div>
          <h1
            className={`text-[60px] drop-shadow-2xl mb-3 mt-3 flex justify-center items-baseline ${titleFont.className}`}
          >
            Hang <span className="text-3xl">&nbsp; in &nbsp;</span> There
          </h1>
          <p className="text-center w-full leading-[1.7]">
            ・Save your favorite pieces of clothes in your own online wardrobe. <br />
            ・Create your outift by combining your favorite pieces. <br />
            ・Get matching suggestions for your items in your wardrobe. <br /> ・Limit the number of items in your
            wardrobe.
          </p>
          <div className="w-full flex justify-end mr-5">
            <SigninIllustration />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
