import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar DateTime
  scalar JSONObject

  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    userName: String
    password: String
    googleSignin: Boolean
    limitEntries: [LimitEntry]
    chatRestriction: ChatRestriction
    pieces: [Piece]
    dendoOutfits: [DendoOutfit]
  }

  type LimitEntry {
    id: String!
    category: Categories!
    value: Float!
    userId: String!
  }

  type ChatRestriction {
    id: String!
    userId: String!
    lastUpdated: DateTime!
    count: Float!
  }

  input LimitEntryInput {
    category: Categories!
    value: Float!
  }

  type Piece {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    itemName: String!
    description: String
    color: Colors!
    category: Categories!
    brand: String
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
    BLACK
    WHITE
    GRAY
    BROWN
    BEIGE
    RED
    BLUE
    YELLOW
    GREEN
    ORANGE
    PURPLE
    PINK
    GOLD
    SILVER
    BRONZE
  }

  type Query {
    get_user(userId: String!): User
    all_pieces(userId: String!): [Piece]
    pieces(userId: String!, category: Categories): [Piece]
    pieces_search(userId: String!, searchText: String!): [Piece]
    piece(id: String!): Piece
    dendoOutfits(userId: String!): [DendoOutfit]
    dendoOutfits_search(userId: String!, searchText: String!): [DendoOutfit]
    dendoOutfit(id: String!): DendoOutfit
    limitEntries(userId: String!): [LimitEntry]
    wishList(userId: String!): [WishList]
  }

  type UploadS3Response {
    url: String!
    fields: JSONObject!
    key: String!
    success: Boolean!
  }

  type S3Response {
    success: Boolean!
  }

  type UserSettingsUpdateResponse {
    success: Boolean!
  }

  type Mutation {
    signup(email: String!, password: String!, userName: String!): AuthPayload
    register_piece(
      itemName: String!
      description: String
      color: Colors!
      category: Categories!
      brand: String
      price: Float
      imageUrl: String!
      userId: String!
    ): Piece
    update_piece(
      id: String!
      itemName: String!
      description: String
      color: Colors!
      category: Categories!
      brand: String
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
    delete_outfit(id: String!): Piece
    add_wish_list(itemName: String!, category: Categories!, userId: String!): WishList
    delete_wish_list(id: String!): WishList
    update_wish_list_name(id: String!, itemName: String!): WishList
    update_wish_list_status(id: String!, checked: Boolean!): WishList
    delete_s3_image(fileKey: String!): S3Response!
    upload_s3_image(fileName: String!): UploadS3Response!
    update_user_info(
      userId: String!
      userName: String!
      email: String!
      password: String
      limitEntries: [LimitEntryInput]!
    ): UserSettingsUpdateResponse
  }

  type AuthPayload {
    user: User
  }
`;
