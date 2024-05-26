import { useRouter } from 'next/router';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import { useAuth } from '@/hooks/useAuth';
import { Children } from '@/types/types';

import Header from '../../elements/menu/Header';
import SideMenu from '../../elements/menu/SideMenu';

const PageLayout: React.FC<Children> = ({ children }) => {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;
  const overFlow =
    pathname === '/' ? 'xs:overflow-visible max-xs:overflow-y-scroll max-xs:overflow-x-hidden' : 'overflow-hidden';

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="xs:h-screen h-svh w-full">
        <Loading size="large" />
      </div>
    );
  }

  if (status !== 'authenticated') {
    return (
      <div className="xs:h-screen h-svh w-full">
        <Loading size="large" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center">
      <div className="max-xs:hidden max-h-[800px]">
        <SideMenu />
      </div>
      <div className="flex flex-col h-full  px-[15px] pt-md pb-xl xs:px-4xl xs:py-2xl w-full bg-darkGray xs:gap-[30px] gap-[20px] xs:min-h-[750px] xs:max-h-[800px] xs:overflow-hidden max-xs:min-h-svh">
        <Header />
        <div className={`flex-grow ${overFlow}`}>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
