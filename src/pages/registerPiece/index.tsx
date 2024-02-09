import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';
import MainLayout from '@/components/layouts/layout/MainLayout';
import Form from '@/features/registerPiece/components/Form';

const index = () => {
  return (
    <MainLayout>
      <section className="h-full w-full flex flex-col ">
        <PageTitle>Register Piece</PageTitle>
        <Form />
      </section>
    </MainLayout>
  );
};

export default index;
