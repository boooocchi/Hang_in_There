import { gql } from '@apollo/client';

export const EDIT_DENDO_OUTFIT = gql`
  mutation Mutation($id: String!) {
    edit_dendo_outfit(id: $id) {
      id
    }
  }
`;

export const DELETE_DENTO_OUTFIT = gql`
  mutation Mutation($id: String!) {
    delete_outfit(id: $id) {
      id
    }
  }
`;
