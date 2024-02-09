import { Categories } from '@prisma/client';
import * as yup from 'yup';

export const wishListValidationSchema = yup.object().shape({
  itemName: yup.string().required('Item name is required'),
  category: yup.string().oneOf(Object.values(Categories), 'Invalid category value').required('Category is required'),
});
