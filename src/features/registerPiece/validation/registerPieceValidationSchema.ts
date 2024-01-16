import { Colors, Categories } from '@prisma/client';
import * as yup from 'yup';

export const registerPieceValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  location: yup.string().optional(),
  price: yup.number().nullable().optional().typeError('Price should be a number'),
  color: yup
    .mixed()
    .notOneOf([null], 'Select a color')
    .oneOf(Object.values(Colors), 'Invalid color value')
    .required('Select a color'),
  category: yup.mixed().oneOf(Object.values(Categories), 'Invalid category value').required('Category is required'),
});
