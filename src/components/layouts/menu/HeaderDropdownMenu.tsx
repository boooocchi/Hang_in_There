import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';

import { subFont } from '@/constants/FontFamily';

const HeaderDropdownMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#00110F" viewBox="0 0 24 24" className="w-6 h-6">
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>{' '}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={10} align="end" className="border-2 border-deepGreen px-md py-sm rounded-sm">
          <DropdownMenu.Item className={`${subFont.className} text-lg`}>Account</DropdownMenu.Item>
          <DropdownMenu.Item className={`${subFont.className} text-lg`}>Logout</DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-deepGreen" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HeaderDropdownMenu;
