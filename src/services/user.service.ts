import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { ApiError } from "../errors/api.error";

class UserService {
    public async getList(): Promise<IUser[]> {
        return userRepository.getList();
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError("Name must be at least 3 characters", 400);
        }
        if (!dto.email || !dto.email.includes("@")) {
            throw new ApiError("Invalid email", 400);
        }
        if (!dto.password || dto.password.length < 6) {
            throw new ApiError("Password must be 6+ characters", 400);
        }
        if (!dto.age) {
            throw new ApiError("Age is required", 400);
        }

        return userRepository.create(dto);
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) throw new ApiError("User not found", 404);

        return user;
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        const user = await userRepository.updateById(userId, dto);
        if (!user) throw new ApiError("User not found", 404);

        return user;
    }

    public async deleteById(userId: string): Promise<void> {
        await userRepository.deleteById(userId);
    }
}

export const userService = new UserService();
