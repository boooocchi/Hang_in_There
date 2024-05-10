import Link from 'next/link';
import React from 'react';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import { DendoOutfitIllustration } from '@/components/elements/icons/icons';
import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { dateFormatter } from '@/utils/utils';

import PullDownMenu from './elements/PullDownMenu';

type DendoOutfitCardProps = {
  dendoOutfit: dendoOutfitType;
  setArgs: React.Dispatch<React.SetStateAction<{ id: string; imageUrl: string }>>;
  toggleModal: () => void;
};

const DendoOutfitCard: React.FC<DendoOutfitCardProps> = ({ dendoOutfit, setArgs, toggleModal }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs ml-auto flex justify-end gap-2">
        {dateFormatter(new Date(dendoOutfit.createdAt))}
        <PullDownMenu
          deleteHandler={() => {
            toggleModal();
            setArgs({ id: dendoOutfit.id, imageUrl: dendoOutfit.imageUrl });
          }}
        ></PullDownMenu>
      </div>

      <div className="aspect-[3/4] w-full overflow-hidden relative rounded-md group shadow-md">
        <Link href={`/dendoOutfit/${dendoOutfit.id}`}>
          {dendoOutfit.imageUrl ? (
            <ImageWithLoading
              url={dendoOutfit.imageUrl}
              alt="dendo outfit"
              style="group-hover:scale-110  transition-all duration-200 ease-in "
            />
          ) : (
            <div className="w-full h-full flex bg-gray justify-center items-center">
              <DendoOutfitIllustration />
            </div>
          )}
        </Link>
      </div>
      <div className="w-full mt-1 flex justify-start" key={dendoOutfit.id}>
        <p className="mt-1 w-full  truncate text-base">{dendoOutfit.title}</p>
      </div>
    </div>
  );
};

export default DendoOutfitCard;
