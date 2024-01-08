type Piece = {
  category: string;
};

export const percentageCalculator = (value: number, currentNumberOfPieces: number) => {
  return Math.round((currentNumberOfPieces / value) * 100);
};

export const countByCategory = (pieces: Piece[], category: string) => {
  return pieces.filter((piece) => piece.category === category).length;
};
