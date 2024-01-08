import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userName: string;
      id: string;
    } & DefaultSession['user'];
  }
}
