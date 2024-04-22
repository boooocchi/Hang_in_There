import { Categories, Piece } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import { RegisterOutfitValues } from '@/features/registerDendoOutift/types/types';
import { mainFont } from '@/pages/_app';

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
  const categoriesArray = Object.values(Categories);
  let currentValue: RegisterOutfitValues;

  const { sortedWardrobeData } = useWardrobe({ wardrobeData: allPieces });

  if (watch) {
    currentValue = watch();
  }

  return (
    <div className="flex flex-col gap-5 overflow-y-scroll  overflow-x-hidden">
      {sortedWardrobeData &&
        categoriesArray.map((category) => {
          const categoryData = sortedWardrobeData[category];
          if (categoryData?.length === 0) return null;
          return (
            <div key={category} className="flex flex-col gap-1">
              <h2 className={`text-xl tracking-tighter font-extraBold  ${mainFont.className}`}>
                {upperCamelCase(category)}
              </h2>
              <div className="flex lg:max-w-[1000px] overflow-x-scroll hide-scrollbar gap-5 ">
                {!registerPage &&
                  categoryData?.map((piece) => {
                    return (
                      <div className="flex flex-col gap-2 " key={piece.id}>
                        <Link href={`/piece/${piece.id}`} className="group overflow-hidden rounded-md">
                          <div className="flex flex-col gap-1 relative h-[300px] w-[225px] ">
                            <ImageWithLoading
                              url={piece.imageUrl}
                              alt={piece.title}
                              style="group-hover:scale-110 transition-all duration-300 ease-in"
                            />
                          </div>
                        </Link>
                        <p>{piece.title}</p>
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
                      <div className="flex flex-col gap-2  items-center " key={piece.id}>
                        <input
                          type="checkbox"
                          id={piece.id}
                          value={piece.id}
                          className="peer  w-4 h-4 text-accentOrange
                        mt-3 focus:ring-0 ring-0 outline-none rounded-sm form-checkbox border-lighterGreen"
                          {...register(piece.category)}
                          disabled={isDisabled}
                        />
                        <label
                          htmlFor={piece.id}
                          className="flex flex-col  relative h-[220px] w-[160px]   bg-white  rounded-md cursor-pointer border-none border-3 overflow-hidden peer-checked:border-accentOrange peer-hover:border-accentOrange "
                        >
                          <ImageWithLoading url={piece.imageUrl} alt={piece.title} />
                        </label>
                        <p>{piece.title}</p>
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
