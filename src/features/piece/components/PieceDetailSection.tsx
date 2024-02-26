import { Categories, Colors } from '@prisma/client';
import React from 'react';

import Form from '@/features/registerPiece/components/Form';

export type PieceDetailSectionProps = {
  pieceData?: {
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
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PieceDetailSection: React.FC<PieceDetailSectionProps> = ({ pieceData, editMode, setEditMode }) => {
  return <Form pieceData={pieceData} editMode={editMode} setEditMode={setEditMode}></Form>;
};

export default PieceDetailSection;
