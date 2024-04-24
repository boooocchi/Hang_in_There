import React from 'react';

import { titleFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

interface PageTitleProps extends Children {
  button?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, button }) => {
  return (
    <div className="flex gap-4 items-center">
      <h1 className={`${titleFont.className} text-3xl font-boldest items-center flex`}>{children}</h1>
      {button && <div className="flex item-center gap-2">{button}</div>}
    </div>
  );
};

export default PageTitle;
