import { useSession } from 'next-auth/react';
import React from 'react';

import { useSearch } from '@/hooks/useSearch';

import HeaderDropdownMenu from './HeaderDropdownMenu';

const Header = () => {
  const { data } = useSession();
  const userName = data?.user?.userName;

  const { setIsModalOpen, Modal } = useSearch();

  return (
    <header className="w-full bg-gray h-[5%]">
      <nav className="flex justify-between items-center h-full">
        <button
          className="flex gap-2 items-center text-sm p-xs px-sm bg-lightGreen rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00110F"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="square"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          search your wardrobe..
        </button>
        <div className={` flex text-lg gap-2`}>
          <p>Hello, {userName}</p>
          <HeaderDropdownMenu></HeaderDropdownMenu>
        </div>
      </nav>
      {Modal}
    </header>
  );
};

export default Header;
