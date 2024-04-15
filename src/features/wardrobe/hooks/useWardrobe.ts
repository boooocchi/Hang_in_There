import { Categories, Piece } from '@prisma/client';
import React, { useEffect } from 'react';

import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';

type WardrobeReturnType = {
  sortedWardrobeData: {
    LIGHTTOPS: Piece[];
    HEAVYTOPS: Piece[];
    OUTERWEAR: Piece[];
    BOTTOMS: Piece[];
    SHOES: Piece[];
    ACCESSORIES: Piece[];
  } | null;
  dendoOutfitData: dendoOutfitType[] | null;
  handleSearchTextChange: (searchText: string) => void;
};

export const useWardrobe = ({
  wardrobeData,
  outfitData,
}: {
  wardrobeData: Piece[];
  outfitData?: dendoOutfitType[];
}): WardrobeReturnType => {
  const [sortedWardrobeData, setSortedWardrobeData] = React.useState<{
    LIGHTTOPS: Piece[] | [];
    HEAVYTOPS: Piece[] | [];
    OUTERWEAR: Piece[] | [];
    BOTTOMS: Piece[] | [];
    SHOES: Piece[] | [];
    ACCESSORIES: Piece[] | [];
  } | null>(null);

  const [data, setData] = React.useState<Piece[]>([]);
  const [dendoOutfitData, setDendoOutfitData] = React.useState<dendoOutfitType[] | null>(null);
  const categoriesArray = React.useMemo(() => Object.values(Categories), []);

  useEffect(() => {
    setData(wardrobeData);
    setDendoOutfitData(outfitData ?? null);
  }, [wardrobeData, outfitData]);

  React.useEffect(() => {
    if (!data || data?.length === 0) {
      setSortedWardrobeData(null);
      return;
    }

    const newSortedData = categoriesArray.reduce(
      (acc, category) => {
        const categoryPieces = data.filter((piece: Piece) => piece.category === category);
        return { ...acc, [category]: categoryPieces };
      },
      {
        LIGHTTOPS: [],
        HEAVYTOPS: [],
        OUTERWEAR: [],
        BOTTOMS: [],
        SHOES: [],
        ACCESSORIES: [],
      },
    );
    setSortedWardrobeData(newSortedData);
  }, [categoriesArray, data]);

  const handleSearchTextChange = (searchText: string) => {
    const filteredData = wardrobeData?.filter(
      (item) =>
        item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        item?.description?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
    setData(filteredData);

    const filteredOutfitData = outfitData?.filter(
      (item) =>
        item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        item?.description?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
    setDendoOutfitData(filteredOutfitData && filteredData.length > 0 ? filteredOutfitData : null);
  };

  return { sortedWardrobeData, dendoOutfitData, handleSearchTextChange };
};
