import { gql, useMutation } from '@apollo/client';
import { Categories } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

import { useToast } from '@/contexts/ToastContext';
import { useModal } from '@/hooks/useModal';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';

import { AlertIcon, TrashbinIcon } from '../icons/icons';
import Loading from '../message/Loading';

const DELETE_PIECE_MUTATION = gql`
  mutation Delete_piece($deletePieceId: String!) {
    delete_piece(id: $deletePieceId) {
      id
    }
  }
`;

type Props = {
  pieceId?: string;
  userId?: string;
  category?: Categories;
};

const DeletePieceButton: React.FC<Props> = ({ pieceId, userId }) => {
  const [deletePiece, { loading }] = useMutation(DELETE_PIECE_MUTATION);
  const router = useRouter();
  const { addToastMessage } = useToast();

  const { Modal, openModal } = useModal();

  const handleDeletePiece = async () => {
    if (!pieceId) return;

    try {
      await deletePiece({
        variables: { deletePieceId: pieceId },
        refetchQueries: [
          {
            query: GET_All_PIECES_QUERY,
            variables: { userId },
          },
        ],
      });
      router.push(`/wardrobe/${userId}`);
      addToastMessage('Piece deleted successfully');
    } catch (e) {
      addToastMessage(`Failed to delete the piece`, true);
    }
  };

  return (
    <>
      <button className="flex items-center h-full" onClick={openModal}>
        <TrashbinIcon style="w-5 h-5" />
      </button>
      <Modal buttonLabel={loading ? <Loading /> : 'Confirm'} onClick={handleDeletePiece}>
        <div className="flex gap-2 items-center font-normal">
          <AlertIcon />
          Are you sure you want to delete this piece??
        </div>
      </Modal>
    </>
  );
};

export default DeletePieceButton;
