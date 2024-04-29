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
      id
      createdAt
      updatedAt
      title
      description
      color
      category
      location
      price
      userId
      imageUrl
    }
  }
`;

export const UPDATE_PIECE_MUTATION = gql`
  mutation Update_piece(
    $id: String!
    $title: String!
    $color: Colors!
    $category: Categories!
    $imageUrl: String!
    $description: String
    $location: String
    $price: Float
  ) {
    update_piece(
      id: $id
      title: $title
      color: $color
      category: $category
      imageUrl: $imageUrl
      description: $description
      location: $location
      price: $price
    ) {
      title
    }
  }
`;
