import { gql, useQuery } from '@apollo/client';
import React from 'react';

import { EmptyIllustration } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';
import SmtWrongMessage from '@/components/elements/message/SmtWrongMessage';
import MainLayout from '@/components/layouts/layout/MainLayout';
import WardrobeDisplaySection from '@/features/wardrobe/components/WardrobeDisplaySection';
import { useAuth } from '@/hooks/useAuth';

export const GET_All_PIECES_QUERY = gql`
  query ($userId: String!) {
    all_pieces(userId: $userId) {
      id
      createdAt
      updatedAt
      title
      description
      color
      category
      location
      price
      imageUrl
      userId
    }
  }
`;

const Page = () => {
  const { userId } = useAuth();

  const {
    data: wardrobeData,
    loading: wardrobeLoading,
    error,
  } = useQuery(GET_All_PIECES_QUERY, {
    variables: { userId },
  });

  if (error) {
    return (
      <MainLayout title="Wardrobe">
        <SmtWrongMessage />
      </MainLayout>
    );
  }

  return (
    <>
      {wardrobeLoading ? (
        <Loading size="large"></Loading>
      ) : (
        <MainLayout title="Wardrobe">
          {wardrobeData.all_pieces.length === 0 && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              You have not registered any clothes yet!
              <EmptyIllustration />
            </div>
          )}
          <WardrobeDisplaySection allPieces={wardrobeData?.all_pieces}></WardrobeDisplaySection>
        </MainLayout>
      )}
    </>
  );
};

export default Page;
