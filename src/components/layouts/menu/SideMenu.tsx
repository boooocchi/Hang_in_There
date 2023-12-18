import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { mainTitle, subFont } from '@/constants/FontFamily';

const navItems = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Wardrobe',
    path: '/wardrobe',
  },
  {
    name: 'Register Piece',
    path: '/registerPiece',
  },
  {
    name: 'Dendo Outfit',
    path: '/dendoOutfit',
  },
  {
    name: 'Do I Look Okay?',
    path: '/verdict',
  },
];

const SideMenu = () => {
  const { pathname } = useRouter();
  const settingClassName = pathname === '/settings' ? 'text-accentOrangeRed' : 'text-white';
  return (
    <nav className="flex flex-col flex-shrink-0 bg-richGreen max-h-screen w-pc_sideMenuWidth min-w-pc_sideMenuWidth z-sideMenu relative py-lg px-2xl drop-shadow-md">
      <h1 className={`text-white font-mainTitle text-[36px] mr-3  ${mainTitle.className}`}>Do I Have It?</h1>
      <div className="flex flex-col h-full justify-between">
        <ul className=" h-full py-lg">
          {navItems.map((item, index) => {
            const menuItemClassName =
              pathname === item.path
                ? 'text-accentOrangeRed hover:text-accentOrangeRed'
                : 'text-white hover:text-accentOrangeRed';

            return (
              <li key={index} className={`text-white text-xl mb-md ${subFont.className} uppercase drop-shadow-md `}>
                <Link href={item.path} className={menuItemClassName}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={`text-white text-lg mt-auto ${subFont.className} uppercase`}>
          <Link href="/settings" className={`flex items-center group hover:text-accentOrangeRed `}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-5 h-5 mr-xs drop-shadow-lg group-hover:stroke-accentOrangeRed"
            >
              <path
                strokeLinecap="square"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path strokeLinecap="square" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={settingClassName}></span>Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default SideMenu;
