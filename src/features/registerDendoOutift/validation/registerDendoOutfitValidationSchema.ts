import { Categories } from '@prisma/client';
import * as yup from 'yup';

export const registerDendoOutfitValidationSchema = yup
  .object()
  .shape({
    title: yup.string().required('Title is required'),
    imageUrl: yup.string().nullable(),
    LIGHTTOPS: yup.lazy((value) =>
      Array.isArray(value)
        ? yup.array().of(yup.string().required())
        : typeof value === 'string'
          ? yup.string()
          : yup.boolean(),
    ),
    HEAVYTOPS: yup.lazy((value) =>
      Array.isArray(value)
        ? yup.array().of(yup.string().required())
        : typeof value === 'string'
          ? yup.string()
          : yup.boolean(),
    ),
    OUTERWEAR: yup.lazy((value) =>
      Array.isArray(value)
        ? yup.array().of(yup.string().required())
        : typeof value === 'string'
          ? yup.string()
          : yup.boolean(),
    ),
    BOTTOMS: yup.lazy((value) =>
      Array.isArray(value)
        ? yup.array().of(yup.string().required())
        : typeof value === 'string'
          ? yup.string()
          : yup.boolean(),
    ),
    SHOES: yup.lazy((value) =>
      Array.isArray(value)
        ? yup.array().of(yup.string().required())
        : typeof value === 'string'
          ? yup.string()
          : yup.boolean(),
    ),
    ACCESSORIES: yup.lazy((value) =>
      Array.isArray(value)
        ? yup.array().of(yup.string().required())
        : typeof value === 'string'
          ? yup.string()
          : yup.boolean(),
    ),
  })
  .test('atLeastTwoCategories', 'At least two categories are required', function (values) {
    const categoryKeys = Object.values(Categories);
    const categoryCount = categoryKeys.reduce((count, key) => {
      const value = values[key];
      if (
        (typeof value === 'boolean' && value) ||
        (typeof value === 'string' && value.trim() !== '') ||
        (Array.isArray(value) && value.length > 0)
      ) {
        return count + 1;
      }
      return count;
    }, 0);

    // Ensure at least two categories have valid values
    return categoryCount >= 2;
  });
