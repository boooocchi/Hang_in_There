import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';

type Props = {
  title: string;
  children: React.ReactNode;
  editButtons?: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children, title, editButtons }) => {
  return (
    <div className="h-full flex flex-col gap-[5%] ">
      <div className="flex items-center gap-[30px]">
        <PageTitle>{title}</PageTitle> {editButtons && editButtons}
      </div>
      <div className="flex justify-center flex-col flex-1 overflow-y-scroll w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
