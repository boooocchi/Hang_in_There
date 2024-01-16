import React from 'react';

import { subFont } from '@/constants/FontFamily';

const Button = ({ children }) => {
  return (
    <button
      className={`${subFont.className} border border-richGreen bg-richGreen  p-sm px-md hover:bg-white transition duration-200 text-white hover:text-deepGreen rounded-md`}
    >
      {children}
    </button>
  );
};

export default Button;
