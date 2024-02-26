import { gql, useMutation } from '@apollo/client';
import { Categories } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

import { useModal } from '@/hooks/useModal';
import { GET_WARDROBE_QUERY } from '@/pages/wardrobe/[id]/index';

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

const DeletePieceButton: React.FC<Props> = ({ pieceId, userId, category }) => {
  const [deletePiece, { loading }] = useMutation(DELETE_PIECE_MUTATION);
  const router = useRouter();

  const { Modal, openModal } = useModal();

  const handleDeletePiece = async () => {
    if (!pieceId) return;

    try {
      await deletePiece({
        variables: { deletePieceId: pieceId },
        refetchQueries: [
          {
            query: GET_WARDROBE_QUERY,
            variables: { userId, category },
          },
        ],
      });
      router.push(`/wardrobe/${userId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button className="flex items-center h-full" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <Modal buttonLabel={loading ? <Loading /> : 'Confirm'} onClick={handleDeletePiece}>
        Are you sure you want to delete this piece??
      </Modal>
    </>
  );
};

export default DeletePieceButton;
