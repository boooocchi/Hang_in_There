import { gql, useQuery } from '@apollo/client';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import SmtWrongMessage from '@/components/elements/message/SmtWrongMessage';
import MainLayout from '@/components/layouts/layout/MainLayout';
import DendoOutfitCard from '@/features/dendoOutfitGallery/components/DendoOutfitCard';
import RegisterOutfitBtn from '@/features/dendoOutfitGallery/components/RegisterOutfitBtn';
import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { useAuth } from '@/hooks/useAuth';

export const DENDOOUTFIT_QUERY = gql`
  query DendoOutfits($userId: String!) {
    dendoOutfits(userId: $userId) {
      id
      createdAt
      keywords
      title
      imageUrl
      description
    }
  }
`;

const Index = () => {
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(DENDOOUTFIT_QUERY, {
    variables: { userId },
  });
  if (error)
    return (
      <MainLayout title="Dendo Outfit">
        <SmtWrongMessage />
      </MainLayout>
    );
  if (loading) return <Loading size="large"></Loading>;
  return (
    <MainLayout title="Dendo Outfit">
      <div className="grid grid-cols-4 gap-5 rounded-md overflow-y-scroll h-full">
        {data?.dendoOutfits.map((dendoOutfit: dendoOutfitType) => {
          return (
            <div key={dendoOutfit.id}>
              <DendoOutfitCard dendoOutfit={dendoOutfit} />
            </div>
          );
        })}
        <RegisterOutfitBtn />
      </div>
    </MainLayout>
  );
};

export default Index;
