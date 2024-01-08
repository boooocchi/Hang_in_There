import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';

import { LimitCategories } from '../../../../graphql/resolvers/resolvers';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credential: {},
      async authorize(credential) {
        const { email, password } = credential;

        if (!email || !password) {
          return false;
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return false;
        }

        const passwordMatch = await compare(password, user.password);

        if (passwordMatch) {
          return user;
        } else {
          console.error('Wrong password');
          return false;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        console.error(profile);
        return {
          id: profile.sub,
          userName: profile.given_name,
          email: profile.email,
          googleSignin: true,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      if (account?.provider === 'google') {
        token.id = user.id;
        token.email = user.email;
        token.userName = user.userName;
        if (isNewUser) {
          LimitCategories.forEach(async (category) => {
            await prisma.limitEntry.create({
              data: {
                category,
                value: 20,
                userId: user.id,
              },
            });
          });
        }
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userName = token.userName;
      return session;
    },
  },
  redirect: async ({ url, baseUrl }) => {
    return url.startsWith(baseUrl) ? url : baseUrl;
  },
};

export default NextAuth(authOptions);
