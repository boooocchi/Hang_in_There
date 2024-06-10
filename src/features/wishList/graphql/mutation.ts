import { gql } from '@apollo/client';

export const WISH_LIST_ADD_MUTATION = gql`
  mutation Mutation($itemName: String!, $category: Categories!, $userId: String!) {
    add_wish_list(itemName: $itemName, category: $category, userId: $userId) {
      id
      itemName
      category
      checked
    }
  }
`;

export const WISH_LIST_DELETE_MUTATION = gql`
  mutation Mutation($id: String!) {
    delete_wish_list(id: $id) {
      id
    }
  }
`;

export const WISH_LIST_UPDATE_MUTATION = gql`
  mutation Update_wish_list_name($id: String!, $itemName: String!) {
    update_wish_list_name(id: $id, itemName: $itemName) {
      id
      createdAt
      updatedAt
      itemName
      category
      checked
      userId
    }
  }
`;

export const WISH_LIST_STATUS_UPDATE = gql`
  mutation Update_wish_list_status($id: String!, $checked: Boolean!) {
    update_wish_list_status(id: $id, checked: $checked) {
      id
      createdAt
      updatedAt
      itemName
      category
      checked
      userId
    }
  }
`;
