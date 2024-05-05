import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import Input from '@/components/elements/form/Input';
import { GoogleIcon } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';
import { getErrorMessage } from '@/utils/errorHandler';

import { signinValidationSchema } from '../validation/signinValidationSchema';

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
  const { addToastMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

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
    resolver: yupResolver(signinValidationSchema),
  });

  const { register, handleSubmit, formState } = form;
  const errors: CustomError = formState.errors;

  const onSubmit = async (data: SigninFormValues) => {
    setIsLoading(true);

    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
    } catch (err) {
      addToastMessage(getErrorMessage(err), true);
    } finally {
      setIsLoading(false);
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
    <div className="xs:h-full h-[500px] flex justify-center items-center xs:w-1/2 w-4/5 rounded-lg bg-darkGray p-md">
      <div className="xs:w-1/2 w-full flex flex-col justify-center items-center  gap-3">
        <div className="flex gap-3 items-center xs:mb-md mb-xs">
          <h1 className="text-2xl font-bold">Sign in</h1>
          {errorMessage && <p className={`text-errorRed  `}>{errorMessage}</p>}
        </div>
        <form className="flex flex-col gap-4 w-full  justify-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-md">
            <Input register={register('email')} name="email" errorMessage={errors.email?.message}></Input>
            <Input register={register('password')} name="password" errorMessage={errors.password?.message}></Input>
          </div>
          <Button loading={isLoading}>Sign in</Button>
        </form>

        <p className="text-center">or</p>
        <div className="w-full">
          <button className="w-full" onClick={handleGoogleSignin}>
            <p className="flex items-center justify-center gap-2">
              <GoogleIcon />
              Sign in with Google
            </p>
          </button>
        </div>
        <div className="flex justify-end">
          <Link href="/auth/signup" className="underline  hover:text-accentOrange">
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
