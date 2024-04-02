import { useQuery } from '@apollo/client';
import { Categories, Piece } from '@prisma/client';
import React, { useCallback } from 'react';
import { useDebounce } from 'use-debounce';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import Button from '@/components/elements/button/Button';
import Loading from '@/components/elements/message/Loading';
import SearchResultModal from '@/components/elements/modal/SearchResultModal';
import { upperCamelCase } from '@/features/wardrobe/utility/upperCamelCase';
import { GET_WARDROBE_QUERY } from '@/pages/wardrobe/[id]';

import { useAuth } from './useAuth';

type PieceSelectModalProps = {
  createMessage: (piece: Piece) => void;
};

type SearchHook = (props: PieceSelectModalProps) => {
  Modal: React.ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePieceSelectModal: SearchHook = ({ createMessage }) => {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [searchText, setSearchText] = React.useState('');
  const [searchTextQuery] = useDebounce(searchText, 700);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPiece, setSelectedPiece] = React.useState<null | Piece>(null);

  const [wardrobeData, setWardrobeData] = React.useState<{
    LIGHTTOPS: Piece[];
    HEAVYTOPS: Piece[];
    OUTERWEAR: Piece[];
    BOTTOMS: Piece[];
    SHOES: Piece[];
    ACCESSORIES: Piece[];
  }>({
    LIGHTTOPS: [],
    HEAVYTOPS: [],
    OUTERWEAR: [],
    BOTTOMS: [],
    SHOES: [],
    ACCESSORIES: [],
  });

  const [filteredData, setFilteredData] = React.useState<{
    LIGHTTOPS?: Piece[];
    HEAVYTOPS?: Piece[];
    OUTERWEAR?: Piece[];
    BOTTOMS?: Piece[];
    SHOES?: Piece[];
    ACCESSORIES?: Piece[];
  } | null>(null);

  const categoriesArray = Object.values(Categories);

  const { data: lightTopsData, loading: lightTopsLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'LIGHTTOPS' },
  });

  const { data: heavyTopsData, loading: heavyTopsLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'HEAVYTOPS' },
  });

  const { data: outerwearData, loading: outerwearLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'OUTERWEAR' },
  });

  const { data: bottomsData, loading: bottomsLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'BOTTOMS' },
  });

  const { data: shoesData, loading: shoesLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'SHOES' },
  });

  const { data: accessoriesData, loading: accessoriesLoading } = useQuery(GET_WARDROBE_QUERY, {
    variables: { userId, category: 'ACCESSORIES' },
  });

  React.useEffect(() => {
    setWardrobeData({
      LIGHTTOPS: lightTopsData?.pieces,
      HEAVYTOPS: heavyTopsData?.pieces,
      OUTERWEAR: outerwearData?.pieces,
      BOTTOMS: bottomsData?.pieces,
      SHOES: shoesData?.pieces,
      ACCESSORIES: accessoriesData?.pieces,
    });
  }, [lightTopsData, heavyTopsData, outerwearData, bottomsData, shoesData, accessoriesData]);

  const filterData = useCallback(
    (searchText: string, category: Categories) => {
      const filteredCategoryData = wardrobeData[category]?.filter(
        (piece) =>
          piece.title.toLowerCase().includes(searchText.toLowerCase()) ||
          piece.description?.toLocaleLowerCase().includes(searchText.toLowerCase()),
      );

      setFilteredData((prev) => {
        if (!prev) {
          const newData = { [category]: filteredCategoryData };
          return newData;
        }
        const newData = { ...prev, [category]: filteredCategoryData };
        return newData;
      });
    },
    [wardrobeData],
  );

  React.useEffect(() => {
    if (searchTextQuery === '') {
      setFilteredData(null);
    }
    if (searchTextQuery) {
      categoriesArray.forEach((category) => {
        filterData(searchTextQuery, category);
      });
    }
  }, [categoriesArray, filterData, searchTextQuery]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSearchText('');
    setFilteredData({
      LIGHTTOPS: [],
      HEAVYTOPS: [],
      OUTERWEAR: [],
      BOTTOMS: [],
      SHOES: [],
      ACCESSORIES: [],
    });
  };

  const Modal = (
    <SearchResultModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div
        className="
         h-[600px]
         w-[850px] bg-gray rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-lg px-2xl flex flex-col gap-3 items-center  fixed z-999 "
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
        {lightTopsLoading ||
        heavyTopsLoading ||
        outerwearLoading ||
        bottomsLoading ||
        shoesLoading ||
        accessoriesLoading ? (
          <Loading size="large"></Loading>
        ) : (
          <div className="w-full  overflow-y-scroll flex flex-col gap-4">
            {categoriesArray.map((category) => {
              const categoryData = filteredData ? filteredData[category] : wardrobeData[category];
              if (categoryData?.length === 0) return <></>;
              return (
                <div key={category} className="flex flex-col mb-3">
                  <div>{upperCamelCase(category)}</div>

                  <div className="flex lg:max-w-[1000px] overflow-x-scroll hide-scrollbar gap-5">
                    {categoryData?.map((piece) => {
                      return (
                        <div className="flex flex-col gap-1 " key={piece.id}>
                          <div className="w-full flex justify-center">
                            <input
                              type="checkbox"
                              id={piece.id}
                              onClick={() => setSelectedPiece(piece)}
                              className="peer  w-3 h-3 text-accentOrange mt-3 focus:ring-0 ring-0 outline-none rounded-sm form-checkbox border-lighterGreen"
                            />
                          </div>
                          <label
                            htmlFor={piece.id}
                            className="flex flex-col gap-1 relative h-[200px] w-[130px]   bg-white  rounded-md  border-none border-3 overflow-hidden peer-checked:border-accentOrange peer-hover:border-accentOrange"
                          >
                            <ImageWithLoading id={piece.id} url={piece.imageUrl} alt={piece.title} />
                          </label>
                          <p className="text-sm">{piece.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button
          onClick={() => {
            if (selectedPiece) {
              createMessage(selectedPiece);
              setIsModalOpen(false);
            }
          }}
          classname="w-full"
        >
          Ask about selected piece
        </Button>
      </div>
    </SearchResultModal>
  );

  return { Modal, setIsModalOpen };
};
