import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';

import Header from '../menu/Header';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};
const MainLayout: React.FC<Props> = ({ children, pageTitle }) => {
  return (
    <div className="min-h-[750px] flex flex-col h-screen px-4xl py-2xl pb-2xl w-full">
      <Header />
      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
      <div className="flex-grow  overflow-auto w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
