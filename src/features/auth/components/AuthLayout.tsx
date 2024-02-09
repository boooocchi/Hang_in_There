import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import LoadingPage from '@/components/layouts/layout/LoadingPage';
import { Children } from '@/types/types';

const AuthLayout: React.FC<Children> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  if (status === 'loading') return <LoadingPage />;
  if (status === 'authenticated') {
    router.push('/');
    return <LoadingPage />;
  }

  return (
    <div className="bg-signinPage bg-cover h-screen p-3xl flex items-center">
      <div className="w-2/3 flex flex-col items-center justify-center   text-[rgba(255,255,255,0.8)]">
        <h1 className=" text-[80px] drop-shadow-2xl">Do I Have It?</h1>
        <p className="w-96">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus fugit laboriosam ad fugiat illum
          voluptatum ipsum. Laudantium et, consequuntur eos perspiciatis fugit mollitia tempora! Architecto explicabo
          enim dolor rerum?
        </p>
      </div>
      <div className="bg-[rgba(255,255,255,0.5)] backdrop-blur-md max-h-[650px] w-1/3 p-xl">{children}</div>
    </div>
  );
};

export default AuthLayout;
