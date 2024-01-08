import * as yup from 'yup';

export const signinValidationSchema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email form').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: yup.string().required('Confirm password is required'),
  })
  .test('samePassword', 'Passwords do not match', function (value) {
    if (value.password !== value.passwordConfirmation) {
      return this.createError({
        path: 'samePassword', // You can specify either 'email' or 'number' here
        message: 'Passwords do not match',
      });
    }
    return true;
  });
