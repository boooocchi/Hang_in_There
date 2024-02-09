import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

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

  const { data: lightTopsData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'LIGHTTOPS' },
  });

  const { data: heavyTopsData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'HEAVYTOPS' },
  });

  const { data: outerwearData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'OUTERWEAR' },
  });

  const { data: bottomsData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'BOTTOMS' },
  });

  const { data: shoesData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'SHOES' },
  });

  const { data: accessoriesData } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId: id, category: 'ACCESSORIES' },
  });

  return (
    <MainLayout pageTitle="Wardrobe">
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
  );
};

export default Page;
