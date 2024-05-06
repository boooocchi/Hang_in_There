import { Categories, Colors } from '@prisma/client';

export type RegisterPieceValues = {
  itemName: string;
  description?: string | null;
  brand?: string | null;
  price?: number | null;
  color: Colors;
  category: Categories;
  imageUrl: string;
};

export type PieceData = {
  id: string;
  itemName: string;
  description: string;
  brand: string;
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
