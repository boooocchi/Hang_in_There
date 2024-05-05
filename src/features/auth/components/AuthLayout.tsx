import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import { SigninIllustration } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';
import { titleFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

const AuthLayout: React.FC<Children> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  if (status === 'loading') return;
  <div className="h-screen w-screen">
    <Loading size="large" />;
  </div>;
  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className="w-full bg-middleGreen bg-cover h-screen xs:flex items-center justify-center hidden">
      <div className="w-1/2 flex justify-center">
        <div className="w-2/3 flex flex-col items-center text-gray">
          <Image alt="logo" src="/image/logo.png" width={80} height={80} />
          <h1
            className={`text-[60px] drop-shadow-2xl mb-3 mt-3 flex justify-center items-baseline ${titleFont.className}`}
          >
            Hang <span className="text-3xl">&nbsp; in &nbsp;</span> There
          </h1>
          <p className="text-center w-4/5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus fugit laboriosam ad fugiat illum
            voluptatum ipsum. Laudantium et, consequuntur eos perspiciatis fugit mollitia tempora! Architecto explicabo
            enim dolor rerum?
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
