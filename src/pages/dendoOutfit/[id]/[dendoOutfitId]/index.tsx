import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import MainLayout from '@/components/layouts/layout/MainLayout';
import DendoOutfitDetailSection from '@/features/dendoOutfit/components/DendoOutfitDetailSection';

const GET_OUTFIT_QUERY = gql`
  query DendoOutfit($dendoOutfitId: String!) {
    dendoOutfit(id: $dendoOutfitId) {
      createdAt
      id
      imageUrl
      keywords
      description
      pieces {
        imageUrl
        title
        color
        category
        id
      }
      title
    }
  }
`;

const Index = () => {
  const { dendoOutfitId } = useRouter().query;
  const { data, loading } = useQuery(GET_OUTFIT_QUERY, {
    variables: { dendoOutfitId },
  });

  if (loading) {
    return <Loading size="large" />;
  }
  return (
    <MainLayout title={data.dendoOutfit.title}>
      <DendoOutfitDetailSection dendoOutfitDetailsData={data.dendoOutfit}></DendoOutfitDetailSection>
    </MainLayout>
  );
};

export default Index;
