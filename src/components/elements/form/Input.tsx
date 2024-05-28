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
  label?: string;
};

const Input: React.FC<InputProps> = ({
  register,
  errorMessage,
  name,
  placeholder,
  handleFocus,
  handleBlur,
  disabled,
  label,
}) => {
  return (
    <>
      <div className="flex flex-col group relative w-full">
        {label && (
          <label htmlFor={name} className={` text-base mb-1`}>
            {label}
          </label>
        )}
        <input
          type={name.includes('password') ? 'password' : 'text'}
          id={name}
          className="rounded-md border-1 bg-darkGray border-middleGreen  py-sm px-md relative"
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
