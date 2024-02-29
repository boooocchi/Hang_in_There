import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDebounce } from 'use-debounce';

import Loading from '@/components/elements/message/Loading';
import SearchResultModal from '@/components/elements/modal/SearchResultModal';

import { useAuth } from './useAuth';

type PiecesSearchResult =
  | {
      title: string;
      category: string;
      createdAt: string;
      imageUrl: string;
      id: string;
    }[]
  | null;

type DendoOutfitsSearchResult =
  | {
      title: string;
      imageUrl: string;
      createdAt: string;
      id: string;
    }[]
  | null;

const SEARCH_PIECESS_QUERY = gql`
  query Query($userId: String!, $searchText: String!) {
    pieces_search(userId: $userId, searchText: $searchText) {
      title
      category
      createdAt
      imageUrl
      id
    }
  }
`;

const SEARCH_DENDO_OUTFITS_QUERY = gql`
  query Query($userId: String!, $searchText: String!) {
    dendoOutfits_search(userId: $userId, searchText: $searchText) {
      id
      imageUrl
      createdAt
      title
    }
  }
`;

type SearchHook = () => {
  Modal: React.ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSearch: SearchHook = () => {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [searchText, setSearchText] = React.useState('');
  const [searchTextQuery] = useDebounce(searchText, 700);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [pieceSearchResult, setPieceSearchResult] = React.useState<PiecesSearchResult>(null);
  const [dendoOutfitsearchResult, setDendoOutfitSearchResult] = React.useState<DendoOutfitsSearchResult>(null);

  const {
    data: piecesData,
    loading: piecesLoading,
    error: piecesError,
  } = useQuery(SEARCH_PIECESS_QUERY, {
    variables: {
      userId,
      searchText: searchTextQuery,
    },
    skip: !searchTextQuery, // Skip the query if debouncedSearchText is empty
  });

  const {
    data: dendoOutfitsData,
    loading: dendoOutfitsLoading,
    error: dendoOutfitsError,
  } = useQuery(SEARCH_DENDO_OUTFITS_QUERY, {
    variables: {
      userId,
      searchText: searchTextQuery,
    },
    skip: !searchTextQuery,
  });

  React.useEffect(() => {
    if (piecesData && !piecesError && !piecesLoading) {
      setPieceSearchResult(piecesData.pieces_search);
    }
    if (dendoOutfitsData && !dendoOutfitsError && !dendoOutfitsLoading) {
      setDendoOutfitSearchResult(dendoOutfitsData.dendoOutfits_search);
    }
  }, [
    searchTextQuery,
    piecesData,
    piecesError,
    piecesLoading,
    dendoOutfitsData,
    dendoOutfitsError,
    dendoOutfitsLoading,
  ]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSearchText('');
    setPieceSearchResult(null);
    setDendoOutfitSearchResult(null);
  };

  const Modal = (
    <SearchResultModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div
        className={`${
          searchText ? 'h-[600px]' : 'h-[300px]'
        }  w-[850px] bg-gray rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-lg px-2xl flex flex-col gap-3 items-center  fixed z-999 `}
      >
        <div className="relative flex w-full justify-center items-center">
          <div className={`relative justify-center items-center ${searchText && 'mb-3'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#00110F"
              className="w-4 h-4 absolute left-2 top-[7px]"
            >
              <path
                strokeLinecap="square"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="search your wardrobe"
              type="text"
              className="w-[250px] h-[30px] mr-sm p-sm pl-xl text-sm rounded-md bg-lightGreen"
            />
          </div>
          <button className="absolute right-0 w-10 top-2" onClick={handleModalClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {searchText && (
          <div className="w-full  overflow-y-scroll flex flex-col gap-4">
            <div>
              <h2 className="font-bold mb-2">Your Wardrobe</h2>

              <div className="grid grid-cols-4 gap-4 gap-y-5 w-full">
                {piecesLoading && <Loading size="small"></Loading>}
                {!piecesLoading && pieceSearchResult?.length === 0 && (
                  <div className="text-sm h-10">No search result</div>
                )}
                {pieceSearchResult?.map((piece) => {
                  return (
                    <div key={piece.id}>
                      <Link href={`/piece/${piece.id}`} onClick={handleModalClose}>
                        <div className="relative w-[100%] aspect-[2/3] rounded-md overflow-hidden mb-1">
                          <Image alt="piece image" src={piece.imageUrl} fill objectFit="cover" />
                        </div>
                      </Link>

                      <div className="text-sm">{piece.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-2">Your Outfits</h2>
              <div className="grid grid-cols-4 gap-4 gap-y-5 w-full">
                {dendoOutfitsLoading && <Loading size="small"></Loading>}
                {!dendoOutfitsLoading && dendoOutfitsearchResult?.length === 0 && (
                  <div className="text-sm h-10">No search result</div>
                )}
                {dendoOutfitsearchResult?.map((outfit) => {
                  return (
                    <div key={outfit.id}>
                      <Link href={`/dendoOutfit/${outfit.id}`} onClick={handleModalClose}>
                        <div className="relative w-[100%] aspect-[2/3] rounded-md overflow-hidden mb-1">
                          <Image
                            alt="outfit image"
                            src={outfit.imageUrl ? outfit.imageUrl : '/image/home/dendo_outfit.jpg'}
                            fill
                            objectFit="cover"
                          />
                        </div>
                      </Link>
                      <div className="text-sm">{outfit.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </SearchResultModal>
  );

  return { Modal, setIsModalOpen };
};
