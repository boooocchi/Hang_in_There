import React, { ReactNode } from 'react';

import Loading from '@/components/elements/message/Loading';

type Props = {
  children: ReactNode;
  colorSchema?: string;
  style?: string;
  onClick?: () => void;
  loading?: boolean;
};

type colorClassesType = {
  [key: string]: string;
};

const Button: React.FC<Props> = ({ children, colorSchema = 'richGreen', style, onClick, loading }) => {
  const baseClasses = 'p-sm px-md transition duration-300 text-white rounded-md border-transparent border-1';

  const colorClasses: colorClassesType = {
    richGreen: 'bg-richGreen primaryGreenButton',
    accentOrange: 'bg-accentOrange  primaryOrangeButton',
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses[colorSchema]} ${style || ''}`}>
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
