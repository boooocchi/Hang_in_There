import { Colors, Categories } from '@prisma/client';

export type OpenAiValues = {
  message: string;
  piece: Piece;
};

export interface Piece {
  title: string;
  description: string | null;
  color: Colors | null;
  category: Categories | null;
}
