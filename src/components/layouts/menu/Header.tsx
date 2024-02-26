import { useSession } from 'next-auth/react';
import React from 'react';

import SearchInput from '@/components/elements/SearchInput';

import HeaderDropdownMenu from './HeaderDropdownMenu';

const Header = () => {
  const { data } = useSession();
  const userName = data?.user?.userName;

  return (
    <header className="w-full bg-gray h-[5%]">
      <nav className="flex justify-between items-center h-full">
        <SearchInput />
        <div className={` flex text-lg gap-2`}>
          <p>Hello, {userName}</p>
          <HeaderDropdownMenu></HeaderDropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
