import React from 'react';

import { UseImageUploadReturnType } from '@/types/types';

export const useUploadImage = ({
  setImageUrl,
}: {
  setImageUrl: (imageUrl: string) => void;
}): UseImageUploadReturnType => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isDropzone, setIsDropzone] = React.useState(false);
  const handleFileSelect = (file: File) => {
    setImageFile(file);
    const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    setImageUrl(imageUrl);
  };

  return {
    imageFile,
    setImageFile,
    isDropzone,
    setIsDropzone,
    handleFileSelect,
  };
};
