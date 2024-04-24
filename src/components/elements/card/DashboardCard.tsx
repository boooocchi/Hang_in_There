import Link from 'next/link';
import React from 'react';

import { titleFont } from '@/constants/FontFamily';

type Props = {
  children: React.ReactNode;
  title: string;
  link: string;
};

const DashboardCard: React.FC<Props> = ({ children, title, link }) => {
  return (
    <div className="h-full w-full  group rounded-md border-middleGreen border-1 bg-lightGreen relative overflow-hidden p-md">
      {children}
      <h2 className="text-xl relative transition-all duration-300 group-hover:opacity-100 ease-in  w-full">
        <p className={`font-extraBold tracking-tighter ${titleFont.className}`}>{title}</p>
        <Link href={link}>
          <button className="border-accentOrange border-[1.5px] text-accentOrange hover:bg-accentOrange hover:text-white rounded-md px-md  text-center text-sm mt-3 py-[7px]  font-boldest duration-300">
            View
          </button>
        </Link>
      </h2>
    </div>
  );
};

export default DashboardCard;
