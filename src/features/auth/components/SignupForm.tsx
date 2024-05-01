import { useMutation, gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import Input from '@/components/elements/form/Input';
import { GoogleIcon } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';

import { signinValidationSchema } from '../validation/signinValidationSchema';

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

interface CustomError extends FieldErrors<SignupFormValues> {
  samePassword?: { message: string; type: string; ref?: React.RefObject<HTMLInputElement> };
}

interface GraphQLError {
  message: string;
}

interface GraphQLException {
  graphQLErrors: GraphQLError[];
  networkError?: Error;
}

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $userName: String!) {
    signup(email: $email, password: $password, userName: $userName) {
      user {
        id
        email
        userName
      }
    }
  }
`;

const SignupForm = () => {
  const router = useRouter();
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(signinValidationSchema),
  });

  const { register, handleSubmit, formState } = form;
  const errors: CustomError = formState.errors;

  const onSubmit = async (data: SignupFormValues) => {
    const { name, email, password } = data;
    try {
      await signup({
        variables: {
          userName: name,
          email,
          password,
        },
      });
      router.push('/auth/signin');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'graphQLErrors' in error) {
        const graphQLError = error as GraphQLException;
        if (graphQLError.graphQLErrors.length > 0) {
          const message = graphQLError.graphQLErrors[0].message;
          console.error(message);
        }
      } else if (error instanceof Error) {
        console.error('An unexpected error occurred:', error.message);
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" flex flex-col items-center gap-3 w-1/2">
      <h1 className={` text-2xl font-bold mb-md`}>Sign up</h1>
      <form className="flex flex-col gap-4  justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Input register={register('name')} name="name" errorMessage={errors.name?.message}></Input>
          <Input register={register('email')} name="email" errorMessage={errors.email?.message}></Input>
          <Input register={register('password')} name="password" errorMessage={errors.password?.message}></Input>
          <Input
            register={register('passwordConfirmation')}
            name="passwordConfirmation"
            errorMessage={errors.samePassword?.message}
            placeholder="Password Confirmation"
          />
        </div>
        <Button style="w-full mt-1">{loading ? <Loading /> : 'Sign up'}</Button>
        {error && <p className="text-red-500">{error.message}</p>}
      </form>
      <p className={` text-center`}>or</p>
      <button type="button" onClick={handleGoogleSignup} className="border-gray w-full transition duration-300">
        <p className="flex items-center justify-center gap-2">
          <GoogleIcon />
          Sign up with Google
        </p>
      </button>
      <div className="flex justify-end">
        <Link href="/auth/signin" className="underline  hover:text-accentOrange">
          already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
