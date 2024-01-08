import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    userName: String
    password: String
    googleSignin: Boolean
    limitEntries: [LimitEntry]
    pieces: [Piece]
    dendoOutfits: [DendoOutfit]
  }

  type LimitEntry {
    id: String!
    category: Categories!
    value: Float!
    userId: String!
  }

  type Piece {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    description: String
    colors: Colors
    category: Categories!
    location: String
    price: Float
    userId: String!
  }

  type DendoOutfit {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    keywords: [String]
    userId: String!
    pieces: [Piece]
  }

  enum Categories {
    SHOES
    OUTERWEAR
    LIGHTTOPS
    HEAVYTOPS
    BOTTOMS
    ACCESSORIES
  }
  enum Colors {
    RED
    BLUE
    YELLOW
    GREEN
    ORANGE
    PURPLE
    PINK
    BLACK
    WHITE
    BROWN
    GREY
    GOLD
    SILVER
    BRONZE
  }

  type Query {
    pieces(userId: String!): [Piece]
    dendoOutfits: [DendoOutfit]
    limitEntries(userId: String!): [LimitEntry]
  }

  type Mutation {
    signup(email: String!, password: String!, userName: String!): AuthPayload
  }

  type AuthPayload {
    user: User
  }
`;
