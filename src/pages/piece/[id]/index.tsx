import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import PieceDetailSection from '@/features/piece/components/PieceDetailSection';

const GET_PIECE_QUERY = gql`
  query Piece($pieceId: String!) {
    piece(id: $pieceId) {
      category
      color
      price
      location
      description
      title
      createdAt
      imageUrl
      id
    }
  }
`;

const Piece = () => {
  const router = useRouter();
  const pieceId = router.query.id;
  const { data } = useQuery(GET_PIECE_QUERY, {
    variables: { pieceId },
  });
  return (
    <MainLayout>
      <PieceDetailSection pieceData={data}></PieceDetailSection>
    </MainLayout>
  );
};

export default Piece;
