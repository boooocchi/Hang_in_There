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
    defaultValues: {
      email: '',
      password: '',
    },
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
    <div className=" flex flex-col items-center gap-3 w-1/2">
      <div className="flex gap-3 items-center pb-md">
        <h1 className="text-2xl font-bold">Sign in</h1>
        {errorMessage && <p className={`text-errorRed  `}>{errorMessage}</p>}
      </div>
      <form className="flex flex-col gap-4 w-full  justify-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-3">
          <Input register={register('email')} name="email" errorMessage={errors.email?.message}></Input>
          <Input register={register('password')} name="password" errorMessage={errors.password?.message}></Input>
        </div>
        <Button loading={isLoading}>Sign in</Button>
      </form>

      <p className="text-center">or</p>
      <div className="w-full">
        <button className="w-full" onClick={handleGoogleSignin}>
          <p className="flex items-center justify-center gap-3 w-full">
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
  );
};

export default SigninForm;
