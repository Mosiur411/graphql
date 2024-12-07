import { userResolvers } from "../modules/user/user.resolvers";

export const resolvers = {
    Query: {
      ...userResolvers.Query,
    },
    Mutation: {
      ...userResolvers.Mutation,
    },
  };