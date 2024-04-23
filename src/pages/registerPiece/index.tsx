import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import PieceForm from '@/features/registerPiece/components/PieceForm';

const index = () => {
  return (
    <MainLayout title="Register Piece">
      <PieceForm />
    </MainLayout>
  );
};

export default index;
