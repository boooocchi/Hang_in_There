import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';
import React from 'react';

import { EllipsisIcon } from '@/components/elements/icons/icons';
type PullDownProps = {
  deleteHandler: () => void;
};

const PullDownMenu: React.FC<PullDownProps> = ({ deleteHandler }) => {
  const handleSignout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="focus:outline-none relative z-[99]">
          <EllipsisIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={3}
          align="end"
          className=" text-richGreen text-base overflow-hidden rounded-md  bg-lightGreen mr-1 flex flex-col items-center"
        >
          <button onClick={handleSignout} className="w-full">
            <DropdownMenu.Item className="w-full hover:outline-none outline-none px-md hover:duration-300 py-sm text-sm hover:bg-lighterOrange border-r-1 border-richGreen font-normal text-center">
              Edit
            </DropdownMenu.Item>
          </button>
          <button onClick={deleteHandler}>
            <DropdownMenu.Item className="outline-none px-md hover:duration-300  hover:outline-none  text-sm  py-sm  hover:bg-lighterOrange font-normal text-center">
              Delete
            </DropdownMenu.Item>
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PullDownMenu;
