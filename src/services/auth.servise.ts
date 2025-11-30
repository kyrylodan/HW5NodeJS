import { ITokenPair } from "../interfaces/token.interface";
import { ISignIn, IUser } from "../interfaces/user.interface";
import { passwordService } from "./password.service";
import { userRepository } from "../repositories/user.repository";
import { tokenService } from "./token.service";
import { tokenRepository } from "../repositories/token.repository";
import { ApiError } from "../errors/api.error";

class AuthService {
    public async signUp(
        dto: Partial<IUser>,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        if (!dto.email) throw new ApiError("Email is required", 400);
        if (!dto.password) throw new ApiError("Password is required", 400);

        await this.isEmailExistOrThrow(dto.email);

        const password = await passwordService.hashPassword(dto.password);
        const user = await userRepository.create({ ...dto, password } as IUser);

        const tokens = tokenService.generateTokens({
            userId: user._id.toString(), // виправлено
            role: user.role,
        });

        // Збереження токенів у БД з рядком _userId
        await tokenRepository.create({ ...tokens, _userId: user._id.toString() });

        return { user, tokens };
    }

    public async signIn(dto: ISignIn): Promise<{ user: IUser; tokens: ITokenPair }> {
        if (!dto.email) throw new ApiError("Email is required", 400);
        if (!dto.password) throw new ApiError("Password is required", 400);

        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const isPasswordCorrect = await passwordService.comparePasswords(dto.password, user.password);
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid credentials", 401);
        }

        const tokens = tokenService.generateTokens({
            userId: user._id.toString(), // виправлено
            role: user.role,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id.toString() });

        return { user, tokens };
    }

    private async isEmailExistOrThrow(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError("Email already exist", 409);
        }
    }
}

export const authService = new AuthService();

