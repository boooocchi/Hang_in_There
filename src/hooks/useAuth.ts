// hooks/useAuth.js
import { useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  return { session, status, userId };
};
