import React from 'react';

import { titleFont } from '@/constants/FontFamily';

const SmtWrongMessage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center mb-[100px]">
      <h1 className={`${titleFont.className} text-3xl`}>Oops!!</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

export default SmtWrongMessage;
