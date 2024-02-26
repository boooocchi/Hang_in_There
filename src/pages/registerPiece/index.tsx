import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import Form from '@/features/registerPiece/components/Form';

const index = () => {
  return (
    <MainLayout title="Register Piece">
      <Form />
    </MainLayout>
  );
};

export default index;
