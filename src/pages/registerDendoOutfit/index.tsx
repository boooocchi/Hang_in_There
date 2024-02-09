import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import DendoOutfitForm from '@/features/registerDendoOutift/components/DendoOutfitForm';

const Index = () => {
  return (
    <MainLayout pageTitle="Register Dendo Outfit">
      <DendoOutfitForm />
    </MainLayout>
  );
};

export default Index;
