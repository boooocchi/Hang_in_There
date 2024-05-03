import { Categories, Colors } from '@prisma/client';
import * as yup from 'yup';

export const registerPieceValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().nullable(),
  location: yup.string().nullable(),
  price: yup.number().nullable().typeError('Price should be a number'),
  color: yup
    .string()
    .oneOf([...Object.values(Colors)], 'Select a color')
    .required('Color is required'),
  category: yup
    .string()
    .oneOf([...Object.values(Categories)], 'Invalid category value')
    .required('Category is required'),
  imageUrl: yup.string().required('Image is required'),
});
