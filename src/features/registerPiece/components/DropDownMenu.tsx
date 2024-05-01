import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React from 'react';

import ErrorMessage from '@/components/elements/message/ErrorMessage';

type DropDownMenuProps = {
  name: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ name, options, onChange, error, defaultValue, disabled }) => {
  const handleValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="relative w-1/2  text-base unstyled ">
      <h2 className="mb-2">{name}</h2>
      <Select.Root onValueChange={handleValueChange} disabled={disabled ? disabled : false}>
        <Select.Trigger className="border-1 border-middleGreen w-full flex py-sm px-md justify-between relative outline-none items-center select-trigger font-normal ">
          <Select.Value
            placeholder={defaultValue ? defaultValue : 'Select...'}
            defaultValue={defaultValue ?? defaultValue}
          />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className=" rounded-b-md overflow-hidden border-none  outline-none focus:outline-none relative overflow-y-auto max-h-[200px] z-10 w-[--radix-select-trigger-width] select-content shadow-lg bg-darkGray"
            position="popper"
          >
            {options.map((option, index) => {
              return (
                <Select.Item
                  key={index}
                  value={option}
                  className="w-ful px-md py-sm border-none flex items-center outline-none justify-between cursor-pointer hover:text-gray  hover:bg-lighterOrange font-normal text-base"
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
