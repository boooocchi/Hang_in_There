export const resolvers = {
  Query: {
    pieces: (_parent, _args, context) => {
      return context.prisma.piece.findMany();
    },
  },
};
