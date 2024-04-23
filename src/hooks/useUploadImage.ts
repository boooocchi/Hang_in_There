import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { RegisterOutfitValues } from '@/features/registerDendoOutift/types/types';
import { UseImageUploadReturnType } from '@/types/types';

export const useUploadImage = ({
  setValue,
}: {
  setValue: UseFormSetValue<RegisterOutfitValues | RegisterPieceValues>;
}): UseImageUploadReturnType => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isDropzone, setIsDropzone] = React.useState(false);
  const handleFileSelect = (file: File) => {
    setImageFile(file);
    const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    setValue('imageUrl', imageUrl);
  };

  return {
    imageFile,
    setImageFile,
    isDropzone,
    setIsDropzone,
    handleFileSelect,
  };
};
