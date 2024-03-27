import { Categories, Piece } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import Loading from '@/components/elements/message/Loading';
import { RegisterOutfitValues } from '@/features/registerDendoOutift/types/types';
import { mainFont } from '@/pages/_app';

import { upperCamelCase } from '../utility/upperCamelCase';

type WardrobeDisplaySectionProps = {
  registerPage?: boolean;
  register?: UseFormRegister<RegisterOutfitValues>;
  watch?: UseFormWatch<RegisterOutfitValues>;
  wardrobeData: {
    LIGHTTOPS: Piece[];
    HEAVYTOPS: Piece[];
    OUTERWEAR: Piece[];
    BOTTOMS: Piece[];
    SHOES: Piece[];
    ACCESSORIES: Piece[];
  };
};

export type ImageLoadedState = {
  [key: string]: boolean;
};

const WardrobeDisplaySection: React.FC<WardrobeDisplaySectionProps> = ({
  registerPage,
  register,
  watch,
  wardrobeData,
}) => {
  const categoriesArray = Object.values(Categories);
  let currentValue: RegisterOutfitValues;
  if (watch) {
    currentValue = watch();
  }

  const [imageLoaded, setImageLoaded] = React.useState<ImageLoadedState>({});

  const handleImageLoad = (id: string) => {
    setImageLoaded({ ...imageLoaded, [id]: true });
  };

  return (
    <div className="flex flex-col gap-5 overflow-y-scroll  overflow-x-hidden">
      {categoriesArray.map((category) => {
        const categoryData = wardrobeData[category];
        if (categoryData?.length === 0) return null;
        return (
          <div key={category} className="flex flex-col  gap-2 ">
            <h2 className={`text-xl tracking-tighter font-extraBold mb-1  ${mainFont.className}`}>
              {upperCamelCase(category)}
            </h2>
            <div className="flex lg:max-w-[1000px] overflow-x-scroll hide-scrollbar gap-5">
              {!registerPage &&
                categoryData?.map((piece) => {
                  return (
                    <div className="flex flex-col gap-2 " key={piece.id}>
                      <Link href={`/piece/${piece.id}`} className="group overflow-hidden rounded-md">
                        <div className="flex flex-col gap-1 relative h-[300px] w-[225px] ">
                          {!imageLoaded[piece.id] && <Loading size="large" />}
                          <Image
                            src={piece.imageUrl}
                            alt={piece.title}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            className="rounded-md group-hover:scale-110 transition-all duration-300 ease-in"
                            onLoad={() => handleImageLoad(piece.id)}
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
                    <div className="flex flex-col gap-2 mb-3 items-center " key={piece.id}>
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
                        className="flex flex-col gap-1 relative h-[275px] w-[200px]   bg-white  rounded-md cursor-pointer border-none border-3 overflow-hidden peer-checked:border-accentOrange peer-hover:border-accentOrange "
                      >
                        <Image
                          src={piece.imageUrl}
                          alt={piece.title}
                          fill={true}
                          style={{ objectFit: 'cover' }}
                          className="rounded-md"
                        />
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
