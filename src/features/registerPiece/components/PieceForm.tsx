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
import { useUploadImage } from '@/hooks/useUploadImage';
import { GET_PIECE_QUERY } from '@/pages/wardrobe/[id]/[pieceId]/index';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';
import { getErrorMessage } from '@/utils/errorHandler';
import { dateFormatter } from '@/utils/utils';

import { REGISTER_PIECE_MUTATION } from '../graphql/mutation';
import { RegisterPieceValues, WardrobeQueryData, RegisterPieceMutationData } from '../types/types';
import { uploadPhoto } from '../utils/uploadImage';
import { registerPieceValidationSchema } from '../validation/registerPieceValidationSchema';

import DropDownMenu from './DropDownMenu';
import DropZone from './DropZone';
import Input from './Input';

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

const PieceForm: React.FC<PieceDetailSectionProps> = ({ pieceData, editMode = true, setEditMode }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const { addToastMessage } = useToast();
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
  const { register, handleSubmit, formState, control, trigger, setValue } = form;
  const errors = formState.errors;

  const { handleFileSelect, imageFile, setImageFile } = useUploadImage({ setValue });

  const [registerPiece] = useMutation<RegisterPieceMutationData>(REGISTER_PIECE_MUTATION, {
    update: (cache, { data }) => {
      if (data) {
        const existingData: WardrobeQueryData | null = cache.readQuery({
          query: GET_All_PIECES_QUERY,
          variables: { userId },
        });
        if (existingData) {
          cache.writeQuery({
            query: GET_All_PIECES_QUERY,
            data: { all_pieces: [data.register_piece, ...existingData.all_pieces] },
          });
        }
      }
    },
  });

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

  useEffect(() => {
    if (pieceData && setEditMode) setEditMode(false);
  }, [pieceData, setEditMode]);

  const onSubmit = async (data: RegisterPieceValues) => {
    setUploadLoading(true);
    const colorValidation = await trigger('color');
    const categoryValidation = await trigger('category');

    if (colorValidation && categoryValidation) {
      if (editMode && pieceData) {
        try {
          if (imageFile && pieceData.piece.imageUrl !== data.imageUrl) {
            await uploadPhoto(imageFile);
          }
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
          setEditMode ?? false;
          addToastMessage('Your piece has been successfully updated!');
        } catch (error) {
          addToastMessage(getErrorMessage(error), true);
        } finally {
          setUploadLoading(false);
        }
      } else if (imageFile) {
        try {
          await uploadPhoto(imageFile);
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
        <div className={`flex flex-col  justify-between  ${pieceData ? 'w-[55%]' : 'w-[45%]'}  h-full`}>
          <Input
            register={register('title')}
            name="Title *"
            errorMessage={errors.title?.message}
            placeholder="ex. Fleece Jacket"
            disabled={!editMode}
          />
          <div className="w-full flex justify-between gap-7">
            <div className="w-1/2">
              <Input
                register={register('location')}
                name="Location"
                placeholder="ex. downtown MUJI"
                errorMessage={errors.location?.message}
                disabled={!editMode}
              />
            </div>
            <div className="w-[50%]">
              <Input
                register={register('price')}
                name="Price"
                errorMessage={errors.price?.message}
                placeholder="ex. 38.5"
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="flex justify-between gap-7">
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
          <div className="flex flex-col">
            <label htmlFor="description" className="text-base mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              name="description"
              id="description"
              className="bg-lightGreen rounded-md h-[220px] py-md px-md textarea resize-none"
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
            <div className="flex flex-col h-full justify-between relative">
              {!editMode && pieceData && (
                <div className="h-[4%] mr-1 flex items-end justify-end text-sm">
                  created at: {dateFormatter(new Date(pieceData.piece.createdAt))}
                </div>
              )}
              <div className="relative h-full">
                <DropZone
                  className="outline-[2px]  outline-dashed outline-lightGreen h-[90%]  flex flex-col  justify-center overflow-hidden items-center mr-1 p-lg rounded-md mt-1"
                  handleFileSelect={handleFileSelect}
                  deleteFile={() => {
                    setImageFile(null);
                    setValue('imageUrl', '');
                  }}
                  pieceImageUrl={pieceData?.piece.imageUrl}
                />
                <ErrorMessage style="bottom-5">{errors.imageUrl?.message}</ErrorMessage>
              </div>
              <Button>{uploadLoading ? <Loading /> : pieceData && editMode ? 'Complete edit' : 'Register'}</Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PieceForm;
