import React from 'react';

import { mainTitle } from '@/constants/FontFamily';

const LoadingPage = () => {
  return (
    <div className={`${mainTitle.className} h-screen w-screen text-3xl flex justify-center items-center`}>
      Loading...
    </div>
  );
};

export default LoadingPage;
