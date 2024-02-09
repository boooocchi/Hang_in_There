import React from 'react';

import PageTitle from '@/components/elements/title/PageTitle';
import MainLayout from '@/components/layouts/layout/MainLayout';
import DendoOutfitSection from '@/features/dendoOutfit/components/DendoOutfitSection';

const Index = () => {
  return (
    <MainLayout>
      <PageTitle>Dendo Outfits</PageTitle>
      <DendoOutfitSection />
    </MainLayout>
  );
};

export default Index;
