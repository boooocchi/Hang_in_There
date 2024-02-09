import { Categories, Colors } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

import { titleFont } from '@/constants/FontFamily';
import { useAuth } from '@/hooks/useAuth';
import { mainFont } from '@/pages/_app';
import { dateFormatter } from '@/utils/formatDate';

import DeletePieceButton from './elements/DeletePieceButton';
import EditPieceButton from './elements/EditPieceButton';

type PieceDetailSectionProps = {
  pieceData: {
    piece: {
      category: Categories;
      color: Colors;
      createdAt: string;
      description: string;
      id: string;
      imageUrl: string;
      location: string;
      price: number;
      title: string;
    };
  };
};

const PieceDetailSection: React.FC<PieceDetailSectionProps> = ({ pieceData }) => {
  const userId = useAuth().session?.user?.id;
  const [keyArray, setKeyArray] = React.useState<string[]>([]);
  const [valueArray, setValueArray] = React.useState<(string | number)[]>([]);
  const [formattedCreatedAt, setFormattedCreatedAt] = React.useState<string>('');

  React.useEffect(() => {
    if (pieceData) {
      setKeyArray(Object.keys(pieceData.piece));
      setValueArray(Object.values(pieceData.piece));
      setFormattedCreatedAt(dateFormatter(new Date(pieceData?.piece.createdAt)));
    }
  }, [pieceData]);

  return (
    <div className="flex w-full h-full  gap-3xl relative">
      <div className="w-1/2 relative h-full flex flex-col gap-[5%]">
        <div className="flex h-[5%] items-center justify-between">
          <h1 className={`text-2xl flex items-center ${titleFont.className} `}>{pieceData?.piece.title}</h1>
          <div className="flex gap-2">
            <EditPieceButton />
            <DeletePieceButton pieceId={pieceData?.piece.id} userId={userId} category={pieceData?.piece.category} />
          </div>
        </div>

        <div className="h-[90%] flex flex-col  gap-5 ">
          {keyArray.map((key, index) => {
            if (key === 'title' || key === '__typename' || key === 'imageUrl' || key === 'createdAt' || key === 'id')
              return null;
            if (key === 'description')
              return (
                <div key={key} className="flex flex-col gap-1">
                  <p className=" font-medium">{key}</p>
                  <p className="text-lg font-bold">&quot;{valueArray[index]}&quot;</p>
                </div>
              );
            return (
              <div key={key} className="flex items-center gap-1">
                <p className=" font-medium">{key}......</p>
                <p className="text-lg font-bold">{valueArray[index]}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col h-full w-1/2 gap-[2%]">
        <span className={`text-sm h-[5%] ${mainFont.className} flex  items-end justify-end`}>
          registered on {formattedCreatedAt}
        </span>
        <div className="h-[93%] aspect-[3/4]  rounded-md overflow-hidden  relative ">
          <Image src={pieceData?.piece.imageUrl} fill={true} style={{ objectFit: 'cover' }} alt="Item picture"></Image>
        </div>
      </div>
    </div>
  );
};

export default PieceDetailSection;
