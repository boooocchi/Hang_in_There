import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { dateFormatter } from '@/utils/formatDate';

type DendoOutfitCardProps = {
  dendoOutfit: dendoOutfitType;
};

const DendoOutfitCard: React.FC<DendoOutfitCardProps> = ({ dendoOutfit }) => {
  return (
    <>
      <div className="aspect-[3/4] w-full overflow-hidden relative rounded-md group">
        <Link href={`/dendoOutfit/${dendoOutfit.id}`}>
          <Image
            src={dendoOutfit.imageUrl ? dendoOutfit.imageUrl : '/image/home/dendo_outfit.jpg'}
            alt="dendo outfit"
            fill={true}
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-110  transition-all duration-200 ease-in "
          />
        </Link>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="mt-1" key={dendoOutfit.id}>
          {dendoOutfit.title}
        </p>
        <span className="text-xs ml-auto">{dateFormatter(new Date(dendoOutfit.createdAt))}</span>
      </div>
    </>
  );
};

export default DendoOutfitCard;
