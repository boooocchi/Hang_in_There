import { useQuery, useMutation } from '@apollo/client';
// import { yupResolver } from '@hookform/resolvers/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import Input from '@/components/elements/form/Input';
import Loading from '@/components/elements/message/Loading';
import { useToast } from '@/contexts/ToastContext';
import DropZone from '@/features/registerPiece/components/DropZone';
import { uploadPhoto } from '@/features/registerPiece/utils/uploadImage';
import WardrobeDisplaySection from '@/features/wardrobe/components/WardrobeDisplaySection';
import { useAuth } from '@/hooks/useAuth';
import { useUploadImage } from '@/hooks/useUploadImage';
import { DENDOOUTFIT_QUERY } from '@/pages/dendoOutfitGallery/[id]/index';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';
import { getErrorMessage } from '@/utils/errorHandler';

import { REGISTER_OUTFIT } from '../graphql/mutation';
import { RegisterOutfitValues } from '../types/types';
import { registerDendoOutfitValidationSchema } from '../validation/registerDendoOutfitValidationSchema';

interface CustomError extends FieldErrors<RegisterOutfitValues> {
  ''?: { message: string; type: string; ref?: React.RefObject<HTMLInputElement> };
}

const DendoOutfitForm = () => {
  const router = useRouter();
  const { userId } = useAuth();
  const { addToastMessage } = useToast();

  const form = useForm<RegisterOutfitValues>({
    defaultValues: {
      title: '',
      keywords: '',
      description: '',
      imageUrl: '',
      LIGHTTOPS: false,
      HEAVYTOPS: false,
      OUTERWEAR: false,
      BOTTOMS: false,
      SHOES: false,
      ACCESSORIES: false,
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: yupResolver(registerDendoOutfitValidationSchema),
  });

  const { data, loading } = useQuery(GET_All_PIECES_QUERY, {
    variables: { userId },
  });

  const { register, handleSubmit, formState, watch, setValue } = form;
  const errors: CustomError = formState.errors;

  const [registerOutfit, { loading: registering }] = useMutation(REGISTER_OUTFIT);

  const onSubmit = async (data: RegisterOutfitValues) => {
    let imageUploadResponse;
    let keywordsArr;
    if (imageFile) {
      imageUploadResponse = await uploadPhoto(imageFile);
    }
    if (imageFile && !imageUploadResponse?.success) {
      addToastMessage(`Image upload failed: ${imageUploadResponse?.message}`);
      return;
    }

    if (data.keywords) {
      keywordsArr = data.keywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword !== '');
    }

    const excludedKeys = ['title', 'imageUrl', 'keywords', 'description'];
    const piecesArr = [];
    for (const [key, value] of Object.entries(data)) {
      if (value && !excludedKeys.includes(key)) {
        // when data is an array, push each element to piecesArr
        if (Array.isArray(value)) {
          piecesArr.push(...value);
        } else piecesArr.push(value);
      }
    }
    try {
      registerOutfit({
        variables: {
          userId: userId,
          title: data.title,
          pieces: piecesArr,
          keywords: keywordsArr ? keywordsArr : [''],
          description: data.description,
          imageUrl: data.imageUrl ? data.imageUrl : '',
        },
        refetchQueries: [{ query: DENDOOUTFIT_QUERY, variables: { userId } }],
      }); //pieces is the array that contains all the pieces id
      router.push(`/dendoOutfitGallery/${userId}`);
    } catch (error) {
      addToastMessage(getErrorMessage(error));
    }
  };

  const { imageFile, setImageFile, isDropzone, setIsDropzone, handleFileSelect } = useUploadImage({ setValue });

  if (loading) {
    return <Loading size="large"></Loading>;
  }

  return (
    <form className="relative h-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-10 h-[175px] mb-5 mt-3">
        <div className="flex flex-col justify-between w-[40%] flex-start">
          <div className=" flex-col flex gap-1">
            <div className="flex items-baseline">
              <label htmlFor="title">Title</label>
              {errors.title && <p className="ml-5 text-sm text-errorRed">{errors.title.message}</p>}
            </div>
            <Input name="title" placeholder="ex. Winter go-to basic style" register={register('title')} />
          </div>
          <div className=" flex flex-col gap-1">
            <div className="flex gap-2 items-baseline">
              <label htmlFor="keyword">Keyword</label> <span className="text-sm">*separate by comma</span>
            </div>
            <Input name="keyword" placeholder="ex. winter, casual, chic" register={register('keywords')} />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[60%]">
          <label htmlFor="description mb-1">Description</label>
          <textarea
            id="description"
            className="border-1 border-middleGreen h-full rounded-md w-full bg-darkGray py-sm px-md"
            placeholder="ex. Great for a casual day out with friends or a date night."
            {...register('description')}
          ></textarea>
        </div>
      </div>
      <div className="mb-3 flex items-baseline">
        <p className="">
          Click to select a piece... &nbsp; <span className="text-sm">*at least two from different category</span>
        </p>
        {errors[''] && <p className="ml-5 text-sm text-errorRed">{errors[''].message}</p>}
      </div>

      <WardrobeDisplaySection
        registerPage
        register={register}
        watch={watch}
        allPieces={data?.all_pieces}
      ></WardrobeDisplaySection>
      {!isDropzone && (
        <div className="flex gap-5 items-end mt-5">
          <div className="w-full flex-col flex gap-1">
            <p className="text-center text-base">Do you have a picture of the outfit?</p>
            <Button style="w-full" onClick={() => setIsDropzone(true)}>
              Upload picture
            </Button>
          </div>
          <div className=" w-full">
            <Button style="w-full">{registering ? <Loading size="small" /> : 'Register'}</Button>
          </div>
        </div>
      )}
      {isDropzone && (
        <div className="flex flex-col items-center  mt-5 ">
          <p className="w-full text-start mb-2 ml-1 text-xl font-bold">Picture of the Outfit</p>
          <DropZone
            className="outline-1 w-[99%]  outline-dashed outline-richGreen   flex flex-col  justify-center overflow-hidden items-center p-lg rounded-md mb-xl h-[400px] "
            handleFileSelect={handleFileSelect}
            deleteFile={() => {
              setImageFile(null);
              setValue('imageUrl', '');
            }}
          ></DropZone>
          <Button style="w-full">{registering ? <Loading size="small" /> : 'Register'}</Button>
        </div>
      )}
    </form>
  );
};

export default DendoOutfitForm;
