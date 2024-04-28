import { Categories } from '@prisma/client';
import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import WishListCard from '@/features/wishList/components/WishListCard';

const Index = () => {
  const categories = Object.values(Categories);

  return (
    <MainLayout title="Wish List">
      <section className="grid grid-cols-3 gap-lg h-full">
        {categories.map((category, item) => (
          <WishListCard categoryName={category} key={item} />
        ))}
      </section>
    </MainLayout>
  );
};

export default Index;
