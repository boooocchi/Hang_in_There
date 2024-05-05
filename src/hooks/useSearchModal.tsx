import { useQuery } from '@apollo/client';
import { Categories, Piece } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect } from 'react';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import { CancelIcon, DendoOutfitIllustration } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';
import SearchResultModal from '@/components/elements/modal/SearchResultModal';
import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { useWardrobe } from '@/features/wardrobe/hooks/useWardrobe';
import { upperCamelCase } from '@/features/wardrobe/utility/upperCamelCase';
import { DENDOOUTFIT_QUERY } from '@/pages/dendoOutfitGallery/[id]';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]';

import { useAuth } from './useAuth';

type SearchHook = () => {
  Modal: React.ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSearch: SearchHook = () => {
  const { userId } = useAuth();
  const [searchText, setSearchText] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const categoriesArray = Object.values(Categories);

  const { data: wardrobeData, loading: wardrobeDataLoading } = useQuery(GET_All_PIECES_QUERY, {
    variables: { userId },
  });
  const { data: all_dendoOutfit_data, loading: all_dendoOutfit_loading } = useQuery(DENDOOUTFIT_QUERY, {
    variables: {
      userId,
    },
  });

  const [data, setData] = React.useState<Piece[]>([]);
  const [outfitData, setOutfitData] = React.useState<dendoOutfitType[]>([]);

  useEffect(() => {
    setData(wardrobeData?.all_pieces);
    setOutfitData(all_dendoOutfit_data?.dendoOutfits);
  }, [wardrobeData, all_dendoOutfit_data]);

  const { sortedWardrobeData, dendoOutfitData, handleSearchTextChange } = useWardrobe({
    wardrobeData: data,
    outfitData: outfitData,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleSearchTextChange('');
    setSearchText('');
  };

  const Modal = (
    <SearchResultModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="xs:h-[600px] xs:w-[850px] w-[350px] h-[500px] bg-darkGray rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] xs:p-lg xs:px-2xl p-md flex flex-col gap-3 items-center  fixed z-[999]">
        <div className="relative flex w-full justify-center items-center">
          <div className="relative justify-center items-center">
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
              placeholder="search your wardrobe.."
              type="text"
              className="w-[250px] h-[30px] border-1 border-middleGreen px-md py-sm  pl-xl text-sm rounded-md bg-darkGray"
            />
          </div>
        </div>
        <div className="w-full overflow-y-scroll hide-scrollbar flex flex-col gap-3">
          <div>
            <h1 className="font-bold xs:mb-3 text-xl mb-2">Your Wardrobe</h1>
            <div className="flex flex-col w-full overflow-hidden">
              {wardrobeDataLoading && <Loading size="small"></Loading>}
              {!wardrobeDataLoading && !sortedWardrobeData && <div className="text-sm h-10">No search result</div>}
              {sortedWardrobeData &&
                categoriesArray.map((category) => {
                  const dataOfTheCategory = sortedWardrobeData[category];
                  if (dataOfTheCategory && dataOfTheCategory.length === 0) return <div key={category}></div>;
                  return (
                    <div className="flex flex-col" key={category}>
                      <h2 className="mb-2">{upperCamelCase(category)}</h2>
                      <div className="flex gap-4 mb-3 overflow-x-scroll">
                        {dataOfTheCategory?.map((piece) => (
                          <div key={piece.id} className="overflow-hidden w-[150px] shrink-0">
                            <Link href={`/wardrobe/${userId}/${piece.id}`} onClick={handleModalClose}>
                              <div className="relative w-[150px] aspect-[3/4] rounded-md overflow-hidden">
                                <ImageWithLoading alt="piece image" url={piece.imageUrl} />
                              </div>
                            </Link>
                            <div className="text-sm mt-1 w-[150px] truncate">{piece.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <h2 className="font-bold xs:mb-3 mb-2 text-xl">Your Outfit</h2>
            <div className="flex w-full gap-3 overflow-x-scroll">
              {all_dendoOutfit_loading && <Loading size="small"></Loading>}
              {!all_dendoOutfit_loading && !dendoOutfitData && <div className="text-sm h-10">No search result</div>}
              {dendoOutfitData?.map((outfit: dendoOutfitType) => {
                return (
                  <div key={outfit.id} className="w-[150px] shrink-0">
                    <Link href={`/dendoOutfit/${outfit.id}`} onClick={handleModalClose}>
                      <div className="relative w-[150px] aspect-[3/4] rounded-md overflow-hidden mb-1">
                        {outfit.imageUrl ? (
                          <ImageWithLoading alt="outfit image" url={outfit.imageUrl} />
                        ) : (
                          <div className="w-full h-full flex bg-gray justify-center items-center rounded-md">
                            <DendoOutfitIllustration />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="text-sm truncate w-full">{outfit.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          className="rounded-full h-7 w-7 flex justify-center items-center opacity-70 hover:opacity-90 bg-accentOrange leading-[10px] text-gray absolute xs:-top-5 xs:-right-8 -right-3 -top-3 text-sm shadow-sm"
          onClick={() => handleModalClose()}
        >
          <CancelIcon style="w-5 h-5" />
        </button>
      </div>
    </SearchResultModal>
  );

  return { Modal, setIsModalOpen };
};
