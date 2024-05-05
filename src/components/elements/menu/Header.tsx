import { useSession } from 'next-auth/react';
import React from 'react';

import { MenuIcon } from '@/components/elements/icons/icons';
import { titleFont } from '@/constants/FontFamily';
import { useSearch } from '@/hooks/useSearchModal';

import HeaderDropdownMenu from './HeaderDropdownMenu';
import SideMenu from './SideMenu';

const Header = () => {
  const { data } = useSession();
  const userName = data?.user?.userName;

  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState<boolean>(false);

  const { setIsModalOpen, Modal } = useSearch();
  return (
    <header className="w-full">
      <nav className="flex justify-between h-full items-center">
        <div className="flex items-center">
          <div className="xs:hidden flex items-center">
            <HeaderDropdownMenu />
          </div>
          <button
            className="xs:flex gap-2 items-center text-sm py-xs px-sm rounded-md border-1  max-xs:border-none xs:border-middleGreen xs:w-[180px]"
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#11655b"
              className="xs:w-4 xs:h-4 w-5 h-5"
            >
              <path
                strokeLinecap="square"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span className="xs:flex hidden">search your wardrobe..</span>
          </button>
        </div>
        <h1 className={`xs:hidden flex ${titleFont.className} text-2xl items-baseline max-xs:mr-md`}>
          Hang<span className="text-lg">&nbsp; in &nbsp;</span>There
        </h1>
        <div className="xs:flex text-lg gap-0 mr-1 hidden items-center">
          <p className="mr-3">Hello, {userName}</p>
          <HeaderDropdownMenu />
        </div>
        <button
          className="xs:hidden mr-xs relative z-[11]"
          onClick={() => {
            setIsSideMenuOpen((prev) => !prev);
            if (typeof window != 'undefined' && window.document) {
              if (!isSideMenuOpen) document.body.style.overflow = 'hidden';
              else document.body.style.overflow = 'auto';
            }
          }}
        >
          <MenuIcon style={`${isSideMenuOpen ? 'stroke-gray' : 'stroke-middleGreen'} h-6 w-6`} />
        </button>
      </nav>
      {Modal}
      <div
        className={`w-full fixed z-10 xs:hidden max-xs:duration-300  max-xs:right-0  ${isSideMenuOpen ? 'max-xs:top-0 max-xs:opacity-100' : 'max-xs:top-10 pointer-events-none max-xs:opacity-0'}`}
      >
        <SideMenu isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
