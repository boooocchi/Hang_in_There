import React from 'react';

import { SigninIllustration } from '@/components/elements/icons/icons';
import { titleFont } from '@/constants/FontFamily';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SignupForm from '@/features/auth/components/SignupForm';

const Index = () => {
  return (
    <div className="xs:h-screen h-svh w-full min-h-[600px]">
      <div className="flex flex-col xs:hidden w-full h-full items-center justify-center bg-middleGreen">
        <h1
          className={`text-[45px] drop-shadow-2xl mb-3 mt-3 flex justify-center items-baseline ${titleFont.className} text-gray relative`}
        >
          Hang <span className="text-3xl">&nbsp; in &nbsp;</span> There
          <div className="absolute top-7 -right-10">
            <SigninIllustration style="h-[70px] w-[70px]" />
          </div>
        </h1>
        <SignupForm />
      </div>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </div>
  );
};

export default Index;
