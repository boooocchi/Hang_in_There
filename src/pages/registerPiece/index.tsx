import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';
import MainLayout from '@/components/layouts/layout/MainLayout';
import DropZone from '@/features/registerPiece/components/DropZone';

const index = () => {
  return (
    <MainLayout>
      <section className="h-full flex flex-col">
        <PageTitle>Register Piece</PageTitle>
        <div className="flex h-full">
          <div className="w-3/5"></div>
          <DropZone className="w-2/5  outline-dashed outline-richGreen h-full  flex flex-col justify-center overflow-hidden items-center p-xl rounded-md"></DropZone>
        </div>
      </section>
    </MainLayout>
  );
};

export default index;
