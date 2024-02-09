import { gql, useQuery, useMutation } from '@apollo/client';
// import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import DropZone from '@/features/registerPiece/components/DropZone';
import WardrobeDisplaySection from '@/features/wardrobe/components/WardrobeDisplaySection';
import { useAuth } from '@/hooks/useAuth';
import { GET_WARDROBE_QUERY } from '@/pages/wardrobe/[id]/index';

export type RegisterOutfitValues = {
  title: string;
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
  mutation Mutation($userId: String!, $pieces: [String]!, $title: String!) {
    register_outfit(userId: $userId, pieces: $pieces, title: $title) {
      id
      title
    }
  }
`;

const DendoOutfitForm = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const form = useForm<RegisterOutfitValues>({
    defaultValues: {
      title: '',
      imageUrl: '',
      LIGHTTOPS: false,
      HEAVYTOPS: false,
      OUTERWEAR: false,
      BOTTOMS: false,
      SHOES: false,
      ACCESSORIES: false,
    },
    //ignore the error
    // resolver: yupResolver(registerDendoOutfitValidationSchema),
  });

  const { register, handleSubmit, formState, watch, setValue } = form;
  const errors: CustomError = formState.errors;

  const [registerOutfit] = useMutation(REGISTER_OUTFIT);

  const onSubmit = (data: RegisterOutfitValues) => {
    const piecesArr = [];
    for (const [key, value] of Object.entries(data)) {
      if (value && key !== 'title') {
        if (Array.isArray(value)) {
          piecesArr.push(...value);
        } else piecesArr.push(value);
      }
    }

    registerOutfit({ variables: { userId: userId, title: data.title, pieces: piecesArr } });
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
      <div className="flex flex-col mb-5 mt-3">
        <div className="flex items-baseline">
          <label htmlFor="title">Title</label>
          {errors.title && <p className="ml-5 text-sm text-errorRed">{errors.title.message}</p>}
        </div>
        <input
          id="title"
          type="text"
          className="border-b border-lightGreen bg-lightGreen rounded-md mt-1 text-lg w-1/3 min-w-[300px] py-xs px-sm"
          {...register('title')}
        />
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
            <Button classname="w-full">Register without picture</Button>
          </div>
        </div>
      )}
      {isDropzone && (
        <div className="flex flex-col items-center  mt-5 ">
          <p className={`w-full text-start mb-2 ml-1 text-2xl `}>Picture of the Outfit</p>
          <DropZone
            className="outline-1 w-[99%]  outline-dashed outline-richGreen   flex flex-col  justify-center overflow-hidden items-center p-lg rounded-md mb-xl h-[400px] "
            handleFileSelect={handleFileSelect}
            deleteFile={() => {
              setImageFile(null);
              setValue('imageUrl', '');
            }}
          ></DropZone>
          <Button classname="w-full">Register</Button>
        </div>
      )}
    </form>
  );
};

export default DendoOutfitForm;
