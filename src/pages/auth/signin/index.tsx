import React from 'react';

import { SigninIllustration } from '@/components/elements/icons/icons';
import { titleFont } from '@/constants/FontFamily';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SigninForm from '@/features/auth/components/SigninForm';

const Signin = () => {
  return (
    <div className="h-screen w-full min-h-[600px]">
      <div className="flex flex-col xs:hidden w-full h-full items-center justify-center  bg-middleGreen relative">
        <h1
          className={`text-[45px] drop-shadow-2xl mb-3 mt-3 flex justify-center items-baseline ${titleFont.className} text-gray relative`}
        >
          Hang <span className="text-3xl">&nbsp; in &nbsp;</span> There
          <div className="absolute top-7 -right-10 z-10">
            <SigninIllustration style="h-[70px] w-[70px]" />
          </div>
        </h1>
        <SigninForm />
      </div>
      <AuthLayout>
        <SigninForm />
      </AuthLayout>
    </div>
  );
};

export default Signin;
