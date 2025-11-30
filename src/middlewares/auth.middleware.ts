    import { NextFunction, Request, Response } from "express";
    import { tokenRepository } from "../repositories/token.repository";
    import { tokenService } from "../services/token.service";
    import {TokenTypeEnum} from "../enums/token-type,enum";
    import {ApiError} from "../errors/api.error";


    class AuthMiddleware {
        public async checkAccessToken(
            req: Request,
            res: Response,
            next: NextFunction,
        ) {
            try {
                const header = req.headers.authorization;
                if (!header) {
                    throw new ApiError("Token is not provided", 401);
                }
                const accessToken = header.split("Bearer ")[1];
                const payload = tokenService.verifyToken(
                    accessToken || "",
                    TokenTypeEnum.ACCESS,
                );

                const pair = await tokenRepository.findByParams({ accessToken } as any);
                if (!pair) {
                    throw new ApiError("Token is not valid", 401);
                }
                res.locals.jwtPayload = payload;
                next();
            } catch (e) {
                next(e);
            }
        }
    }

    export const authMiddleware = new AuthMiddleware();