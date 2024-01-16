import React from 'react';

import { subFont } from '@/constants/FontFamily';

type ErrorMessageProps = {
  children: React.ReactNode;
  top?: boolean;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, top }) => {
  return (
    <p
      className={`text-errorRed ${subFont.className}  font-bold text-[0.9rem] absolute top-9 left-3 ${
        top ? 'top-[3px]' : 'top-9'
      }`}
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
