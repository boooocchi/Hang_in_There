import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React from 'react';

import ErrorMessage from '@/components/elements/message/ErrorMessage';
import { subFont } from '@/constants/FontFamily';

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
    <div className={`${subFont.className} relative w-[220px]`}>
      <h2>{name}</h2>
      <Select.Root onValueChange={handleValueChange}>
        <Select.Trigger className="border border-deepGreen w-full flex py-xs p-sm justify-between relative outline-none items-center select-trigger">
          <Select.Value placeholder="Select..." />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          position="popper"
          sideOffset={0}
          className="bg-white  w-[220px] border-deepGreen border border-t-0  rounded-b-md overflow-hidden outline-none focus:outline-none relative overflow-y-auto max-h-[200px] z-10"
        >
          {options.map((option, index) => {
            return (
              <Select.Item
                key={index}
                value={option}
                className="w-full bg-white p-sm py-xs border-none hover:bg-richGreen flex items-center hover:text-white outline-none justify-between "
              >
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
      <div className="relative">
        <ErrorMessage top>{error}</ErrorMessage>
      </div>
    </div>
  );
};

export default DropDownMenu;
