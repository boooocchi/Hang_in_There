import { useQuery } from '@apollo/client';
import { Categories, Piece } from '@prisma/client';
import React from 'react';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import Button from '@/components/elements/button/Button';
import { CancelIcon } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';
import SearchResultModal from '@/components/elements/modal/SearchResultModal';
import { useWardrobe } from '@/features/wardrobe/hooks/useWardrobe';
import { upperCamelCase } from '@/features/wardrobe/utility/upperCamelCase';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]';

import { useAuth } from './useAuth';

type PieceSelectModalProps = {
  createMessage: (piece: Piece) => void;
};

type SearchHook = (props: PieceSelectModalProps) => {
  Modal: React.ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePieceSelectModal: SearchHook = ({ createMessage }) => {
  const { userId } = useAuth();
  const [searchText, setSearchText] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPiece, setSelectedPiece] = React.useState<null | Piece>(null);

  const categoriesArray = Object.values(Categories);

  const { data: wardrobeData, loading: wardrobeDataLoading } = useQuery(GET_All_PIECES_QUERY, {
    variables: { userId },
  });

  const { sortedWardrobeData, handleSearchTextChange } = useWardrobe({
    wardrobeData: wardrobeData?.all_pieces,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleSearchTextChange('');
    setSearchText('');
  };

  const Modal = (
    <SearchResultModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="xs:h-[600px] xs:w-[850px] w-[350px] h-[500px] max:h-[600px] max:w-[850px] bg-darkGray rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-lg px-2xl flex flex-col gap-3 items-center  fixed z-[999] ">
        <div className="relative flex w-full justify-center items-center">
          <div className={`relative justify-center items-center ${searchText && 'mb-3'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#11655b"
              className="w-4 h-4 absolute left-2 top-[7px]"
            >
              <path
                strokeLinecap="square"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleSearchTextChange(e.target.value);
              }}
              placeholder="search your wardrobe"
              type="text"
              className="w-[250px] h-[30px] border-1 border-middleGreen mr-sm p-sm pl-xl text-sm rounded-md bg-darkGray"
            />
          </div>
        </div>
        {wardrobeDataLoading ? (
          <Loading size="large"></Loading>
        ) : (
          <div className="w-full hide-scrollbar  overflow-y-scroll flex flex-col gap-3">
            {!sortedWardrobeData && <div>No item found</div>}
            {sortedWardrobeData &&
              categoriesArray.map((category) => {
                const dataByCategory = sortedWardrobeData[category];
                if (dataByCategory?.length === 0) return null;
                return (
                  <div key={category} className="flex flex-col mb-3">
                    <h2 className="mb-3">{upperCamelCase(category)}</h2>
                    <div className="flex overflow-x-scroll hide-scrollbar gap-4">
                      {dataByCategory?.map((piece) => {
                        return (
                          <div className="flex flex-col gap-1 w-[150px]" key={piece.id}>
                            <div className="w-full flex justify-center">
                              <input
                                type="checkbox"
                                id={piece.id}
                                onClick={() => setSelectedPiece(piece)}
                                className="peer  w-3 h-3 text-accentOrange focus:ring-0 ring-0 outline-none rounded-sm form-checkbox border-richGreen"
                              />
                            </div>
                            <label
                              htmlFor={piece.id}
                              className="flex flex-col gap-1 relative w-[150px] aspect-[3/4]   bg-gray  rounded-md  border-none border-3 overflow-hidden peer-checked:border-accentOrange peer-hover:border-accentOrange"
                            >
                              <ImageWithLoading id={piece.id} url={piece.imageUrl} alt={piece.title} />
                            </label>
                            <p className="text-sm truncate">{piece.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {sortedWardrobeData && (
          <Button
            onClick={() => {
              if (selectedPiece) {
                createMessage(selectedPiece);
                setIsModalOpen(false);
              }
            }}
            style="w-full"
          >
            Select
          </Button>
        )}
        <button
          className="rounded-full h-7 w-7 flex justify-center items-center opacity-70 hover:opacity-90 bg-accentOrange leading-[10px] text-gray absolute xs:-top-5 xs:-right-8 -right-2 -top-3 text-sm shadow-sm"
          onClick={() => handleModalClose()}
        >
          <CancelIcon style="w-5 h-5" />
        </button>
      </div>
    </SearchResultModal>
  );

  return { Modal, setIsModalOpen };
};
