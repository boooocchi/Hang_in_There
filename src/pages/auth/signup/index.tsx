import React from 'react';

import AuthLayout from '@/features/auth/components/AuthLayout';
import SignupForm from '@/features/auth/components/SignupForm';

const Index = () => {
  return (
    <AuthLayout>
      <SignupForm></SignupForm>
    </AuthLayout>
  );
};

export default Index;
