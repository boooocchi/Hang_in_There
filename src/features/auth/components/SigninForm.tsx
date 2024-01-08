import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

import { subFont } from '@/constants/FontFamily';

import Input from './Input';

type SigninFormValues = {
  email: string;
  password: string;
};

interface CustomError extends FieldErrors<SigninFormValues> {
  samePassword?: { message: string; type: string; ref?: React.RefObject<HTMLInputElement> };
}

const SigninForm = () => {
  const router = useRouter();
  const error = router.query.error;

  let errorMessage;
  if (error) {
    switch (error) {
      case 'CredentialsSignin':
        errorMessage = 'Invalid email or password';
        break;
      default:
        errorMessage = 'Something went wrong';
        break;
    }
  }

  const form = useForm<SigninFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const errors: CustomError = formState.errors;

  const onSubmit = async (data: SigninFormValues) => {
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signIn('google', { callbackUrl: `/` });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex gap-3 items-center pb-md">
        <h1 className={`${subFont.className} text-2xl `}>Sign in</h1>{' '}
        {errorMessage && <p className={`text-errorRed  ${subFont.className}`}>{errorMessage}</p>}
      </div>
      <form className="flex flex-col gap-3  justify-center " onSubmit={handleSubmit(onSubmit)}>
        <Input register={register('email')} name="email" errorMessage={errors.email?.message}></Input>
        <Input register={register('password')} name="password" errorMessage={errors.password?.message}></Input>
        <div>
          <button
            className={`${subFont.className} border border-white p-sm px-md w-full hover:bg-white transition duration-200`}
          >
            Sign in
          </button>
        </div>
      </form>

      <p className={`${subFont.className} text-center `}>or</p>
      <button
        type="button"
        onClick={handleGoogleSignin}
        className={`${subFont.className} border border-white w-full p-sm px-md hover:bg-white transition duration-200 `}
      >
        <p className="flex items-center justify-center gap-3">
          Sign in with Google
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.25" viewBox="0 0 488 512">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
        </p>
      </button>
    </div>
  );
};

export default SigninForm;
