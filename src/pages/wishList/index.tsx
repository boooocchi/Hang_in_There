import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import WishListSection from '@/features/wishList/components/WishListSection';

const Index = () => {
  return (
    <MainLayout title="Wish List">
      <WishListSection />
    </MainLayout>
  );
};

export default Index;
