import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';

import { AlertIcon } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';
import SmtWrongMessage from '@/components/elements/message/SmtWrongMessage';
import MainLayout from '@/components/layouts/layout/MainLayout';
import { useToast } from '@/contexts/ToastContext';
import DendoOutfitCard from '@/features/dendoOutfitGallery/components/DendoOutfitCard';
import RegisterOutfitBtn from '@/features/dendoOutfitGallery/components/RegisterOutfitBtn';
import { DELETE_DENTO_OUTFIT } from '@/features/dendoOutfitGallery/graphql/mutation';
import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { getErrorMessage } from '@/utils/errorHandler';

export const DENDOOUTFIT_QUERY = gql`
  query DendoOutfits($userId: String!) {
    dendoOutfits(userId: $userId) {
      id
      createdAt
      keywords
      title
      imageUrl
      description
    }
  }
`;

const Index = () => {
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(DENDOOUTFIT_QUERY, {
    variables: { userId },
  });
  const { addToastMessage } = useToast();
  const [id, setId] = React.useState<string>('');

  const [delete_outfit] = useMutation(DELETE_DENTO_OUTFIT);

  const deleteHandler = async (id: string) => {
    try {
      await delete_outfit({
        variables: {
          id,
        },
      });
      addToastMessage('Successfully Deleted the outfit!');
      toggleModal();
    } catch (error) {
      addToastMessage(getErrorMessage(error));
    }
  };

  const { Modal, toggleModal } = useModal();

  if (error)
    return (
      <MainLayout title="Dendo Outfit">
        <SmtWrongMessage />
      </MainLayout>
    );
  if (loading) return <Loading size="large"></Loading>;
  return (
    <MainLayout title="Dendo Outfit">
      <div className="grid grid-cols-4 gap-5 rounded-md overflow-y-scroll h-full">
        {data?.dendoOutfits.map((dendoOutfit: dendoOutfitType) => {
          return (
            <div key={dendoOutfit.id}>
              <DendoOutfitCard dendoOutfit={dendoOutfit} setId={setId} toggleModal={toggleModal} />
            </div>
          );
        })}
        <RegisterOutfitBtn />
      </div>
      <Modal buttonLabel="Confirm" onClick={() => deleteHandler(id)}>
        <div className="flex items-center gap-2">
          <AlertIcon />
          Are you sure you want to delete this outfit?
        </div>
      </Modal>
    </MainLayout>
  );
};

export default Index;
