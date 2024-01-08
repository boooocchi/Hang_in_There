import React from 'react';

import AuthLayout from '@/features/auth/components/AuthLayout';
import SigninForm from '@/features/auth/components/SigninForm';

const Signin = () => {
  return (
    <AuthLayout>
      <SigninForm></SigninForm>
    </AuthLayout>
  );
};

export default Signin;
