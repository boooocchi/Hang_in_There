// global.d.ts
import { PrismaClient } from '@prisma/client';

// Extend the NodeJS global type with the prisma client property
declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient;
  }
}

export {};
