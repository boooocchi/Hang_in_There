import { Categories, Colors } from '@prisma/client';
import React from 'react';

import PieceForm from '@/features/registerPiece/components/PieceForm';

export type PieceDetailSectionProps = {
  pieceData?: {
    piece: {
      category: Categories;
      color: Colors;
      createdAt: string;
      description: string;
      id: string;
      imageUrl: string;
      brand: string;
      price: number;
      itemName: string;
    };
  };
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PieceDetailSection: React.FC<PieceDetailSectionProps> = ({ pieceData, editMode, setEditMode }) => {
  return <PieceForm pieceData={pieceData} editMode={editMode} setEditMode={setEditMode}></PieceForm>;
};

export default PieceDetailSection;
