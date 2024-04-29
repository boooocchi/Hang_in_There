import cn from 'classnames';
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
import { isItemBgColor } from '@/utils/utils';

const SideMenu = () => {
  const { pathname } = useRouter();
  const { userId } = useAuth();
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
    <nav className="flex flex-col flex-shrink-0 bg-middleGreen w-[280px]  relative py-2xl px-xl shadow-[10px_15px_10px_-5px_rgba(0,0,0,0.3)] tracking-tight h-screen min-h-[750px] max-h-[800px] overflow-hidden rounded-r-[30px] 2xl:rounded-[30px]">
      <h1
        className={`flex items-baseline gap-2 text-white font-mainTitle text-[35px] leading-[32px] whitespace-nowrap w-full justify-center ${titleFont.className}`}
      >
        <span>
          Hang <span className="text-xl">in</span> There
        </span>
      </h1>
      <div className="flex flex-col h-full justify-between">
        <ul className="h-full  pt-[40px] flex flex-col gap-md">
          {navItems.map((item, index) => {
            const menuItemColor = isItemBgColor(item.pathname, pathname);
            return (
              <li
                key={index}
                className={cn('rounded-md inline-block py-sm px-md text-white relative', {
                  'bg-lighterGreen': menuItemColor,
                })}
              >
                <Link href={item.path} className="group group-hover:cursor-pointer">
                  <div className="flex items-center font-extraBold tracking-tighter">
                    <div
                      className={`h-[23px] w-[23px] flex items-center mr-5 fill-white stroke-white
                   group-hover:fill-lighterOrange group-hover:stroke-lighterOrange`}
                    >
                      {item.icon ?? item.icon}
                    </div>
                    <span className={`${menuItemColor} group-hover:text-lighterOrange text-base`}>{item.name}</span>
                  </div>
                </Link>
                {menuItemColor && (
                  <div className="bg-lighterOrange rounded-xl absolute -top-1 -left-[70px] w-10 h-[50px]"></div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-auto  text-white">
          <Link href="/settings" className="flex items-center  group ">
            <SettingIcon />
            <span
              className={`font-extraBold tracking-tighter text-base ${settingClassName} group-hover:text-lighterOrange`}
            >
              Settings
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default SideMenu;
