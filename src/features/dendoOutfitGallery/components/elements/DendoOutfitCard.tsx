import Link from 'next/link';
import React from 'react';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import { EllipsisIcon } from '@/components/elements/icons/icons';
import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { dateFormatter } from '@/utils/utils';

type DendoOutfitCardProps = {
  dendoOutfit: dendoOutfitType;
};

const DendoOutfitCard: React.FC<DendoOutfitCardProps> = ({ dendoOutfit }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs ml-auto flex justify-end gap-2">
        {dateFormatter(new Date(dendoOutfit.createdAt))}
        <EllipsisIcon />
      </div>

      <div className="aspect-[3/4] w-full overflow-hidden relative rounded-md group">
        <Link href={`/dendoOutfit/${dendoOutfit.id}`}>
          <ImageWithLoading
            url={dendoOutfit.imageUrl ? dendoOutfit.imageUrl : '/image/home/dendo_outfit.jpg'}
            alt="dendo outfit"
            style="group-hover:scale-110  transition-all duration-200 ease-in "
          />
        </Link>
      </div>
      <div className="w-full mt-1 flex justify-start" key={dendoOutfit.id}>
        <p className="mt-1 w-full  truncate text-base">{dendoOutfit.title}</p>
      </div>
    </div>
  );
};

export default DendoOutfitCard;
