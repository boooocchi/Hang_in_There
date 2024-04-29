import { useRouter } from 'next/router';
import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';

type Props = {
  title: string;
  children: React.ReactNode;
  editButtons?: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children, title, editButtons }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const dashboardStyle = pathname === '/' ? 'overflow-visible' : 'overflow-y-scroll';
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-[30px] mb-3 tracking-wide">
        <PageTitle>{title}</PageTitle> {editButtons && editButtons}
      </div>
      <div className={`flex h-full flex-1 flex-col w-full ${dashboardStyle}`}>{children}</div>
    </div>
  );
};

export default MainLayout;
