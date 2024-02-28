import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';

type Props = {
  title: string;
  children: React.ReactNode;
  editButtons?: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children, title, editButtons }) => {
  return (
    <main className="h-full flex flex-col gap-[5%]">
      <div className="flex items-center gap-[30px]">
        <PageTitle>{title}</PageTitle> {editButtons && editButtons}
      </div>
      <div className="flex justify-center flex-col flex-grow overflow-y-scroll">{children}</div>
    </main>
  );
};

export default MainLayout;
