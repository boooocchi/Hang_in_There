import React from 'react';

import { titleFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

interface PageTitleProps extends Children {
  button?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <div className="flex gap-4 items-center max-w-4/5 overflow-hidden">
      <p className={`${titleFont.className} text-3xl font-boldest max-w-full max-xs:tracking-tight truncate`}>
        {children}
      </p>
    </div>
  );
};

export default PageTitle;
