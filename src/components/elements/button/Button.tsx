import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  classname?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, classname, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`border border-richGreen bg-richGreen p-sm px-md   transition duration-300 text-white registerButton rounded-md primaryButton ${
        classname || ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
