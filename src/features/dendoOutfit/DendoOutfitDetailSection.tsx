import { Categories, Colors } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

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
    <div className="flex gap-5 flex-grow ">
      <div className="w-1/2 flex justify-start items-start  gap-3 h-full">
        <div className="grid grid-cols-1 gap-2 content-start h-full">
          {dendoOutfitDetailsData?.pieces?.map((piece) => {
            return (
              <button
                key={piece.title}
                className={`h-[80px] aspect-[3/4] overflow-hidden relative ${
                  featuredPic === piece.imageUrl && 'border-accentOrange border-2 rounded-lg'
                }`}
                onClick={() => setFeaturedPic(piece.imageUrl)}
              >
                <Image alt="piece photo" src={piece.imageUrl} fill objectFit="fill" className="rounded-md" />
              </button>
            );
          })}
        </div>
        <div className="h-full  aspect-[3/4] relative">
          <Image src={featuredPic} fill objectFit="fill" alt="featuredPhoto" className="rounded-md" />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col mb-2">
            <h2 className={`text-lg font-extraBold mb-1  ${mainFont.className}`}>Description</h2>
            <p>{dendoOutfitDetailsData?.description}</p>
          </div>
          <h2 className={`text-lg font-extraBold mb-1  ${mainFont.className}`}>Keywords</h2>
          <div className="flex gap-2">
            {dendoOutfitDetailsData.keywords.map((keyword) => (
              <span key="keyword" className="bg-lightGreen rounded-md px-sm py-xs">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DendoOutfitDetailSection;
