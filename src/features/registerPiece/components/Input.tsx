import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import ErrorMessage from '@/components/elements/message/ErrorMessage';

type InputProps = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  name: string;
  placeholder?: string;
  handleFocus?: (inputName: string) => void;
  handleBlur?: (inputName: string) => void;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  register,
  errorMessage,
  name,
  placeholder,
  handleFocus,
  handleBlur,
  disabled,
}) => {
  return (
    <>
      <div className="flex flex-col  group z-0 mb-4 relative w-full">
        <label htmlFor={name} className={` text-base mb-1`}>
          {name}
        </label>
        <input
          type="text"
          id={name}
          className=" rounded-md border-1 bg-lightGreen border-lightGreen py-xs px-sm relative text-base"
          placeholder={placeholder ?? name}
          {...register}
          onFocus={() => handleFocus && handleFocus(name)}
          onBlur={() => handleBlur && handleBlur(name)}
          disabled={disabled}
        />
        <div className="relative">
          <ErrorMessage positionFromTop="top-[3px]">{errorMessage}</ErrorMessage>
        </div>
      </div>
    </>
  );
};

export default Input;
