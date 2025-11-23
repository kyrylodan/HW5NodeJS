import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.models";

class UserRepository {
    public async getList(): Promise<IUser[]> {
        return User.find({});
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return User.create(dto);
    }

    public async getById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, dto, { new: true });
    }

    public async deleteById(userId: string): Promise<void> {
        await User.deleteOne({ _id: userId });
    }
}

export const userRepository = new UserRepository();
