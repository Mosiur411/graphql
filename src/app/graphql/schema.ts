import { userSchema } from "../modules/user/user.schema";

const rootSchema = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Combine Schemas
export const typeDefs = [rootSchema, userSchema];
