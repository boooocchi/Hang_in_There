import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  colorSchema?: string;
  classname?: string;
  onClick?: () => void;
};

type colorClassesType = {
  [key: string]: string;
};

const Button: React.FC<Props> = ({ children, colorSchema = 'richGreen', classname, onClick }) => {
  const baseClasses = 'p-sm px-md transition duration-300 text-white rounded-md border-transparent border-1';

  const colorClasses: colorClassesType = {
    richGreen: 'bg-richGreen primaryGreenButton',
    accentOrange: 'bg-accentOrange  primaryOrangeButton',
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses[colorSchema]} ${classname || ''}`}>
      {children}
    </button>
  );
};

export default Button;
