import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await read();
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        if (!dto.name || !dto.email || !dto.password) {
            throw new Error("Name, email and password are required");
        }

        const users = await read();

        const newUser: IUser = {
            id: users.length,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };

        users.push(newUser);
        await write(users);

        return newUser;
    }

    public async getById(userId: number): Promise<IUser | null> {
        const users = await read();
        const user = users.find((user) => user.id === userId);
        return user ?? null;
    }
}

export const userRepository = new UserRepository();
