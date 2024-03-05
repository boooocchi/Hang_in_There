import { gql } from '@apollo/client';

export const REGISTER_PIECE_MUTATION = gql`
  mutation Mutation(
    $title: String!
    $color: Colors!
    $category: Categories!
    $userId: String!
    $description: String
    $location: String
    $price: Float
    $imageUrl: String!
  ) {
    register_piece(
      title: $title
      color: $color
      category: $category
      userId: $userId
      description: $description
      location: $location
      price: $price
      imageUrl: $imageUrl
    ) {
      title
    }
  }
`;
