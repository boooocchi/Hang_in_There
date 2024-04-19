import { useMutation, gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors, Categories } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import ErrorMessage from '@/components/elements/message/ErrorMessage';
import Loading from '@/components/elements/message/Loading';
import { useToast } from '@/contexts/ToastContext';
import { PieceDetailSectionProps } from '@/features/piece/components/PieceDetailSection';
import { useAuth } from '@/hooks/useAuth';
import { GET_PIECE_QUERY } from '@/pages/piece/[id]/index';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';
import { getErrorMessage } from '@/utils/errorHandler';
import { dateFormatter } from '@/utils/utils';

import { REGISTER_PIECE_MUTATION } from '../graphql/mutation';
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

type PieceData = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  color: Colors;
  category: Categories;
  imageUrl: string;
  createdAt: string;
};

type WardrobeQueryData = {
  piece: PieceData[];
};

type RegisterPieceMutationData = {
  piece: PieceData; // Assuming it returns a single wardrobe item
};

const UPDATE_PIECE_MUTATION = gql`
  mutation Update_piece(
    $id: String!
    $title: String!
    $color: Colors!
    $category: Categories!
    $imageUrl: String!
    $description: String
    $location: String
    $price: Float
  ) {
    update_piece(
      id: $id
      title: $title
      color: $color
      category: $category
      imageUrl: $imageUrl
      description: $description
      location: $location
      price: $price
    ) {
      title
    }
  }
`;

const Form: React.FC<PieceDetailSectionProps> = ({ pieceData, editMode = true, setEditMode }) => {
  const { userId } = useAuth();
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = React.useState(false);

  const { addToastMessage } = useToast();

  useEffect(() => {
    if (pieceData && setEditMode) setEditMode(false);
  }, [pieceData, setEditMode]);

  const router = useRouter();

  const [registerPiece] = useMutation<RegisterPieceMutationData>(REGISTER_PIECE_MUTATION, {
    update: (cache, { data }) => {
      if (data) {
        const existingData: WardrobeQueryData | null = cache.readQuery({
          query: GET_All_PIECES_QUERY,
        });

        if (existingData) {
          cache.writeQuery({
            query: GET_All_PIECES_QUERY,
            data: { piece: [data.piece, ...existingData.piece] },
          });
        }
      }
    },
  });

  const [updatePiece] = useMutation(UPDATE_PIECE_MUTATION);
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

  const { register, handleSubmit, formState, control, trigger, setValue } = form;

  React.useEffect(() => {
    if (pieceData?.piece === undefined) return;
    setValue('title', pieceData.piece.title);
    setValue('description', pieceData.piece.description);
    setValue('location', pieceData.piece.location);
    setValue('price', pieceData.piece.price);
    setValue('color', pieceData.piece.color);
    setValue('category', pieceData.piece.category);
    setValue('imageUrl', pieceData.piece.imageUrl);
  }, [pieceData, setValue]);

  const errors = formState.errors;

  const onSubmit = async (data: RegisterPieceValues) => {
    setUploadLoading(true);
    const colorValidation = await trigger('color');
    const categoryValidation = await trigger('category');

    if (colorValidation && categoryValidation) {
      if (editMode && pieceData) {
        let imageUploadResponse = null;
        if (pieceData.piece.imageUrl !== data.imageUrl) {
          imageUploadResponse = await uploadPhoto(imageFile);
        }
        if (imageUploadResponse?.success || imageUploadResponse === null) {
          try {
            await updatePiece({
              variables: {
                id: pieceData.piece.id,
                title: data.title,
                description: data.description,
                location: data.location,
                price: data.price,
                color: data.color,
                category: data.category,
                imageUrl: data.imageUrl,
              },
              refetchQueries: [
                {
                  query: GET_PIECE_QUERY,
                  variables: { pieceId: pieceData.piece.id },
                },
              ],
            });
            router.push(`/piece/${pieceData.piece.id}`);
          } catch (error) {
            console.error(error);
          } finally {
            setUploadLoading(false);
          }
        } else {
          console.error('Image upload failed: ', imageUploadResponse?.message);
          setUploadLoading(false);
          return;
        }
      } else {
        const imageUploadResponse = await uploadPhoto(imageFile);

        if (!imageUploadResponse.success) {
          console.error('Image upload failed: ', imageUploadResponse.message);
          setUploadLoading(false);
          return;
        }
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
          });

          router.push(`/wardrobe/${userId}`);
          addToastMessage('Your piece has been successfully registered!');
        } catch (error) {
          addToastMessage(getErrorMessage(error), true);
        } finally {
          setUploadLoading(false);
        }
      }
    }
  };
  return (
    <div className="w-full h-full">
      <form className="flex gap-3xl w-full h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col   ${pieceData ? 'w-[55%]' : 'w-[45%]'}  h-full`}>
          <Input
            register={register('title')}
            name="Title *"
            errorMessage={errors.title?.message}
            placeholder="ex. Fleece Jacket"
            disabled={!editMode}
          ></Input>
          <div className="flex justify-between gap-8">
            <Input
              register={register('location')}
              name="Location"
              placeholder="ex. downtown MUJI"
              errorMessage={errors.location?.message}
              disabled={!editMode}
            ></Input>
            <Input
              register={register('price')}
              name="Price"
              errorMessage={errors.price?.message}
              placeholder="ex. 38.5"
              disabled={!editMode}
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
                  defaultValue={pieceData ? pieceData?.piece.color : ''}
                  disabled={!editMode}
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
                  defaultValue={pieceData ? pieceData?.piece.category : ''}
                  disabled={!editMode}
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
              disabled={!editMode}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>
        </div>
        <div className={`flex flex-col  ${pieceData ? 'w-[45%]' : 'w-1/2'} h-full pr-[1px]`}>
          {pieceData && !editMode ? (
            <div className="flex flex-col h-full">
              <div className="h-[5%] mr-1 flex items-end justify-end text-sm">
                created at: {dateFormatter(new Date(pieceData.piece.createdAt))}
              </div>
              <div className="h-[95%] w-full relative">
                <Image alt="outfit" src={pieceData.piece.imageUrl} fill objectFit="cover" className="rounded-md" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              {!editMode && pieceData && (
                <div className="h-[4%] mr-1 flex items-end justify-end text-sm">
                  created at: {dateFormatter(new Date(pieceData.piece.createdAt))}
                </div>
              )}

              <DropZone
                className="outline-[2px]  outline-dashed outline-lightGreen h-[85%]  flex flex-col  justify-center overflow-hidden items-center mr-1 p-lg rounded-md mt-1"
                handleFileSelect={handleFileSelect}
                deleteFile={() => {
                  setImageFile(null);
                  form.setValue('imageUrl', '');
                }}
                pieceImageUrl={pieceData?.piece.imageUrl}
              ></DropZone>
              <Button>{uploadLoading ? <Loading /> : pieceData && editMode ? 'Complete edit' : 'Register'}</Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
