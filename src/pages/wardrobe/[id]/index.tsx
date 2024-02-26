import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import MainLayout from '@/components/layouts/layout/MainLayout';
import WardrobeDisplaySection from '@/features/wardrobe/components/WardrobeDisplaySection';

export const GET_WARDROBE_QUERY = gql`
  query Pieces($userId: String!, $category: Categories) {
    pieces(userId: $userId, category: $category) {
      id
      category
      createdAt
      imageUrl
      title
    }
  }
`;

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: lightTopsData, loading: lightTopsLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'LIGHTTOPS' },
  });

  const { data: heavyTopsData, loading: heavyTopsLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'HEAVYTOPS' },
  });

  const { data: outerwearData, loading: outerwearLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'OUTERWEAR' },
  });

  const { data: bottomsData, loading: bottomsLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'BOTTOMS' },
  });

  const { data: shoesData, loading: shoesLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'SHOES' },
  });

  const { data: accessoriesData, loading: accessoriesLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'ACCESSORIES' },
  });

  return (
    <>
      {lightTopsLoading ||
      heavyTopsLoading ||
      outerwearLoading ||
      bottomsLoading ||
      shoesLoading ||
      accessoriesLoading ? (
        <Loading size="large"></Loading>
      ) : (
        <MainLayout title="Wardrobe">
          <WardrobeDisplaySection
            wardrobeData={{
              LIGHTTOPS: lightTopsData?.pieces,
              HEAVYTOPS: heavyTopsData?.pieces,
              OUTERWEAR: outerwearData?.pieces,
              BOTTOMS: bottomsData?.pieces,
              SHOES: shoesData?.pieces,
              ACCESSORIES: accessoriesData?.pieces,
            }}
          ></WardrobeDisplaySection>
        </MainLayout>
      )}
    </>
  );
};

export default Page;
