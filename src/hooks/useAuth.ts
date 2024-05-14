// hooks/useAuth.js
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') router.push('/auth/signin');
  }, [session, status, router]);

  return { session, status, userId };
};
