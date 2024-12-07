import { TUser } from "./user.interfaces";
import { model, Schema } from "mongoose";
const UserSchema = new Schema<TUser>(
    {
    name: { 
        type: String, 
        required: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
         required: true 
    },
},{timestamps:true});


export const UserModel = model<TUser>('UserGraph', UserSchema);