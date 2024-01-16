import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import ErrorMessage from '@/components/elements/message/ErrorMessage';
import { subFont } from '@/constants/FontFamily';

type InputProps = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  name: string;
  placeholder?: string;
  handleFocus?: (inputName: string) => void;
  handleBlur?: (inputName: string) => void;
};

const Input: React.FC<InputProps> = ({ register, errorMessage, name, placeholder, handleFocus, handleBlur }) => {
  return (
    <>
      <div
        className={`flex flex-col   group z-0 mb-xl relative ${
          name === 'Location' || name === 'Price' ? 'w-[220px]' : 'w-full'
        }`}
      >
        <label htmlFor={name} className={`${subFont.className} text-base `}>
          {name}
        </label>
        <input
          type="text"
          id={name}
          className="border-b border-deepGreen rounded-sm px-sm tracking-wide relative"
          placeholder={placeholder ?? name}
          {...register}
          onFocus={() => handleFocus && handleFocus(name)}
          onBlur={() => handleBlur && handleBlur(name)}
        />
        <div className="relative">
          <ErrorMessage top>{errorMessage}</ErrorMessage>
        </div>
      </div>
    </>
  );
};

export default Input;
