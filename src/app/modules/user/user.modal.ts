import { Roles } from "../../utilis/helpers";
import { TUser } from "./user.interfaces";
import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: true
        },
        profileImage: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            trim: true,
            enum: Roles,
            required: true
        },
        status: {
            type: Boolean,
            trim: true,
            required: true,
            default: true,
        }
    }, { timestamps: true });


// Hash password before saving the user
UserSchema.pre("save", async function (next) {
    const user = this;
  
    if (user.isModified("password")) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
      } catch (err:any) {
        next(err); // Handle error gracefully
      }
    } else {
      next(); // Skip hashing if password is not modified
    }
  });
// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};
export const UserModel = model<TUser>('GraphUser', UserSchema);
