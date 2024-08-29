import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { titleFont } from '@/constants/FontFamily'
import {
  DashboardIcon,
  WardrobeIcon,
  RegisterIcon,
  DendoOutfitIcon,
  SuggestionIcon,
  SettingIcon,
  ListIcon
} from '@/constants/icons/icons'
import { useAuth } from '@/hooks/useAuth'
import { isItemBgColor } from '@/utils/utils'

const SideMenu = ({
  isSideMenuOpen,
  setIsSideMenuOpen
}: {
  isSideMenuOpen?: boolean
  setIsSideMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { pathname } = useRouter()
  const { userId } = useAuth()
  const settingClassName = pathname === '/settings' ? 'bg-lighterGreen' : ''

  const navItems = [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      path: '/',
      pathname: '/'
    },
    {
      icon: <WardrobeIcon />,
      name: 'Wardrobe',
      path: `/wardrobe/${userId}`,
      pathname: 'wardrobe'
    },
    {
      icon: <RegisterIcon />,
      name: 'Register Piece',
      path: '/registerPiece',
      pathname: 'registerpiece'
    },
    {
      icon: <DendoOutfitIcon />,
      name: 'Dendo Outfit',
      path: `/dendoOutfitGallery/${userId}`,
      pathname: 'dendooutfit'
    },
    {
      icon: <SuggestionIcon />,
      name: 'Suggestion by AI',
      path: '/suggestion',
      pathname: 'suggestion'
    },
    {
      icon: <ListIcon />,
      name: 'Wish List',
      path: '/wishList',
      pathname: 'wishlist'
    }
  ]

  return (
    <>
      <nav
        className={`z-10 w-full flex flex-col flex-shrink-0  bg-middleGreen xs:w-[280px] xs:min-w-[280px]  xs:relative xs:py-2xl pt-2xl pb-xl px-xl shadow-[10px_15px_10px_-5px_rgba(0,0,0,0.3)] tracking-tight xs:h-screen xs:min-h-[750px] xs:max-h-[780px] h-[600px] overflow-hidden xs:rounded-[30px] z-15 xs:ml-sm  ${isSideMenuOpen ? 'max-xs:top-0 max-xs:opacity-100' : 'max-xs:top-10'}`}
      >
        <h1
          className={`flex items-baseline gap-2 text-gray font-mainTitle text-[35px] leading-[32px] whitespace-nowrap w-full justify-center ${titleFont.className}`}
        >
          <span>
            Hang <span className="text-xl">in</span> There
          </span>
        </h1>
        <div className="flex flex-col h-full justify-between">
          <ul className="h-full  xs:pt-[40px] pt-lg flex flex-col gap-md">
            {navItems.map((item, index) => {
              const menuItemColor = isItemBgColor(item.pathname, pathname)
              return (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={cn(
                      'rounded-md py-sm px-md text-gray relative xs:w-full group group-hover:cursor-pointer w-full h-full  flex  xs:justify-start',
                      {
                        'bg-lighterGreen': menuItemColor
                      }
                    )}
                  >
                    <div className="flex items-center font-bolder tracking-tighter">
                      <div
                        className={`h-[21px] w-[21px] flex items-center mr-5 fill-gray stroke-gray
                   group-hover:fill-lighterOrange group-hover:stroke-lighterOrange`}
                      >
                        {item.icon ?? item.icon}
                      </div>
                      <span className={`${menuItemColor} group-hover:text-lighterOrange text-base`}>{item.name}</span>
                    </div>
                  </Link>
                  {menuItemColor && (
                    <div className=" xs:block bg-lighterOrange rounded-xl absolute -top-1 -left-[65px] w-10 h-[50px]"></div>
                  )}
                </li>
              )
            })}
          </ul>
          <Link
            href="/settings"
            className={`mt-auto  text-gray w-full py-sm px-md flex items-center rounded-md group ${settingClassName}`}
          >
            <SettingIcon />
            <span className="font-bolder tracking-tighter text-base group-hover:text-lighterOrange">Settings</span>
          </Link>
        </div>
      </nav>
      <button
        className="xs:hidden fixed h-svh w-screen bg-[rgba(1,1,1,0.3)] z-10"
        onClick={() => {
          setIsSideMenuOpen && setIsSideMenuOpen(false)
          document.body.style.overflow = 'auto'
        }}
      ></button>
    </>
  )
}
export default SideMenu
