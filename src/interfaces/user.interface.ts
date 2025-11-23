export interface IUser {
    _id?: string;

    name: string;
    age: number;
    email: string;
    password: string;
    phone?: string;
    role: string;

    isVerified: boolean;
    isDeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}
