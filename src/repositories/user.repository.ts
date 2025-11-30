    import { IUser } from "../interfaces/user.interface";
    import {User} from "../models/user.models";
    import {ApiError} from "../errors/api.error";


    class UserRepository {
        public async getList(): Promise<IUser[]> {
            return await User.find({});
        }

        public async create(dto: Partial<IUser>): Promise<IUser> {
            return await User.create(dto);
        }

        public async getById(userId: string): Promise<IUser | null> {
            return await User.findById(userId);
        }

        public async getByEmail(email: string): Promise<IUser | null> {
            return await User.findOne({ email }).select("+password");
        }

        public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
            const user = await userRepository.updateById(userId, dto);
            if (!user) throw new ApiError("User not found", 404);

            return user;
        }


        public async deleteById(userId: string): Promise<void> {
            await User.deleteOne({ _id: userId });
        }
    }

    export const userRepository = new UserRepository();