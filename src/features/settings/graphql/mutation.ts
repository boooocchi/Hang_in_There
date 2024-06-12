import { gql } from '@apollo/client';

export const UPDATE_USER_INFO_MUTATION = gql`
  mutation Mutation(
    $userId: String!
    $userName: String!
    $email: String!
    $password: String
    $limitEntries: [LimitEntryInput]!
  ) {
    update_user_info(
      userId: $userId
      userName: $userName
      email: $email
      password: $password
      limitEntries: $limitEntries
    ) {
      success
    }
  }
`;
