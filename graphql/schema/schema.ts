import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    userName: String
    password: String!
    pieces: [Piece]
    dendoOutfits: [DendoOutfit]
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
    DRESSSHIRT
    CASUALSHIRT
    SWEATER
    SWEATSHIRT
    JACKET
    COAT
    DRESSPANTS
    CASUALPANTS
    SHORTS
    SKIRT
    DRESS
    SHOES
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
    pieces: [Piece]
    dendoOutfits: [DendoOutfit]
  }
`;
