import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import { titleFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

import hangInThereLogo from '../../../../public/image/hangInThereLogo.png';

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
    <div className="w-full bg-middleGreen bg-cover h-screen  flex ">
      <div className="w-1/2 flex flex-col items-center text-white pt-[250px]">
        <Image alt="logo" src={hangInThereLogo} width={80} height={80} />
        <h1 className={`text-[60px] drop-shadow-2xl mb-3 mt-3 ${titleFont.className}`}>Hang in There</h1>
        <p className="text-center w-1/2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus fugit laboriosam ad fugiat illum
          voluptatum ipsum. Laudantium et, consequuntur eos perspiciatis fugit mollitia tempora! Architecto explicabo
          enim dolor rerum?
        </p>
      </div>
      <div className="h-full w-1/2 flex justify-center items-center bg-gray">{children}</div>
    </div>
  );
};

export default AuthLayout;
