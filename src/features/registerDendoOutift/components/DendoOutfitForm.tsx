import { gql, useQuery, useMutation } from '@apollo/client';
// import { yupResolver } from '@hookform/resolvers/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import Loading from '@/components/elements/message/Loading';
import { DENDOOUTFIT_QUERY } from '@/features/dendoOutfitGallery/components/DendoOutfitSection';
import DropZone from '@/features/registerPiece/components/DropZone';
import { uploadPhoto } from '@/features/registerPiece/utils/uploadImage';
import WardrobeDisplaySection from '@/features/wardrobe/components/WardrobeDisplaySection';
import { useAuth } from '@/hooks/useAuth';
import { GET_WARDROBE_QUERY } from '@/pages/wardrobe/[id]/index';

import { registerDendoOutfitValidationSchema } from '../validation/registerDendoOutfitValidationSchema';

export type RegisterOutfitValues = {
  title: string;
  keywords: string;
  description: string;
  imageUrl: string | null;
  LIGHTTOPS: string | string[] | boolean | undefined;
  HEAVYTOPS: string | string[] | boolean | undefined;
  OUTERWEAR: string | string[] | boolean | undefined;
  BOTTOMS: string | string[] | boolean | undefined;
  SHOES: string | string[] | boolean | undefined;
  ACCESSORIES: string | string[] | boolean | undefined;
};

interface CustomError extends FieldErrors<RegisterOutfitValues> {
  ''?: { message: string; type: string; ref?: React.RefObject<HTMLInputElement> };
}

export const REGISTER_OUTFIT = gql`
  mutation Mutation(
    $userId: String!
    $keywords: [String]
    $description: String
    $pieces: [String]!
    $title: String!
    $imageUrl: String
  ) {
    register_outfit(
      userId: $userId
      pieces: $pieces
      title: $title
      keywords: $keywords
      imageUrl: $imageUrl
      description: $description
    ) {
      id
      title
    }
  }
`;

const DendoOutfitForm = () => {
  const router = useRouter();
  const { session } = useAuth();
  const userId = session?.user?.id;
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
      console.error('Image upload failed: ', imageUploadResponse?.message);
      return;
    }

    if (data.keywords) {
      keywordsArr = data.keywords.split(' ');
    }

    const piecesArr = [];
    for (const [key, value] of Object.entries(data)) {
      if (value && key !== 'title' && key !== 'imageUrl' && key !== 'keywords' && key !== 'description') {
        //data except title
        if (Array.isArray(value)) {
          // when data is an array, push each element to piecesArr
          piecesArr.push(...value);
        } else piecesArr.push(value); //when data is not an array, push it to piecesArr
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
      router.push(`/dendoOutfit/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: lightTopsData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'LIGHTTOPS' },
  });

  const { data: heavyTopsData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'HEAVYTOPS' },
  });

  const { data: outerwearData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'OUTERWEAR' },
  });

  const { data: bottomsData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'BOTTOMS' },
  });

  const { data: shoesData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'SHOES' },
  });

  const { data: accessoriesData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'ACCESSORIES' },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isDropzone, setIsDropzone] = React.useState(false);
  const handleFileSelect = (file: File) => {
    setImageFile(file);
    const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    form.setValue('imageUrl', imageUrl);
  };
  const handleDropzone = () => {
    setIsDropzone(true);
  };

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5 h-[175px] mb-5 mt-3">
        <div className="flex flex-col justify-between w-[40%]">
          <div className="flex items-baseline">
            <label htmlFor="title">Title</label>
            {errors.title && <p className="ml-5 text-sm text-errorRed">{errors.title.message}</p>}
          </div>
          <input
            id="title"
            type="text"
            className="border-b border-lightGreen bg-lightGreen rounded-md mt-1 text-lg w-full min-w-[300px] py-sm px-md mb-3"
            {...register('title')}
          />
          <label htmlFor="keyword">Keyword</label>
          <input
            id="keyword"
            type="text"
            {...register('keywords')}
            className="border-b border-lightGreen bg-lightGreen rounded-md mt-1 text-lg w-full min-w-[300px] py-sm px-md"
          />
        </div>
        <div className="flex flex-col w-[60%]">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="h-full rounded-md w-full bg-lightGreen py-sm px-md"
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
        wardrobeData={{
          LIGHTTOPS: lightTopsData?.pieces,
          HEAVYTOPS: heavyTopsData?.pieces,
          OUTERWEAR: outerwearData?.pieces,
          BOTTOMS: bottomsData?.pieces,
          SHOES: shoesData?.pieces,
          ACCESSORIES: accessoriesData?.pieces,
        }}
      ></WardrobeDisplaySection>
      {!isDropzone && (
        <div className="flex gap-5 items-end">
          <div className="w-full flex-col flex gap-1">
            <p className="text-center text-base">Do you have a picture of the outfit?</p>
            <Button classname="w-full" onClick={handleDropzone}>
              Upload picture
            </Button>
          </div>
          <div className=" w-full">
            <Button classname="w-full">{registering ? <Loading size="small" /> : 'Register'}</Button>
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
          <Button classname="w-full">{registering ? <Loading size="small" /> : 'Register'}</Button>
        </div>
      )}
    </form>
  );
};

export default DendoOutfitForm;
