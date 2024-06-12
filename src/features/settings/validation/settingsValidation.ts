import * as yup from 'yup';

export const settingsValidationSchema = yup
  .object({
    userName: yup.string().required('Name is required').max(10, 'Name must be at most 10 characters'),
    email: yup.string().email('Invalid email form').required('Email is required'),
    password: yup.string().optional().min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: yup.string().optional(),
    LIGHTTOPS: yup.number().typeError('This should be a number').required('This is required'),
    HEAVYTOPS: yup.number().typeError('This should be a number').required('This is required'),
    OUTERWEAR: yup.number().typeError('This should be a number').required('This is required'),
    BOTTOMS: yup.number().typeError('This should be a number').required('This is required'),
    SHOES: yup.number().typeError('This should be a number').required('This is required'),
    ACCESSORIES: yup.number().typeError('This should be a number').required('This is required'),
  })
  .test('samePassword', 'Passwords do not match', function (value) {
    if ((value.passwordConfirmation || value.password) && value.password !== value.passwordConfirmation) {
      return this.createError({
        path: 'samePassword',
        message: 'Passwords do not match',
      });
    }
    return true;
  });
