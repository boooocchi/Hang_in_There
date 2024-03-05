import { Categories } from '@prisma/client';
import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import WishListForm from '@/features/wishList/components/WishListForm';

const Index = () => {
  const categories = Object.values(Categories);

  return (
    <MainLayout title="Wish List">
      <section className="grid grid-cols-3 gap-5 h-full overflow-y-scroll">
        {categories.map((category, item) => (
          <WishListForm categoryName={category} key={item} />
        ))}
      </section>
    </MainLayout>
  );
};

export default Index;
