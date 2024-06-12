import { gql, useQuery } from '@apollo/client';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import SmtWrongMessage from '@/components/elements/message/SmtWrongMessage';
import MainLayout from '@/components/layouts/layout/MainLayout';
import SettingsForm from '@/features/settings/components/SettingsForm';
import { useAuth } from '@/hooks/useAuth';

export const GET_USER_QUERY = gql`
  query Get_user($userId: String!) {
    get_user(userId: $userId) {
      userName
      email
      googleSignin
      limitEntries {
        category
        value
        userId
      }
    }
  }
`;

const Index = () => {
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { userId },
  });

  if (error) {
    return <SmtWrongMessage />;
  }
  if (loading) {
    return <Loading size="large" />;
  }
  return (
    <MainLayout title="Settings">
      <SettingsForm userData={data?.get_user} />
    </MainLayout>
  );
};

export default Index;
