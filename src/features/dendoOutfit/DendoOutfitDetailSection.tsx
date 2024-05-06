import { Categories, Colors } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import { mainFont } from '@/constants/FontFamily';

type DendoOutfitDetailSectionProps = {
  dendoOutfitDetailsData: {
    title: string;
    createdAt: string;
    description: string;
    id: string;
    imageUrl: string;
    pieces: piece[];
    keywords: string[];
  };
};

type piece = {
  imageUrl: string;
  title: string;
  color: Colors;
  category: Categories;
};

const DendoOutfitDetailSection: React.FC<DendoOutfitDetailSectionProps> = ({ dendoOutfitDetailsData }) => {
  const [featuredPic, setFeaturedPic] = React.useState<string>(
    dendoOutfitDetailsData?.imageUrl ? dendoOutfitDetailsData.imageUrl : dendoOutfitDetailsData?.pieces[0].imageUrl,
  );

  return (
    <div className="flex xs:gap-5 gap-lg flex-grow xs:flex-row flex-col w-full">
      <div className="flex max-xs:flex-row-reverse justify-start items-start max-xs:gap-sm h-full max-xs:max-h-[366px] max-xs:overflow-hidden">
        <div className="grid grid-cols-1 gap-2 content-start h-full max-xs:overflow-y-scroll no-scrollover min-w-[70px]">
          {dendoOutfitDetailsData.imageUrl && (
            <button
              key={dendoOutfitDetailsData.imageUrl}
              className={`h-[80px] aspect-[3/4] overflow-hidden relative rounded-md ${
                featuredPic === dendoOutfitDetailsData.imageUrl && 'border-accentOrange border-2 '
              }`}
              onClick={() => setFeaturedPic(dendoOutfitDetailsData.imageUrl)}
            >
              <Image
                alt="piece photo"
                src={dendoOutfitDetailsData.imageUrl}
                fill
                objectFit="cover"
                className="rounded-md"
              />
            </button>
          )}
          {dendoOutfitDetailsData?.pieces?.map((piece) => {
            return (
              <button
                key={piece.title}
                className={`h-[80px] aspect-[3/4] overflow-hidden relative rounded-md ${
                  featuredPic === piece.imageUrl && 'border-accentOrange border-2'
                }`}
                onClick={() => setFeaturedPic(piece.imageUrl)}
              >
                <Image alt="piece photo" src={piece.imageUrl} fill objectFit="cover" className="rounded-md" />
              </button>
            );
          })}
        </div>
        <div className="xs:h-full max-xs:w-4/5 aspect-[3/4] relative">
          <ImageWithLoading url={featuredPic} alt="featuredPhoto" />
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-md">
        <div className="flex flex-col mb-2">
          <h2 className={`text-lg font-extraBold mb-2  ${mainFont.className}`}>Description</h2>
          <p className="min-h-[250px] bg-gray shadow-md px-lg py-md rounded-lg">
            {dendoOutfitDetailsData?.description}
          </p>
        </div>
        <h2 className={`text-lg font-extraBold mb-2${mainFont.className}`}>Keywords</h2>
        <div className="flex gap-2 max-xs:overflow-x-scroll">
          {dendoOutfitDetailsData.keywords.map((keyword) => (
            <span key="keyword" className="bg-gray shadow-md rounded-md px-sm py-xs">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DendoOutfitDetailSection;
