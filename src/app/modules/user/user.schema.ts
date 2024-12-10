export const userSchema = `
  type User {
    id: ID!
    name: String!
    email: String!
    role:String!
    password:String,
    phoneNumber:String,
    createdAt: String!
    updatedAt: String!
  }

  type UsersResult {
    users: [User!]!
    total: Int!
    totalPages: Int!
    currentPage: Int!
  }
  type LoginResponse {
    token: String!
    user: User!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    role:String!
    phoneNumber:String,
  }

  extend type Query {
    users(page: Int, limit: Int): UsersResult!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): LoginResponse!
    updateUser(id: ID!, userInput: UserInput): User
  }
`;
