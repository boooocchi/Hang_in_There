import { Categories, Colors } from '@prisma/client';

export type RegisterPieceValues = {
  title: string;
  description?: string;
  location?: string;
  price?: number | null;
  color: Colors | null;
  category: Categories | null;
  imageUrl?: string;
};

export type PieceData = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  color: Colors;
  category: Categories;
  imageUrl: string;
  createdAt: string;
};

export type WardrobeQueryData = {
  all_pieces: PieceData[];
};

export type RegisterPieceMutationData = {
  register_piece: PieceData;
};
