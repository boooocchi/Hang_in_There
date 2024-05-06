import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';

import { DELETE_S3IMAGE_MUTATION } from '@/components/elements/button/DeletePieceButton';
import { AlertIcon, EmptyIllustration } from '@/components/elements/icons/icons';
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
  const [args, setArgs] = React.useState<{ id: string; imageUrl: string }>({
    id: '',
    imageUrl: '',
  });

  const [deleteOutfit] = useMutation(DELETE_DENTO_OUTFIT);
  const [deleteS3Image] = useMutation(DELETE_S3IMAGE_MUTATION);

  const deleteHandler = async (id: string, imageUrl: string) => {
    const fileName = imageUrl.split('https://do-i-have-it-storage.s3.amazonaws.com/')[1];
    try {
      const response = await deleteOutfit({
        variables: {
          id,
        },
      });
      if (response && fileName) {
        await deleteS3Image({
          variables: { fileKey: fileName },
        });
      }
      addToastMessage('Successfully deleted the outfit!');
      toggleModal();
    } catch (error) {
      addToastMessage(getErrorMessage(error), true);
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
      {data.dendoOutfits.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          You have not registered any outfit yet!
          <EmptyIllustration />
        </div>
      ) : (
        <>
          <div className="grid xs:grid-cols-4 xs:gap-5 grid-cols-2 gap-3 rounded-md overflow-y-scroll h-full">
            {data?.dendoOutfits.map((dendoOutfit: dendoOutfitType) => {
              return (
                <div key={dendoOutfit.id}>
                  <DendoOutfitCard dendoOutfit={dendoOutfit} setArgs={setArgs} toggleModal={toggleModal} />
                </div>
              );
            })}
          </div>
          <Modal buttonLabel="Confirm" onClick={() => deleteHandler(args.id, args.imageUrl)}>
            <div className="flex items-center gap-2">
              <AlertIcon />
              Are you sure you want to delete this outfit?
            </div>
          </Modal>
        </>
      )}
      <RegisterOutfitBtn />
    </MainLayout>
  );
};

export default Index;
