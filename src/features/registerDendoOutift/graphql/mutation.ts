import { gql } from 'apollo-server-micro';

export const REGISTER_OUTFIT = gql`
  mutation Mutation(
    $userId: String!
    $keywords: [String]
    $description: String
    $pieces: [String]!
    $title: String!
    $imageUrl: String
  ) {
    register_outfit(
      userId: $userId
      pieces: $pieces
      title: $title
      keywords: $keywords
      imageUrl: $imageUrl
      description: $description
    ) {
      id
      title
    }
  }
`;
