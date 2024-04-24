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
};

const Input: React.FC<InputProps> = ({ register, errorMessage, name, placeholder, handleFocus, handleBlur }) => {
  return (
    <div className="flex flex-col w-full relative group z-0 mb-lg">
      <input
        type="text"
        id={name}
        className="rounded-md w-full relative top-1 appearance-none peer border-0 text-deepGreen px-md py-sm focus:outline-none bg-transparent"
        placeholder=" "
        {...register}
        onFocus={() => handleFocus && handleFocus(name)}
        onBlur={() => handleBlur && handleBlur(name)}
      />
      <label
        htmlFor={name}
        className={`  ml-3 test-black origin-[0] -z-10  absolute duration-300 
        transform -translate-y-4
        peer-focus:-translate-y-4
        peer-placeholder-shown:scale-[100%]
        peer-placeholder-shown:translate-y-1  text-deepGreen peer-focus:text-accentOrange`}
      >
        {placeholder ?? name}
      </label>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default Input;
