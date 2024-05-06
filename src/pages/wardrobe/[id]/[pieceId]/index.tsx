import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/elements/button/Button';
import DeletePieceButton from '@/components/elements/button/DeletePieceButton';
import EditPieceButton from '@/components/elements/button/EditPieceButton';
import Loading from '@/components/elements/message/Loading';
import MainLayout from '@/components/layouts/layout/MainLayout';
import PieceForm from '@/features/registerPiece/components/PieceForm';
import { useAuth } from '@/hooks/useAuth';

export const GET_PIECE_QUERY = gql`
  query Piece($pieceId: String!) {
    piece(id: $pieceId) {
      category
      color
      price
      brand
      description
      itemName
      createdAt
      imageUrl
      id
    }
  }
`;

const Piece = () => {
  const router = useRouter();
  const pieceId = router.query.pieceId;
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
        <div className="flex  items-center h-full">
          <Button colorSchema="accentOrange" onClick={unsetEditMode} style="px-sm py-xs text-sm">
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex gap-[10px] items-center h-full mt-1">
          <EditPieceButton onClick={handleEdit} />
          <DeletePieceButton userId={userId} pieceId={data?.piece.id} fileKey={data?.piece.imageUrl} />
        </div>
      )}
    </>
  );

  return (
    <>
      {loading ? (
        <Loading size="large" />
      ) : (
        <MainLayout title={data.piece.itemName} editButtons={editButtons}>
          <PieceForm pieceData={data} editMode={editMode} setEditMode={setEditMode}></PieceForm>
        </MainLayout>
      )}
    </>
  );
};

export default Piece;
