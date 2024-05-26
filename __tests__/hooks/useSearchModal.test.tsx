import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import React from 'react';

import { useSearchModal } from '@/hooks/useSearchModal';
import { DENDOOUTFIT_QUERY } from '@/pages/dendoOutfitGallery/[id]';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]/index';

jest.mock('next-auth/react');

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
      {Modal}
      <button onClick={() => setIsModalOpen(true)}>open button</button>
      <div id="myportal" />
    </div>
  );
};

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
            category: 'LIGHTTOPS',
            brand: 'dummyBrand',
            price: 100,
            imageUrl: '/dummyUrl',
            userId: 'dummyId',
          },
        ],
      },
      loading: false,
      error: undefined,
    },
  },
  {
    request: {
      query: DENDOOUTFIT_QUERY,
      variables: {
        userId: 'dummyId',
      },
    },
    result: {
      data: {
        dendoOutfits: [
          {
            id: 'dummyOutfitId',
            createdAt: new Date(),
            keywords: ['dummyKeyword'],
            title: 'dummyOutfitTitle',
            imageUrl: '/dummyOutfitImageUrl',
            description: 'dummyOutfitDescription',
          },
        ],
      },
      loading: false,
      error: undefined,
    },
  },
];

describe('useSearchModal', () => {
  afterEach(() => {
    cleanup();
  });

  it('should open the modal when user clicks the open button, and set of fetched piece and outfit data is displayed and when user type in input, display the data accordingly.', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestModalComponent />
      </MockedProvider>,
    );
    const user = userEvent.setup();
    const openButton = screen.getByText('open button');

    expect(screen.queryByText('dummyItem')).not.toBeInTheDocument();
    await user.click(openButton);
    expect(await screen.findByText('dummyItem')).toBeInTheDocument();
    expect(await screen.findByText('dummyOutfitTitle')).toBeInTheDocument();

    const searchInput = await screen.findByPlaceholderText('search your wardrobe..');

    searchInput.focus();
    await user.clear(searchInput);
    await user.type(searchInput, 'dummyItem');
    expect(await screen.findByText('dummyItem')).toBeInTheDocument();
    expect(screen.queryByText('dummyOutfitTitle')).not.toBeInTheDocument();

    searchInput.focus();
    await user.clear(searchInput);
    await user.type(searchInput, 'dummyOutfitTitle');
    expect(screen.queryByText('dummyItem')).not.toBeInTheDocument();
    expect(await screen.findByText('dummyOutfitTitle')).toBeInTheDocument();

    const cancelButton = screen.getByLabelText('close modal');
    await user.click(cancelButton);
    expect(screen.queryByText('dummyItem')).not.toBeInTheDocument();
  });

  it('use default image when dendoOutfit imageUrl is null', async () => {
    const mocks2 = [
      {
        request: {
          query: DENDOOUTFIT_QUERY,
          variables: {
            userId: 'dummyId',
          },
        },
        result: {
          data: {
            dendoOutfits: [
              {
                id: 'dummyOutfitId',
                createdAt: new Date(),
                keywords: ['dummyKeyword'],
                title: 'dummyOutfitTitle',
                imageUrl: null,
                description: 'dummyOutfitDescription',
              },
            ],
          },
          loading: false,
          error: undefined,
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks2} addTypename={false}>
        <TestModalComponent />
      </MockedProvider>,
    );
    const user = userEvent.setup();
    const openButton = screen.getByText('open button');

    await user.click(openButton);
    expect(await screen.findByText('dummyOutfitTitle')).toBeInTheDocument();
    expect(await screen.findByLabelText('Default dendooutfit image')).toBeInTheDocument();
  });
});
