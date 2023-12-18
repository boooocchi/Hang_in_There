import React from 'react';

import { Children } from '@/types/types';

import Header from '../menu/Header';

const MainLayout: React.FC<Children> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow pt-lg pb-3xl px-3xl overflow-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
