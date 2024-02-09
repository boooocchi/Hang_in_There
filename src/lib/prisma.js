'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// /lib/prisma.ts
var client_1 = require('@prisma/client');
var prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new client_1.PrismaClient();
} else {
  // TypeScript now recognizes `global.prisma` as a PrismaClient instance.
  if (!global.prisma) {
    global.prisma = new client_1.PrismaClient();
  }
  prisma = global.prisma;
}
exports.default = prisma;
