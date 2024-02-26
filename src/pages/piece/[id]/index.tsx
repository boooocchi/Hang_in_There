import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/elements/button/Button';
import DeletePieceButton from '@/components/elements/button/DeletePieceButton';
import EditPieceButton from '@/components/elements/button/EditPieceButton';
import Loading from '@/components/elements/message/Loading';
import MainLayout from '@/components/layouts/layout/MainLayout';
import PieceDetailSection from '@/features/piece/components/PieceDetailSection';
import { useAuth } from '@/hooks/useAuth';

export const GET_PIECE_QUERY = gql`
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
  const { data, loading } = useQuery(GET_PIECE_QUERY, {
    variables: { pieceId },
  });

  const { session } = useAuth();
  const userId = session?.user?.id;

  const handleEdit = () => {
    setEditMode(true);
  };

  const unsetEditMode = () => {
    setEditMode(false);
  };

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const editButtons = (
    <>
      {editMode ? (
        <div className="flex  items-center h-full mt-1">
          <Button colorSchema="accentOrange" onClick={unsetEditMode} classname=" px-sm py-xs   text-sm">
            Cancel this edit
          </Button>
        </div>
      ) : (
        <div className="flex gap-[10px] items-center h-full mt-1">
          <EditPieceButton onClick={handleEdit} />
          <DeletePieceButton userId={userId} pieceId={data?.piece.id} category={data?.piece.category} />
        </div>
      )}
    </>
  );

  return (
    <>
      {loading ? (
        <Loading size="large" />
      ) : (
        <MainLayout title={data.piece.title} editButtons={editButtons}>
          <PieceDetailSection pieceData={data} editMode={editMode} setEditMode={setEditMode}></PieceDetailSection>
        </MainLayout>
      )}
    </>
  );
};

export default Piece;
