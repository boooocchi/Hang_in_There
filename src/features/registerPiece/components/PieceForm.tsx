import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Colors, Categories } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import Button from '@/components/elements/button/Button';
import Input from '@/components/elements/form/Input';
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

import { REGISTER_PIECE_MUTATION, UPDATE_PIECE_MUTATION, UPLOAD_S3_IMAGE } from '../graphql/mutation';
import { RegisterPieceValues, WardrobeQueryData, RegisterPieceMutationData } from '../types/types';
import { uploadPhoto } from '../utils/uploadImage';
import { registerPieceValidationSchema } from '../validation/registerPieceValidationSchema';

import DropDownMenu from './DropDownMenu';
import DropZone from './DropZone';

const PieceForm: React.FC<PieceDetailSectionProps> = ({ pieceData, editMode = true, setEditMode }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const { addToastMessage } = useToast();
  const [updatePiece] = useMutation(UPDATE_PIECE_MUTATION);
  const [uploadS3Image] = useMutation(UPLOAD_S3_IMAGE);

  const form = useForm<RegisterPieceValues>({
    resolver: yupResolver(registerPieceValidationSchema),
  });
  const { register, handleSubmit, formState, control, trigger, setValue, getValues, reset } = form;
  const errors = formState.errors;

  const setImageUrl = (imageUrl: string) => {
    setValue('imageUrl', imageUrl);
  };

  const { handleFileSelect, imageFile, setImageFile } = useUploadImage({ setImageUrl });

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
    reset();
    if (pieceData?.piece === undefined) return;
    setValue('title', pieceData.piece.title);
    setValue('description', pieceData.piece.description);
    setValue('location', pieceData.piece.location);
    setValue('price', pieceData.piece.price);
    setValue('color', pieceData.piece.color);
    setValue('category', pieceData.piece.category);
    setValue('imageUrl', pieceData.piece.imageUrl);
  }, [pieceData, setValue, editMode, reset]);

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
            const response = await uploadS3Image({
              variables: {
                fileName: imageFile.name,
              },
            });
            await uploadPhoto({
              file: imageFile,
              url: response.data.upload_s3_image.url,
              fields: response.data.upload_s3_image.fields,
            });
            setValue(
              'imageUrl',
              `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${response.data.upload_s3_image.fields.key}`,
            );
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
              imageUrl: getValues('imageUrl'),
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
          const response = await uploadS3Image({
            variables: {
              fileName: imageFile.name,
            },
          });
          await uploadPhoto({
            file: imageFile,
            url: response.data.upload_s3_image.url,
            fields: response.data.upload_s3_image.fields,
          });

          await registerPiece({
            variables: {
              title: data.title,
              description: data.description,
              location: data.location,
              price: data.price,
              color: data.color,
              category: data.category,
              imageUrl: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${response.data.upload_s3_image.fields.key}`,
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
      <form
        className="flex xs:flex-row flex-col-reverse xs:gap-3xl gap-md w-full xs:h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col xs:justify-between xs:h-full max-xs:w-full gap-md xs:flex-grow">
          <Input
            register={register('title')}
            label="Title *"
            name="title"
            errorMessage={errors.title?.message}
            placeholder="ex. Fleece Jacket"
            disabled={!editMode}
          />
          <div className="flex justify-between gap-md">
            <div className="w-1/2 overflow-hidden">
              <Input
                register={register('location')}
                name="location"
                label="Location"
                placeholder="ex. downtown MUJI"
                errorMessage={errors.location?.message}
                disabled={!editMode}
              />
            </div>
            <div className="w-1/2 overflow-hidden">
              <Input
                register={register('price')}
                name="price"
                label="Price"
                errorMessage={errors.price?.message}
                placeholder="ex. 38.5"
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="flex justify-between gap-md">
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
              className="bg-darkGray rounded-md xs:flex-grow h-[220px] py-md px-md textarea resize-none border-1 border-middleGreen"
              placeholder="ex. Warm winter down jacket"
              disabled={!editMode}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>
          <div className={`w-full hidden ${pieceData && !editMode ? 'hidden' : 'max-xs:block'}`}>
            <Button style="w-full">
              {uploadLoading ? <Loading /> : pieceData && editMode ? 'Complete edit' : 'Register'}
            </Button>
          </div>
        </div>
        <div className={`flex flex-col xs:h-full ${editMode && 'xs:w-[40%]'}`}>
          {pieceData && !editMode ? (
            <div className="flex flex-col h-full justify-between">
              <div className=" mr-1 flex items-end justify-end text-sm">
                created at: {dateFormatter(new Date(pieceData.piece.createdAt))}
              </div>
              <div className="xs:h-[95%] aspect-[3/4] relative">
                <ImageWithLoading alt="piece image" url={pieceData.piece.imageUrl} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col xs:h-full xs:justify-between relative max-xs:w-full gap-lg">
              {!editMode && pieceData && (
                <div className="xs:h-[4%] mr-1 flex items-end justify-end text-sm">
                  created at: {dateFormatter(new Date(pieceData.piece.createdAt))}
                </div>
              )}
              <div className="relative xs:h-full max-xs:w-full">
                <DropZone
                  className="border-1  border-dashed border-middleGreen xs:h-[95%] h-[250px]  flex flex-col  justify-center overflow-hidden items-center mr-1 p-lg rounded-md mt-1 max-xs:w-full"
                  handleFileSelect={handleFileSelect}
                  deleteFile={() => {
                    setImageFile(null);
                    setValue('imageUrl', '');
                  }}
                  pieceImageUrl={pieceData?.piece.imageUrl}
                />
                <ErrorMessage style="xs:bottom-0">{errors.imageUrl?.message}</ErrorMessage>
              </div>
              <div className="max-xs:hidden w-full">
                <Button style="w-full">
                  {uploadLoading ? <Loading /> : pieceData && editMode ? 'Complete edit' : 'Register'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PieceForm;
