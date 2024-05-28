import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';

import { EllipsisIcon } from '@/constants/icons/icons';
type PullDownProps = {
  deleteHandler: () => void;
};

const PullDownMenu: React.FC<PullDownProps> = ({ deleteHandler }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="focus:outline-none relative">
          <EllipsisIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={3}
          align="end"
          className="text-base overflow-hidden rounded-md shadow-md  bg-gray mr-1 flex flex-col items-center"
        >
          <button onClick={deleteHandler}>
            <DropdownMenu.Item className="bg-gray outline-none px-md hover:duration-300  hover:outline-none  text-sm  py-sm  hover:bg-lighterOrange font-normal text-center hover:text-gray">
              Delete
            </DropdownMenu.Item>
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PullDownMenu;
