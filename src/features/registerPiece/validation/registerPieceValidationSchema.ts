import { Categories, Colors } from '@prisma/client';
import * as yup from 'yup';

export const registerPieceValidationSchema = yup.object({
  itemName: yup.string().required('Item name is required').max(35, 'Item name should be less than 30 characters'),
  description: yup.string().nullable().max(150, 'Description should be less than 100 characters'),
  brand: yup.string().nullable(),
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
