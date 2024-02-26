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
    color: Colors!
    category: Categories!
    location: String
    price: Float
    userId: String!
    imageUrl: String!
  }

  type DendoOutfit {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    keywords: [String]
    userId: String!
    pieces: [Piece!]
    imageUrl: String
    description: String
  }

  type WishList {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    itemName: String!
    category: Categories!
    checked: Boolean!
    userId: String!
  }

  enum Categories {
    LIGHTTOPS
    HEAVYTOPS
    OUTERWEAR
    BOTTOMS
    SHOES
    ACCESSORIES
  }
  enum Colors {
    RED
    BLUE
    YELLOW
    GREEN
    BROWN
    BEIGE
    ORANGE
    PURPLE
    PINK
    BLACK
    WHITE
    GREY
    GOLD
    SILVER
    BRONZE
  }

  type Query {
    pieces(userId: String!, category: Categories): [Piece]
    piece(id: String!): Piece
    dendoOutfits(userId: String!): [DendoOutfit]
    dendoOutfit(id: String!): DendoOutfit
    limitEntries(userId: String!): [LimitEntry]
    wishList(userId: String!): [WishList]
  }

  type Mutation {
    signup(email: String!, password: String!, userName: String!): AuthPayload
    register_piece(
      title: String!
      description: String
      color: Colors!
      category: Categories!
      location: String
      price: Float
      imageUrl: String!
      userId: String!
    ): Piece
    update_piece(
      id: String!
      title: String!
      description: String
      color: Colors!
      category: Categories!
      location: String
      price: Float
      imageUrl: String!
    ): Piece
    delete_piece(id: String!): Piece
    register_outfit(
      title: String!
      keywords: [String]
      description: String
      userId: String!
      imageUrl: String
      pieces: [String]!
    ): DendoOutfit
    add_wish_list(itemName: String!, category: Categories!, userId: String!): WishList
    delete_wish_list(id: String!): WishList
    update_wish_list_name(id: String!, itemName: String!): WishList
    update_wish_list_status(id: String!, checked: Boolean!): WishList
  }

  type AuthPayload {
    user: User
  }
`;
