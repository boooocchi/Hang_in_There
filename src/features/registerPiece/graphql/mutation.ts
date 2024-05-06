import { gql } from '@apollo/client';

export const REGISTER_PIECE_MUTATION = gql`
  mutation Mutation(
    $itemName: String!
    $color: Colors!
    $category: Categories!
    $userId: String!
    $description: String
    $brand: String
    $price: Float
    $imageUrl: String!
  ) {
    register_piece(
      itemName: $itemName
      color: $color
      category: $category
      userId: $userId
      description: $description
      brand: $brand
      price: $price
      imageUrl: $imageUrl
    ) {
      id
      createdAt
      updatedAt
      itemName
      description
      color
      category
      brand
      price
      userId
      imageUrl
    }
  }
`;

export const UPDATE_PIECE_MUTATION = gql`
  mutation Update_piece(
    $id: String!
    $itemName: String!
    $color: Colors!
    $category: Categories!
    $imageUrl: String!
    $description: String
    $brand: String
    $price: Float
  ) {
    update_piece(
      id: $id
      itemName: $itemName
      color: $color
      category: $category
      imageUrl: $imageUrl
      description: $description
      brand: $brand
      price: $price
    ) {
      itemName
    }
  }
`;

export const UPLOAD_S3_IMAGE = gql`
  mutation ($fileName: String!) {
    upload_s3_image(fileName: $fileName) {
      url
      fields
      key
      success
    }
  }
`;
