import * as yup from 'yup';

export const signinValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email form').required('Email is required'),
  password: yup.string().required('Password is required'),
});
