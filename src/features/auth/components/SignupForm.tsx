import { useMutation, gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

import Loading from '@/components/elements/message/Loading';
import { subFont } from '@/constants/FontFamily';

import { signinValidationSchema } from '../validation/signinValidationSchema';

import Input from './Input';

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
    <div className="flex flex-col gap-3 h-full">
      <h1 className={`${subFont.className} text-2xl pb-5`}>Sign up</h1>
      <form className="flex flex-col gap-3  justify-center" onSubmit={handleSubmit(onSubmit)}>
        <Input register={register('name')} name="name" errorMessage={errors.name?.message}></Input>
        <Input register={register('email')} name="email" errorMessage={errors.email?.message}></Input>
        <Input register={register('password')} name="password" errorMessage={errors.password?.message}></Input>
        <Input
          register={register('passwordConfirmation')}
          name="passwordConfirmation"
          errorMessage={errors.samePassword?.message}
          placeholder="Password Confirmation"
        ></Input>
        <button
          className={`${subFont.className} border border-white p-sm px-md hover:bg-white transition duration-200  `}
        >
          {loading ? <Loading /> : 'Sign up'}
        </button>
        {error && <p className="text-red-500">{error.message}</p>}
        <p className={`${subFont.className} text-center`}>or</p>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className={`${subFont.className} border border-white w-full p-sm px-md hover:bg-white transition duration-200 `}
        >
          <p className="flex items-center justify-center gap-3">
            Sign up with Google
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.25" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </p>
        </button>
      </form>
      <div className="flex justify-end">
        <Link href="/auth/signin" className={`underline ${subFont.className} hover:text-accentOrangeRed`}>
          already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
