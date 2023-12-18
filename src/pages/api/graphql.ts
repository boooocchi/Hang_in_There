import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { createContext } from '../../../graphql/context';
import { resolvers } from '../../../graphql/resolvers/resolvers';
import { typeDefs } from '../../../graphql/schema/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export default handler;
