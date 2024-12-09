export type TRole = 'admin' | 'consumer' | 'retailer'

export type TUser = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    profileImage?: string;
    role: TRole,
    status: boolean,
}
