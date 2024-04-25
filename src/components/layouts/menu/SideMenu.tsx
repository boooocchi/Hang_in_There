import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
  DashboardIcon,
  WardrobeIcon,
  RegisterIcon,
  DendoOutfitIcon,
  SuggestionIcon,
  SettingIcon,
  ListIcon,
} from '@/components/elements/icons/icons';
import { titleFont } from '@/constants/FontFamily';
import { useAuth } from '@/hooks/useAuth';
import { getNavItemColor } from '@/utils/utils';

const SideMenu = () => {
  const { pathname } = useRouter();
  const { userId, status } = useAuth();
  const settingClassName = pathname === '/settings' ? 'text-lighterOrange' : '';

  const navItems = [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      path: '/',
      pathname: '/',
    },
    {
      icon: <WardrobeIcon />,
      name: 'Wardrobe',
      path: `/wardrobe/${userId}`,
      pathname: 'wardrobe',
    },
    {
      icon: <RegisterIcon />,
      name: 'Register Piece',
      path: '/registerPiece',
      pathname: 'registerpiece',
    },
    {
      icon: <DendoOutfitIcon />,
      name: 'Dendo Outfit',
      path: `/dendoOutfitGallery/${userId}`,
      pathname: 'dendooutfit',
    },
    {
      icon: <SuggestionIcon />,
      name: 'Suggestion by AI',
      path: '/suggestion',
      pathname: 'suggestion',
    },
    {
      icon: <ListIcon />,
      name: 'Wish List',
      path: '/wishList',
      pathname: 'wishlist',
    },
  ];

  return (
    <>
      {status === 'authenticated' && (
        <nav className="flex flex-col flex-shrink-0 bg-richGreen  w-[280px] min-w-[280px]  relative pt-2xl pb-2xl px-2xl drop-shadow-md min-h-[0px] tracking-tight h-screen overflow-hidden rounded-r-[30px]">
          <h1
            className={`flex items-baseline gap-2 text-white font-mainTitle text-[35px] leading-[32px] whitespace-nowrap -ml-1 ${titleFont.className}`}
          >
            Hang <span className="text-[20px]">in</span> There
          </h1>
          <div className="flex flex-col h-full justify-between">
            <ul className=" h-full pb-xl pt-[50px]">
              {navItems.map((item, index) => {
                const menuItemColor = getNavItemColor(item.pathname, pathname);
                return (
                  <li key={index} className={`inline-block text-white mb-lg relative ${menuItemColor}`}>
                    <Link href={item.path} className="group group-hover:cursor-pointer">
                      <div className="flex items-center font-extraBold tracking-tighter">
                        <div
                          className={`h-[23px] w-[23px] flex items-center mr-5 ${
                            menuItemColor ? 'fill-lighterOrange stroke-lighterOrange' : 'fill-white stroke-white'
                          } group-hover:fill-lighterOrange group-hover:stroke-lighterOrange`}
                        >
                          {item.icon ?? item.icon}
                        </div>
                        <span className={`${menuItemColor} group-hover:text-lighterOrange text-base`}>{item.name}</span>
                      </div>
                    </Link>
                    {menuItemColor && (
                      <div className="bg-lighterOrange rounded-lg absolute -top-3 -left-[5rem] w-10 h-[50px]"></div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto  text-white">
              <Link href="/settings" className="flex items-center  group ">
                <SettingIcon />
                <span
                  className={`font-extraBold tracking-tighter text-base   ${settingClassName} group-hover:text-lighterOrange`}
                >
                  Settings
                </span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
export default SideMenu;
