import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import { useToast } from '@/contexts/ToastContext';
import { useModal } from '@/hooks/useModal';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';
import { getErrorMessage } from '@/utils/errorHandler';

import { AlertIcon, TrashbinIcon } from '../icons/icons';
import Loading from '../message/Loading';

const DELETE_PIECE_MUTATION = gql`
  mutation ($deletePieceId: String!) {
    delete_piece(id: $deletePieceId) {
      id
    }
  }
`;

export const DELETE_S3IMAGE_MUTATION = gql`
  mutation delete_s3_image($fileKey: String!) {
    delete_s3_image(fileKey: $fileKey) {
      success
    }
  }
`;

type Props = {
  pieceId?: string;
  userId?: string;
  fileKey: string;
};

const DeletePieceButton: React.FC<Props> = ({ pieceId, userId, fileKey }) => {
  const [deletePiece, { loading }] = useMutation(DELETE_PIECE_MUTATION);
  const [deleteS3Image] = useMutation(DELETE_S3IMAGE_MUTATION);
  const router = useRouter();
  const { addToastMessage } = useToast();
  const fileName = fileKey.split('https://do-i-have-it-storage.s3.amazonaws.com/')[1];

  const { Modal, openModal } = useModal();

  const handleDeletePiece = async () => {
    if (!pieceId) return;

    try {
      const result = await deletePiece({
        variables: { deletePieceId: pieceId },
        refetchQueries: [
          {
            query: GET_All_PIECES_QUERY,
            variables: { userId },
          },
        ],
      });
      if (result)
        await deleteS3Image({
          variables: { fileKey: fileName },
        });

      router.push(`/wardrobe/${userId}`);
      addToastMessage('Piece deleted successfully');
    } catch (e) {
      addToastMessage(getErrorMessage(e), true);
    }
  };

  return (
    <>
      <button className="flex items-center h-full" onClick={openModal}>
        <TrashbinIcon style="w-5 h-5" />
      </button>
      <Modal buttonLabel={loading ? <Loading /> : 'Confirm'} onClick={handleDeletePiece}>
        <div className="flex gap-2 items-center font-normal text-center">
          <div className="max-xs:hidden">
            <AlertIcon />
          </div>
          Are you sure you want to delete this piece??
        </div>
      </Modal>
    </>
  );
};

export default DeletePieceButton;
