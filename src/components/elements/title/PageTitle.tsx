import React from 'react';

import { subFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

const PageTitle: React.FC<Children> = ({ children }) => {
  return (
    <h1
      className={`text-2xl text-pageTitle ${subFont.className} tracking-normal uppercase text-deepGreen pb-sm leading-[100%] mb-sm font-[400]`}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
