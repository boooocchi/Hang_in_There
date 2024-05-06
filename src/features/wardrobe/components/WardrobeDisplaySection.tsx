import { Categories, Piece } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import { mainFont } from '@/constants/FontFamily';
import { RegisterOutfitValues } from '@/features/registerDendoOutift/types/types';
import { useAuth } from '@/hooks/useAuth';

import { useWardrobe } from '../hooks/useWardrobe';
import { upperCamelCase } from '../utility/upperCamelCase';

type WardrobeDisplaySectionProps = {
  registerPage?: boolean;
  register?: UseFormRegister<RegisterOutfitValues>;
  watch?: UseFormWatch<RegisterOutfitValues>;
  allPieces: Piece[];
};

const WardrobeDisplaySection: React.FC<WardrobeDisplaySectionProps> = ({
  registerPage,
  register,
  watch,
  allPieces,
}) => {
  const { userId } = useAuth();
  const categoriesArray = Object.values(Categories);
  let currentValue: RegisterOutfitValues;

  const { sortedWardrobeData } = useWardrobe({ wardrobeData: allPieces });

  if (watch) {
    currentValue = watch();
  }

  return (
    <div className="flex flex-col xs:gap-5 gap-4 overflow-x-scroll">
      {sortedWardrobeData &&
        categoriesArray.map((category) => {
          const categoryData = sortedWardrobeData[category];
          if (categoryData?.length === 0) return null;
          return (
            <div key={category} className="flex flex-col gap-2">
              <h2 className={`text-xl font-extraBold ${mainFont.className}`}>{upperCamelCase(category)}</h2>
              <div className="flex overflow-x-scroll hide-scrollbar xs:gap-5 gap-3">
                {!registerPage &&
                  categoryData?.map((piece) => {
                    return (
                      <div className="flex flex-col gap-1 overflow-hidden w-[200px] shrink-0" key={piece.id}>
                        <Link href={`/wardrobe/${userId}/${piece.id}`} className="group overflow-hidden rounded-md">
                          <div className="flex flex-col gap-1 relative w-[200px] aspect-[3/4] ">
                            <ImageWithLoading
                              url={piece.imageUrl}
                              alt={piece.itemName}
                              style="group-hover:scale-110 transition-all duration-300 ease-in"
                            />
                          </div>
                        </Link>
                        <p className="truncate">{piece.itemName}</p>
                      </div>
                    );
                  })}
                {registerPage &&
                  register &&
                  watch &&
                  categoryData?.map((piece) => {
                    const categoryValue = currentValue[piece.category];
                    const isDisabled = Array.isArray(categoryValue)
                      ? !!(categoryValue.length > 0 && !categoryValue.includes(piece.id))
                      : !!(categoryValue && categoryValue !== piece.id);

                    return (
                      <div className="flex flex-col w-[150px] items-center shrink-0" key={piece.id}>
                        <input
                          type="checkbox"
                          id={piece.id}
                          value={piece.id}
                          className="peer w-4 h-4 text-accentOrange bg-darkGray
                       focus:ring-0 ring-0 outline-none rounded-sm form-checkbox border-richGreen my-2"
                          {...register(piece.category)}
                          disabled={isDisabled}
                        />
                        <label
                          htmlFor={piece.id}
                          className="flex flex-col  relative  w-full aspect-[3/4] bg-darkGray  rounded-md cursor-pointer border-none border-3 overflow-hidden peer-checked:border-accentOrange peer-hover:border-accentOrange mb-1"
                        >
                          <ImageWithLoading url={piece.imageUrl} alt={piece.itemName} />
                        </label>
                        <p className="w-full truncate text-sm">{piece.itemName}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WardrobeDisplaySection;
