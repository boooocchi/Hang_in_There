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
  const marginBottom = pathname === '/' ? 'mb-3' : 'mb-3';
  return (
    <div className="h-full flex flex-col">
      <div className={`flex items-center gap-[30px] ${marginBottom}`}>
        <PageTitle>{title}</PageTitle> {editButtons && editButtons}
      </div>
      <div className="flex justify-center flex-col flex-1 overflow-visible w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
