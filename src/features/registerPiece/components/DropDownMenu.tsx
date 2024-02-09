import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React from 'react';

import ErrorMessage from '@/components/elements/message/ErrorMessage';

type DropDownMenuProps = {
  name: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ name, options, onChange, error }) => {
  const handleValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="relative w-1/2  text-base unstyled ">
      <h2 className="mb-2">{name}</h2>
      <Select.Root onValueChange={handleValueChange}>
        <Select.Trigger className="border-1 border-lightGreen w-full flex py-xs p-sm justify-between relative outline-none items-center select-trigger font-normal bg-lightGreen ">
          <Select.Value placeholder="Select..." />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className=" rounded-b-md overflow-hidden border-none  outline-none focus:outline-none relative overflow-y-auto max-h-[200px] z-10 w-[--radix-select-trigger-width] select-content "
            position="popper"
          >
            {options.map((option, index) => {
              return (
                <Select.Item
                  key={index}
                  value={option}
                  className="w-full bg-lightGreen p-sm py-xs border-none flex items-center hover:text-richGreen outline-none justify-between text-base cursor-pointer  hover:bg-lightOrange font-normal"
                >
                  <Select.ItemText className="border-none">{option}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <div className="relative">
        <ErrorMessage positionFromTop="top-[3px]">{error}</ErrorMessage>
      </div>
    </div>
  );
};

export default DropDownMenu;
