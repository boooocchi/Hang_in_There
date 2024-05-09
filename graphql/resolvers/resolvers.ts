import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { Categories, Colors } from '@prisma/client';
import { hash } from 'bcrypt';

import { Context } from '../context';

export const LimitCategories = ['OUTERWEAR', 'LIGHTTOPS', 'HEAVYTOPS', 'BOTTOMS', 'SHOES', 'ACCESSORIES'];

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
  itemName: string;
  description: string;
  color: Colors;
  category: Categories;
  brand?: string;
  price?: number;
  imageUrl: string;
  userId: string;
};

type registerOutfitArgs = {
  title: string;
  keywords?: string[];
  imageUrl?: string;
  userId: string;
  description?: string;
  pieces: string[];
};

export type UploadS3ImageResult = {
  url: string;
  fields: Record<string, string>;
  key: string;
  success: boolean;
};

export const resolvers = {
  Query: {
    get_user: (_parent: unknown, args: { userId: string }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: args.userId },
        include: { limitEntries: true },
      });
    },
    all_pieces: (_parent: unknown, args: pieceArgs, context: Context) => {
      return context.prisma.piece.findMany({
        where: { userId: args.userId },
      });
    },
    pieces: (_parent: unknown, args: pieceArgs, context: Context) => {
      return context.prisma.piece.findMany({
        where: { userId: args.userId, category: args.category },
      });
    },
    pieces_search: (_parent: unknown, args: { userId: string; searchText: string }, context: Context) => {
      return context.prisma.piece.findMany({
        where: {
          userId: args.userId,
          OR: [
            { itemName: { contains: args.searchText } },
            { description: { contains: args.searchText } },
            { brand: { contains: args.searchText } },
          ],
        },
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
    dendoOutfits_search: (_parent: unknown, args: { userId: string; searchText: string }, context: Context) => {
      return context.prisma.dendoOutfit.findMany({
        where: {
          userId: args.userId,
          OR: [
            { title: { contains: args.searchText } },
            { description: { contains: args.searchText } },
            { keywords: { hasSome: [args.searchText] } },
          ],
        },
      });
    },
    dendoOutfit: (_parent: unknown, args: { id: string }, context: Context) => {
      return context.prisma.dendoOutfit.findUnique({
        where: { id: args.id },
        include: { pieces: true },
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
          await prisma.chatRestriction.create({
            data: {
              userId: user.id,
              count: 0,
              lastUpdated: new Date(),
            },
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
            itemName: args.itemName,
            description: args.description,
            color: args.color,
            category: args.category,
            brand: args.brand,
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
    update_piece: async (
      _parent: unknown,
      args: {
        id: string;
        itemName: string;
        description?: string;
        color: Colors;
        category: Categories;
        brand?: string;
        price?: number;
        imageUrl: string;
      },
      context: Context,
    ) => {
      try {
        const piece = await context.prisma.piece.update({
          where: { id: args.id },
          data: {
            itemName: args.itemName,
            description: args.description,
            color: args.color,
            category: args.category,
            brand: args.brand,
            price: args.price,
            imageUrl: args.imageUrl,
          },
        });
        return piece;
      } catch (error) {
        throw new Error(`Failed to update piece..`);
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
        throw new Error(`Failed to delete piece..`);
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
            description: args.description,
            pieces: {
              connect: args.pieces.map((id) => ({ id })),
            },
          },
        });
        return dendoOutfit;
      } catch (error) {
        throw new Error(`Failed to register piece..`);
      }
    },
    delete_outfit: async (_parent: unknown, args: { id: string }, context: Context) => {
      try {
        const dendoOutfit = context.prisma.dendoOutfit.delete({
          where: { id: args.id },
        });
        return dendoOutfit;
      } catch (error) {
        throw new Error('Failed to delete your outfit');
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
        throw new Error(`Failed to add to wishlist item...`);
      }
    },
    delete_wish_list: async (_parent: unknown, args: { id: string }, context: Context) => {
      try {
        const wishList = await context.prisma.wishList.delete({
          where: { id: args.id },
        });
        return wishList;
      } catch (error) {
        throw new Error(`Failed to delete from wishlist...`);
      }
    },
    update_wish_list_name: async (_parent: unknown, args: { id: string; itemName: string }, context: Context) => {
      try {
        const updatedItem = await context.prisma.wishList.update({
          where: { id: args.id },
          data: {
            itemName: args.itemName,
          },
        });
        return updatedItem;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to update wishlist item...`);
      }
    },
    update_wish_list_status: async (_parent: unknown, args: { id: string; checked: boolean }, context: Context) => {
      try {
        const updatedItem = await context.prisma.wishList.update({
          where: { id: args.id },
          data: {
            checked: args.checked,
          },
        });
        return updatedItem;
      } catch (error) {
        throw new Error(`Failed to update wishlist item...`);
      }
    },
    delete_s3_image: async (_parent: unknown, args: { fileKey: string }, _context: Context) => {
      if (!process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY || !process.env.S3_REGION) {
        throw new Error('S3 credentials or region are not defined');
      }

      const s3 = new S3Client({
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY,
        },
        region: process.env.S3_REGION,
      });

      if (!process.env.S3_BUCKET_NAME) {
        throw new Error('S3 bucket name is not defined');
      }

      const params = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: args.fileKey,
      });

      try {
        await s3.send(params);
        return { success: true };
      } catch (error) {
        console.error('Error deleting image from S3:', error);
        throw new Error('Failed to delete the image');
      }
    },
    upload_s3_image: async (
      _parent: unknown,
      args: { fileName: string },
      _context: Context,
    ): Promise<UploadS3ImageResult> => {
      if (
        !process.env.S3_ACCESS_KEY ||
        !process.env.S3_SECRET_KEY ||
        !process.env.S3_REGION ||
        !process.env.S3_BUCKET_NAME
      ) {
        throw new Error('S3 credentials, region, or bucket name are not defined');
      }

      const s3 = new S3Client({
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY,
        },
        region: process.env.S3_REGION,
      });

      const bucketName = process.env.S3_BUCKET_NAME;
      const filename = encodeURIComponent(args.fileName);
      const key = `${Date.now()}-${filename}`; // Ensure the file key is unique

      try {
        const { url, fields } = await createPresignedPost(s3, {
          Bucket: bucketName,
          Key: key,
          Fields: { 'Content-Type': 'image/png' },
          Conditions: [['content-length-range', 0, 10485760]],
          Expires: 60,
        });

        return {
          url,
          fields,
          key,
          success: true,
        };
      } catch (error) {
        console.error('Error creating presigned URL:', error);
        throw new Error();
      }
    },
    update_user_info: async (
      _parent: unknown,
      args: {
        userId: string;
        userName: string;
        email: string;
        password: string | undefined;
        limitEntries: { category: Categories; value: number }[];
      },
      context: Context,
    ) => {
      const { userId, userName, email, password, limitEntries } = args;

      try {
        await context.prisma.user.update({
          where: { id: userId },
          data: {
            userName: userName,
            email: email,
            limitEntries: {
              updateMany: limitEntries.map((entry) => ({
                where: { userId: userId, category: entry.category },
                data: { value: entry.value },
              })),
            },
          },
        });

        if (password) {
          const hashedPassword = await hash(password, 10);
          await context.prisma.user.update({
            where: { id: userId },
            data: {
              password: hashedPassword,
            },
          });
        }
        return { success: true };
      } catch (e) {
        console.error(e);
        throw new Error('Failed to update user info..');
      }
    },
  },
};
