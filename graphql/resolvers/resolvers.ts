import { Categories, Colors } from '@prisma/client';
import { hash } from 'bcrypt';

import { Context } from '../context';

export const LimitCategories = ['SHOES', 'OUTERWEAR', 'LIGHTTOPS', 'HEAVYTOPS', 'BOTTOMS', 'ACCESSORIES'];

type limitEntriesArgs = {
  userId: string;
};
type pieceArgs = {
  userId: string;
  category: Categories;
};

type signUpMutationArgs = {
  email: string;
  password: string;
  userName: string;
};

type registerPieceArgs = {
  title: string;
  description: string;
  color: Colors;
  category: Categories;
  location?: string;
  price?: number;
  imageUrl: string;
  userId: string;
};

type registerOutfitArgs = {
  title: string;
  keywords?: string[];
  imageUrl?: string;
  userId: string;
  pieces: string[];
};

export const resolvers = {
  Query: {
    pieces: (_parent: unknown, args: pieceArgs, context: Context) => {
      return context.prisma.piece.findMany({
        where: { userId: args.userId, category: args.category },
      });
    },
    piece: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.piece.findUnique({
        where: { id: args.id },
      });
    },
    limitEntries: (_parent: unknown, args: limitEntriesArgs, context: Context) => {
      return context.prisma.limitEntry.findMany({
        where: { userId: args.userId },
      });
    },
    dendoOutfits: (_parent: unknown, args: { userId: string }, context: Context) => {
      return context.prisma.dendoOutfit.findMany({
        where: { userId: args.userId },
      });
    },
    wishList: (_parent: unknown, args: { userId: string }, context: Context) => {
      return context.prisma.wishList.findMany({
        where: { userId: args.userId },
      });
    },
  },
  Mutation: {
    signup: async (_parent: unknown, args: signUpMutationArgs, context: Context) => {
      const { email, password, userName } = args;
      const hashedPassword = await hash(password, 10);

      try {
        const user = await context.prisma.user.create({
          data: {
            userName,
            email,
            password: hashedPassword,
          },
        });
        if (user) {
          LimitCategories.forEach(async (category) => {
            await context.prisma.limitEntry.create({
              data: {
                category: category as Categories,
                value: 20,
                userId: user.id,
              },
            });
          });
        }
        return { user };
      } catch (e: unknown) {
        if (typeof e === 'object' && e !== null && 'code' in e) {
          const error = e as { code: string }; // Type assertion
          if (error.code === 'P2002') {
            throw new Error('This email already exists');
          }
        }
        throw new Error('Something went wrong');
      }
    },
    register_piece: async (_parent: unknown, args: registerPieceArgs, context: Context) => {
      try {
        const piece = await context.prisma.piece.create({
          data: {
            title: args.title,
            description: args.description,
            color: args.color,
            category: args.category,
            location: args.location,
            price: args.price,
            imageUrl: args.imageUrl,
            userId: args.userId,
          },
        });
        return piece;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to register piece: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    delete_piece: async (_parent: unknown, args: { id: string }, context: Context) => {
      try {
        const piece = await context.prisma.piece.delete({
          where: { id: args.id },
        });
        return piece;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete piece: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    register_outfit: async (_parent: unknown, args: registerOutfitArgs, context: Context) => {
      try {
        const dendoOutfit = await context.prisma.dendoOutfit.create({
          data: {
            title: args.title,
            keywords: args.keywords,
            imageUrl: args.imageUrl,
            userId: args.userId,
            pieces: {
              connect: args.pieces.map((id) => ({ id })),
            },
          },
        });
        return dendoOutfit;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to register piece: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    add_wish_list: async (
      _parent: unknown,
      args: { itemName: string; category: Categories; userId: string },
      context: Context,
    ) => {
      try {
        const wishList = await context.prisma.wishList.create({
          data: {
            itemName: args.itemName,
            category: args.category,
            userId: args.userId,
          },
        });
        return wishList;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to add to wishlist: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
};
