export const userSchema = `
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type UsersResult {
    users: [User!]!
    total: Int!
    totalPages: Int!
    currentPage: Int!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  extend type Query {
    users(page: Int, limit: Int): UsersResult!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(userInput: UserInput): User
    updateUser(id: ID!, userInput: UserInput): User
  }
`;
