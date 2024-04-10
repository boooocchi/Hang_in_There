import { gql } from '@apollo/client';

export const WISH_LIST_QUERY = gql`
  query WishList($userId: String!) {
    wishList(userId: $userId) {
      category
      checked
      id
      itemName
    }
  }
`;
