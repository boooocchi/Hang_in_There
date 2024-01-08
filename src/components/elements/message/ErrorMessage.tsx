import React from 'react';

import { subFont } from '@/constants/FontFamily';

type ErrorMessageProps = {
  children: React.ReactNode;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <p className={`text-errorRed ${subFont.className}  font-bold text-[0.8rem] absolute top-9 left-3`}>{children}</p>
  );
};

export default ErrorMessage;
