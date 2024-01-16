import { gql } from '@apollo/client';

export const getAllPieces = gql`
  query getAllPieces {
    pieces {
      id
      title
      createdAt
      description
      price
      category
      location
      color
    }
  }
`;
