import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  link: string;
};

const DashboardCard: React.FC<Props> = ({ children, title, link }) => {
  return (
    <Link
      href={link}
      className="flex gap-sm items-center h-full w-[25%] rounded-md bg-darkGray  relative overflow-hidden shadow-md px-md hover:bg-middleGreen hover:text-gray transition-all duration-300"
    >
      <div className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md shrink-0">{children}</div>
      <h2 className="text-base relative   w-full">
        <p className="font-extraBold tracking-tighter">{title}</p>
      </h2>
    </Link>
  );
};

export default DashboardCard;
