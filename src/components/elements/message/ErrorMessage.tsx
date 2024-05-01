import React from 'react';

type ErrorMessageProps = {
  children: React.ReactNode;
  positionFromTop?: string;
  style?: string;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, style }) => {
  return <p className={`text-errorRed  text-sm absolute ml-1 ${style ?? style}`}>{children}</p>;
};

export default ErrorMessage;
