import React from 'react';

type ErrorMessageProps = {
  children: React.ReactNode;
  positionFromTop?: string;
  dropzone?: boolean;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, positionFromTop, dropzone }) => {
  return (
    <p
      className={`text-errorRed  text-[0.9rem] absolute  left-3 top-9 ${positionFromTop && positionFromTop} ${
        dropzone && 'dropzoneErrorMessaege'
      }`}
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
