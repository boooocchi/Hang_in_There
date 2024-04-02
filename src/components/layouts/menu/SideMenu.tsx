import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { titleFont } from '@/constants/FontFamily';
import { useAuth } from '@/hooks/useAuth';

const SideMenu = () => {
  const { pathname } = useRouter();
  const settingClassName = pathname === '/settings' ? 'text-lighterOrange' : '';

  const { session } = useAuth();

  const navItems = [
    {
      icon: (
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          id="dashboard"
          className="mt-[1px]"
        >
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
        </svg>
      ),
      name: 'Dashboard',
      path: '/',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          id="clothes"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          width="20"
          height="20"
          className="stroke-[1.3px] "
        >
          <path d="m14.43 3-.29.49a2.5 2.5 0 0 1-4.29 0L9.57 3H6.76L2 5.38V11h4v10h12V11h4V5.38L17.24 3Z"></path>
        </svg>
      ),
      name: 'Wardrobe',
      path: `/wardrobe/${session?.user?.id}`,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="120 120 500 500" id="hanger" width="20" height="20">
          <path d="M596.36,494.22,399.45,327.89a38,38,0,0,0-12.75-7c1.92-19.71,9.95-37.3,22.74-49.22a50.51,50.51,0,1,0-84.95-36.95,11.23,11.23,0,0,0,22.45,0,28.08,28.08,0,1,1,47.19,20.53c-17.21,16-27.81,39.5-29.91,65.4a37.67,37.67,0,0,0-13.67,7.28L153.64,494.22c-13.21,11.17-17.83,29.09-11.76,45.67,5.76,15.75,20,25.93,36.22,25.93H571.9c16.24,0,30.46-10.18,36.22-25.93C614.19,523.31,609.57,505.39,596.36,494.22ZM587,532.17c-1,2.62-4.89,11.2-15.14,11.2H178.1c-10.25,0-14.18-8.58-15.14-11.2-2.22-6.06-2-14.71,5.18-20.8L365,345A15.19,15.19,0,0,1,385,345l196.9,166.33C589.07,517.46,589.26,526.11,587,532.17Z"></path>
        </svg>
      ),
      name: 'Register Piece',
      path: '/registerPiece',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 108.99 122.88"
          width="19"
          height="19"
          className=""
        >
          <g>
            <path d="M25.77,4.5l27.95,30.89L83.18,4.48c-0.42-0.26-0.91-0.42-1.44-0.42H61.61l-35.08,0.1C26.26,4.23,26,4.35,25.77,4.5 L25.77,4.5z M56.96,42.33v76.05h45.05c0.68,0,1.3-0.28,1.75-0.73c0.45-0.45,0.73-1.07,0.73-1.75V28.76c0-0.68-0.28-1.3-0.73-1.75 c-0.45-0.45-1.07-0.73-1.75-0.73H88.52c0.01,10.05-0.18,18.42-1.29,22.68c-1.47,5.66-6.3,3.54-10.14,1.91L56.96,42.33L56.96,42.33z M51.87,118.38V41.83L25.8,52.02c-2.38,0.93-4.38,0.14-4.69-6.16c-0.23-4.68-0.45-11.53-0.55-19.6c-0.11,0.02-0.22,0.02-0.33,0.02 H6.98c-0.68,0-1.3,0.28-1.75,0.73c-0.45,0.45-0.73,1.07-0.73,1.75v87.14c0,0.68,0.28,1.3,0.73,1.75c0.45,0.45,1.07,0.73,1.75,0.73 H51.87L51.87,118.38z M88.5,21.78h13.51c1.92,0,3.67,0.79,4.93,2.05c1.26,1.26,2.05,3.01,2.05,4.93v87.14 c0,1.92-0.78,3.67-2.05,4.93c-1.26,1.26-3.01,2.05-4.93,2.05H6.98c-1.92,0-3.67-0.78-4.93-2.05C0.78,119.57,0,117.82,0,115.9V28.76 c0-1.92,0.78-3.67,2.05-4.93c1.26-1.26,3.01-2.05,4.93-2.05h13.26c0.1,0,0.19,0.01,0.28,0.02c-0.03-4.74-0.02-9.82,0.05-15.06 c0-1.29,0.36-2.49,0.99-3.51c0.42-1.76,2-3.07,3.89-3.07l0.65,0c0.37-0.06,0.75-0.1,1.14-0.1V0.04h0.01h40.34L83.63,0v0 c0.96,0,1.93,0.34,2.7,1.05c0.73,0.67,1.15,1.53,1.27,2.44c0.53,0.96,0.84,2.07,0.84,3.25h0.02v0.01h-0.02 C88.43,11.88,88.47,16.97,88.5,21.78L88.5,21.78z M50.05,37.33L24.56,9.05v36.69c0,1.85,1.82,1.85,3.98,1.08 C34.77,44.61,46.9,38.79,50.05,37.33L50.05,37.33z M84.43,9.03L57.37,37.32l24.38,11.11c1.33,0.64,2.69-1.21,2.69-2.69V9.03 L84.43,9.03z M20.55,6.74L20.55,6.74L20.55,6.74z" />
          </g>
        </svg>
      ),
      name: 'Dendo Outfit',
      path: `/dendoOutfitGallery/${session?.user?.id}`,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          id="mirror"
          width="21"
          height="21"
          transform="scale(1.3,1)"
        >
          <path d="M29,41.752V56H24a3,3,0,0,0-3,3v2a1,1,0,0,0,1,1H42a1,1,0,0,0,1-1V59a3,3,0,0,0-3-3H35V41.752C44.61,40.155,52,31.009,52,20V18a1,1,0,0,0-2,0v1H47.955C47.49,9.541,40.522,2,32,2S16.51,9.541,16.045,19H14V18a1,1,0,0,0-2,0v2C12,31.009,19.39,40.155,29,41.752ZM41,59v1H23V59a1,1,0,0,1,1-1H40A1,1,0,0,1,41,59ZM33,42V56H31V42Zm-1-2c-9.621,0-17.481-8.438-17.954-19h2C16.51,30.459,23.478,38,32,38s15.49-7.541,15.955-17h2C49.481,31.562,41.621,40,32,40ZM32,4c7.72,0,14,7.178,14,16S39.72,36,32,36,18,28.822,18,20,24.28,4,32,4Z"></path>
        </svg>
      ),
      name: 'Verdict on Outfit',
      path: '/advise',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="list">
          <g data-name="Layer ">
            <g data-name="list">
              <circle cx="3" cy="7" r="1"></circle>
              <circle cx="3" cy="12" r="1"></circle>
              <circle cx="3" cy="17" r="1"></circle>
              <rect width="14" height="1" x="7" y="12" rx=".94" ry=".94"></rect>
              <rect width="14" height="1" x="7" y="17" rx=".94" ry=".94"></rect>
              <rect width="14" height="1" x="7" y="7" rx=".94" ry=".94"></rect>
            </g>
          </g>
        </svg>
      ),
      name: 'Wish List',
      path: '/wishList',
    },
  ];

  return (
    <nav className="flex flex-col flex-shrink-0 bg-richGreen  w-[280px] min-w-[280px] z-100 relative pt-2xl pb-2xl px-2xl drop-shadow-md min-h-[750px] tracking-tight h-screen overflow-hidden">
      <h1
        className={`text-white font-mainTitle text-[36px] leading-[32px] whitespace-nowrap -ml-1 ${titleFont.className}`}
      >
        Do I Have It?
      </h1>
      <div className="flex flex-col h-full justify-between">
        <ul className=" h-full pb-xl pt-[50px]">
          {navItems.map((item, index) => {
            const menuItemClassName =
              pathname.split('/')[1] === item.path.split('/')[1] ||
              (pathname.includes('wardrobe') && item.path.includes('wardrobe'))
                ? 'text-lighterOrange '
                : '';

            return (
              <>
                <li key={index} className={`inline-block text-white mb-lg relative ${menuItemClassName}`}>
                  <Link href={item.path} className="group group-hover:cursor-pointer">
                    <div className="flex items-center font-extraBold tracking-tighter">
                      <div
                        className={`h-[23px] w-[23px] flex items-center mr-5 ${
                          pathname !== '/'
                            ? item.path.includes(pathname.split('/')[1])
                              ? 'fill-lighterOrange stroke-lighterOrange'
                              : 'fill-white stroke-white'
                            : item.path === '/'
                              ? 'fill-lighterOrange stroke-lighterOrange'
                              : 'fill-white stroke-white'
                        } group-hover:fill-lighterOrange group-hover:stroke-lighterOrange`}
                      >
                        {item.icon ?? item.icon}
                      </div>
                      <span className={`${menuItemClassName} group-hover:text-lighterOrange text-base`}>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                  {pathname !== '/' ? (
                    item.path.includes(pathname.split('/')[1]) ? (
                      <div className="bg-lighterOrange rounded-lg absolute -top-3 -left-[5rem] w-10 h-[50px]"></div>
                    ) : (
                      <></>
                    )
                  ) : item.path === '/' ? (
                    <div className="bg-lighterOrange rounded-lg absolute -top-3 -left-[5rem] w-10 h-[50px]"></div>
                  ) : (
                    <></>
                  )}
                </li>
              </>
            );
          })}
        </ul>
        <div className=" mt-auto  text-white">
          <Link href="/settings" className="flex items-center  group ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              width="20"
              height="20"
              className=" mr-5 group-hover:stroke-lighterOrange"
            >
              <path
                strokeLinecap="square"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path strokeLinecap="square" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span
              className={`font-extraBold tracking-tighter text-base   ${settingClassName} group-hover:text-lighterOrange`}
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
