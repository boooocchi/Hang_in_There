import React from 'react';

export type Children = {
  children: React.ReactNode;
};

export type UseImageUploadReturnType = {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  isDropzone: boolean;
  setIsDropzone: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileSelect: (file: File) => void;
};
