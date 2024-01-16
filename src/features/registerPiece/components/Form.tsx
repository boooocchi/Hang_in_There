import { useMutation, gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors, Categories } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import ErrorMessage from '@/components/elements/message/ErrorMessage';
import { subFont } from '@/constants/FontFamily';

import { registerPieceValidationSchema } from '../validation/registerPieceValidationSchema';

import DropDownMenu from './DropDownMenu';
import DropZone from './DropZone';
import Input from './Input';

type RegisterPieceValues = {
  title: string;
  description?: string;
  location?: string;
  price?: number | null;
  color: Colors | null;
  category: Categories | null;
};

interface GraphQLError {
  message: string;
}
interface GraphQLException {
  graphQLErrors: GraphQLError[];
  networkError?: Error;
}

const REGISTER_PIECE_MUTATION = gql`
  mutation Mutation(
    $title: String!
    $color: Colors!
    $category: Categories!
    $userId: String!
    $description: String
    $location: String
    $price: Float
  ) {
    register_piece(
      title: $title
      color: $color
      category: $category
      userId: $userId
      description: $description
      location: $location
      price: $price
    ) {
      title
    }
  }
`;

const Form = () => {
  const { data: authData } = useSession();
  const userId = authData?.user?.id;

  const [registerPiece] = useMutation(REGISTER_PIECE_MUTATION);
  const form = useForm<RegisterPieceValues>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: null,
      color: null,
      category: null,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: yupResolver(registerPieceValidationSchema),
  });

  const { register, handleSubmit, formState, control, trigger } = form;
  const errors = formState.errors;

  const onSubmit = async (data: RegisterPieceValues) => {
    const colorValidation = await trigger('color');
    const categoryValidation = await trigger('category');

    if (colorValidation && categoryValidation) {
      try {
        await registerPiece({
          variables: {
            title: data.title,
            description: data.description,
            location: data.location,
            price: data.price,
            color: data.color,
            category: data.category,
            userId: userId,
          },
        });
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
    }
  };
  return (
    <div className="w-full h-full tracking-wide">
      <form className="flex gap-2xl w-full h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col   ${subFont.className} w-1/2 h-full`}>
          <Input
            register={register('title')}
            name="Title *"
            errorMessage={errors.title?.message}
            placeholder="ex. Fleece Jacket"
          ></Input>
          <div className="flex justify-between gap-8">
            <Input
              register={register('location')}
              name="Location"
              placeholder="ex. downtown MUJI"
              errorMessage={errors.location?.message}
            ></Input>
            <Input
              register={register('price')}
              name="Price"
              errorMessage={errors.price?.message}
              placeholder="ex. 38.5"
            ></Input>
          </div>
          <div className="flex justify-between gap-8 mb-xl">
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <DropDownMenu
                  name="Color"
                  options={Object.values(Colors)}
                  onChange={(selectedValue) => {
                    field.onChange(selectedValue);
                  }}
                  error={errors.color?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <DropDownMenu
                  name="Category"
                  options={Object.values(Categories)}
                  onChange={(selectedValue) => {
                    field.onChange(selectedValue);
                  }}
                  error={errors.category?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="description" className={`${subFont.className} text-base tracking-wide`}>
              Description
            </label>
            <textarea
              {...register('description')}
              name="description"
              id="description"
              className="border-deepGreen border rounded-md h-full flex-grow p-sm"
              placeholder="Warm winter down jacket"
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>
        </div>
        <div className="flex flex-col w-1/2  h-full ">
          <DropZone className="w-full outline-[2px]  outline-dashed outline-richGreen h-full  flex flex-col justify-center overflow-hidden items-center p-lg rounded-md mb-xl"></DropZone>
          <Button>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
