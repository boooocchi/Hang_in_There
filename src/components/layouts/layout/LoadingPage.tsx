import React from 'react';

import { titleFont } from '@/constants/FontFamily';

const LoadingPage = () => {
  return <div className={`h-screen w-screen text-3xl flex justify-center items-center ${titleFont}`}>Loading...</div>;
};

export default LoadingPage;
