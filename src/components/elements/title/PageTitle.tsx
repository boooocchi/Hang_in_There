import React from 'react';

import { titleFont } from '@/constants/FontFamily';
import { Children } from '@/types/types';

const PageTitle: React.FC<Children> = ({ children }) => {
  return (
    <h1 className={`${titleFont.className} text-3xl  font-boldest text-richGreen mb-md  inline-block relative`}>
      {children}
    </h1>
  );
};

export default PageTitle;
