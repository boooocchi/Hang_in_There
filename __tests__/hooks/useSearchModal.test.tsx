import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import React from 'react';

import { useSearchModal } from '@/hooks/useSearchModal';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';

jest.mock('next-auth/react');

const mocks = [
  {
    request: {
      query: GET_All_PIECES_QUERY,
      variables: {
        userId: 'dummyId',
      },
    },
    result: {
      data: {
        all_pieces: [
          {
            id: 'dummyData',
            createdAt: new Date(),
            updatedAt: new Date(),
            itemName: 'dummyItem',
            description: 'dummyDescription',
            color: 'dummyColor',
            category: 'dummyCategory',
            brand: 'dummyBrand',
            price: 100,
            imageUrl: 'dummyUrl',
            userId: 'dummyId',
          },
        ],
      },
      loading: false,
      error: undefined,
    },
  },
];

const mockUseSession = useSession as jest.Mock;
mockUseSession.mockReturnValue({
  data: {
    user: {
      id: 'dummyId',
    },
  },
  status: 'authenticated',
});

const TestModalComponent: React.FC = () => {
  const { Modal, setIsModalOpen } = useSearchModal();

  return (
    <div>
      <Modal></Modal>
      <button onClick={() => setIsModalOpen(true)}>open button</button>
      <div id="myportal" />
    </div>
  );
};

describe('useSearchModal', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestModalComponent />
      </MockedProvider>,
    );
  });
  afterEach(() => {
    cleanup();
  });

  it('should open the modal when user clicks the open button', async () => {
    const user = userEvent.setup();
    const openButton = screen.getByText('open button');

    expect(screen.queryByText('Your Wardrobe')).not.toBeInTheDocument();
    await user.click(openButton);
    expect(await screen.findByText('Your Wardrobe')).toBeInTheDocument();
  });

  // it('expect the hook to return Modal component and setIsModalOpen function', () => {
  //   // mockUseQuery
  //   //   .mockReturnValueOnce({
  //   //     data: {
  //   //       all_pieces: [
  //   //         {
  //   //           id: 'dummyData',
  //   //           createdAt: new Date(),
  //   //           updatedAt: new Date(),
  //   //           itemName: 'dummyItem',
  //   //           description: 'dummyDescription',
  //   //           color: 'dummyColor',
  //   //           category: 'dummyCategory',
  //   //           brand: 'dummyBrand',
  //   //           price: 100,
  //   //           imageUrl: 'dummyUrl',
  //   //           userId: 'dummyId',
  //   //         },
  //   //       ],
  //   //     },
  //   //     loading: false,
  //   //   })
  //   //   .mockReturnValueOnce({
  //   //     data: {
  //   //       dendoOutfits: [
  //   //         {
  //   //           id: 'dummyOutfitId',
  //   //           createdAt: new Date(),
  //   //           keywords: ['dummyKeyword'],
  //   //           title: 'dummyTitle',
  //   //           imageUrl: 'dummyImageUrl',
  //   //           description: 'dummyDescription',
  //   //         },
  //   //       ],
  //   //     },
  //   //     loading: false,
  //   //   });

  //   const { result } = renderHook(() => useSearchModal());
  //   const { Modal, setIsModalOpen } = result.current;
  //   expect(setIsModalOpen).toBeInstanceOf(Function);

  //   render(
  //       <Modal />
  //   );
  //   act(() => {
  //     setIsModalOpen(true);
  //   });

  //   expect(screen.getByRole('h1', { name: /Your Wardeobe/i })).toBeInTheDocument();
  // });
});
