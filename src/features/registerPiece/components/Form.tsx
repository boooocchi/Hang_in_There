import { useMutation, gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors, Categories } from '@prisma/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import ErrorMessage from '@/components/elements/message/ErrorMessage';
import Loading from '@/components/elements/message/Loading';
import { GET_WARDROBE_QUERY } from '@/pages/wardrobe/[id]/index';

import { uploadPhoto } from '../utils/uploadImage';
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
  imageUrl?: string;
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
    $imageUrl: String!
  ) {
    register_piece(
      title: $title
      color: $color
      category: $category
      userId: $userId
      description: $description
      location: $location
      price: $price
      imageUrl: $imageUrl
    ) {
      title
    }
  }
`;

const Form = () => {
  const { data: authData } = useSession();
  const userId = authData?.user?.id;
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = React.useState(false);

  const router = useRouter();

  const [registerPiece] = useMutation(REGISTER_PIECE_MUTATION);
  const form = useForm<RegisterPieceValues>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: null,
      color: null,
      category: null,
      imageUrl: '',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: yupResolver(registerPieceValidationSchema),
  });

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    form.setValue('imageUrl', imageUrl);
  };

  const { register, handleSubmit, formState, control, trigger } = form;
  const errors = formState.errors;

  const onSubmit = async (data: RegisterPieceValues) => {
    setUploadLoading(true);
    const colorValidation = await trigger('color');
    const categoryValidation = await trigger('category');
    const imageUploadResponse = await uploadPhoto(imageFile);

    if (!imageUploadResponse.success) {
      console.error('Image upload failed: ', imageUploadResponse.message);
      return;
    }

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
            imageUrl: data.imageUrl,
            userId: userId,
          },
          refetchQueries: [
            {
              query: GET_WARDROBE_QUERY,
              variables: { userId: userId, category: data.category },
            },
          ],
        });
        setUploadLoading(false);
        router.push(`/wardrobe/${userId}`);
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
    <div className="w-full h-full mt-3">
      <form className="flex gap-3xl w-full h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col    w-[45%] h-full">
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
            <label htmlFor="description" className={` text-base mb-2`}>
              Description
            </label>
            <textarea
              {...register('description')}
              name="description"
              id="description"
              className="bg-lightGreen rounded-md h-full flex-grow p-sm textarea"
              placeholder="ex. Warm winter down jacket"
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>
        </div>
        <div className="flex flex-col w-1/2  h-full pr-[1px]">
          <DropZone
            className="outline-[2px]  outline-dashed outline-lightGreen h-full  flex flex-col  justify-center overflow-hidden items-center mr-1 p-lg rounded-md mb-xl"
            handleFileSelect={handleFileSelect}
            deleteFile={() => {
              setImageFile(null);
              form.setValue('imageUrl', '');
            }}
          ></DropZone>
          <div className="relative">
            <ErrorMessage dropzone>{errors.imageUrl?.message}</ErrorMessage>
          </div>
          <Button>{uploadLoading ? <Loading /> : 'Register'}</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
