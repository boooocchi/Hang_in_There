import { useSession } from 'next-auth/react';
import React from 'react';

import { MenuIcon } from '@/components/elements/icons/icons';
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
      <nav className="flex xs:justify-between justify-end items-center h-full">
        <button
          className="xs:flex gap-2 items-center text-sm py-xs px-sm rounded-md border-1 border-middleGreen w-[200px] hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#11655b"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="square"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          search your wardrobe..
        </button>
        <div className="xs:flex text-lg gap-0 mr-5 hidden">
          <p className="mr-3">Hello, {userName}</p>
          <HeaderDropdownMenu></HeaderDropdownMenu>
        </div>
        <button className="xs:hidden mr-xs relative z-[15]" onClick={() => setIsSideMenuOpen((prev) => !prev)}>
          <MenuIcon style={`${isSideMenuOpen ? 'stroke-gray' : 'stroke-middleGreen'} h-6 w-6`} />
        </button>
      </nav>
      {Modal}
      <div
        className={`w-full fixed z-10 xs:hidden max-xs:duration-300  max-xs:right-0  ${isSideMenuOpen ? 'max-xs:top-0 max-xs:opacity-100' : 'max-xs:top-10 pointer-events-none max-xs:opacity-0'}`}
      >
        <SideMenu isSideMenuOpen={isSideMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
