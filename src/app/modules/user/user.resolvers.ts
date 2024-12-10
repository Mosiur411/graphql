import config from "../../config";
import { TUser } from "./user.interfaces";
import { UserModel } from "./user.modal";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const JWT_SECRET = config.jwt_secret as string

export const userResolvers = {
    Query: {
        users: async (
            _: any,
            args: { page?: number; limit?: number },
            context: { info: string }
          ) => {
            console.log("Context Info:", args); 
      
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
        login: async (_: any, { email, password }: { email: string; password: string }) => {
          try {
            // Check if the user exists
           
            const user = await UserModel.findOne({ email });
            if (!user) {
              throw new Error("User not found");
            }
            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
              throw new Error("Invalid email or password");
            }
            const token = jwt.sign(
              {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
              },
              JWT_SECRET,
              { expiresIn: "1h" } // Token valid for 1 hour
            );
            return {
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
              },
            };
          } catch (error:any) {
            throw new Error(error.message);
          }
        },
    },
};