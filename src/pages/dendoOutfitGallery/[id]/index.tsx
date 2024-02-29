import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import DendoOutfitSection from '@/features/dendoOutfitGallery/components/DendoOutfitSection';

const Index = () => {
  return (
    <MainLayout title="Dendo Outfit">
      <DendoOutfitSection />
    </MainLayout>
  );
};

export default Index;
