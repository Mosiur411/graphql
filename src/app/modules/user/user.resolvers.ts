import { TUser } from "./user.interfaces";
import { UserModel } from "./user.modal";

export const userResolvers = {
    Query: {
        users: async (
            _: any,
            args: { page?: number; limit?: number },
            context: { info: string }
          ) => {
            console.log("Context Info:", context.info); 
      
            const page = args.page || 1;
            const limit = args.limit || 10;
            const skip = (page - 1) * limit;
      
            const users = await UserModel.find()
              .sort({ createdAt: -1 }) // Sort by most recent
              .skip(skip)
              .limit(limit);
      
            const total = await UserModel.countDocuments();
            const totalPages = Math.ceil(total / limit);
            return {
              users,
              total,
              totalPages,
              currentPage: page,
            };
          },
        user: async (_: any, { id }: { id: string }) => await UserModel.findById(id),
    },
    Mutation: {
        createUser: async (_: any, { userInput }: { userInput: Partial<TUser> }) => {
            try {
                const newUser = new UserModel(userInput);
                console.log(newUser)
                const result = await newUser.save();
                return result;
            } catch (error: unknown) {
                // Handle errors and return a meaningful message
                throw new Error(`Error creating user: ${error}`);
            }
        },
        updateUser: async (_: any, { id, userInput }: any) => {
            return await UserModel.findByIdAndUpdate(id, userInput, { new: true });
        },
    },
};