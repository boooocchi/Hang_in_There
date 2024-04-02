import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';
import React from 'react';

const HeaderDropdownMenu = () => {
  const handleSignout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };
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
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={12}
          align="end"
          className=" text-richGreen text-base overflow-hidden rounded-md  bg-lightGreen "
        >
          <DropdownMenu.Item className="hover:outline-none outline-none px-md hover:duration-300 py-sm  hover:bg-lighterOrange font-normal text-center">
            Account
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none px-md hover:duration-300  hover:outline-none  py-sm  hover:bg-lighterOrange font-normal text-center">
            <button onClick={handleSignout}>Logout</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HeaderDropdownMenu;
