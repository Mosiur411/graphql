import { z } from 'zod';
import { Roles } from '../../utilis/helpers';

// Define the TRole schema
const role = z.enum(Roles) ;

// Define the TUser schema
const TUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must not exceed 15 digits'),
    profileImage: z.string().url('Profile image must be a valid URL').optional(),
    role: role
});

export const Uservalidation ={
    TUserSchema
}