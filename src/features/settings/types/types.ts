import { Categories } from '@prisma/client';
import { FieldErrors } from 'react-hook-form';

export type SettingsFormProps = {
  userData?: {
    userName: string;
    password: string;
    email: string;
    limitEntries: {
      id: string;
      category: Categories;
      value: number;
      userId: string;
    }[];
    googleSignin: boolean;
  };
};

export type SettingsFormValuesType = {
  userName: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  LIGHTTOPS: number;
  HEAVYTOPS: number;
  OUTERWEAR: number;
  BOTTOMS: number;
  SHOES: number;
  ACCESSORIES: number;
};

export interface CustomError extends FieldErrors<SettingsFormValuesType> {
  samePassword?: { message: string; type: string; ref?: React.RefObject<HTMLInputElement> };
}
