import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";

class UserController {
    public async getList(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const users = await userService.getList();
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    public async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const dto = req.body as Partial<IUser>;
            const result = await userService.create(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request<{ userId: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.params.userId;
            const result = await userService.getById(userId);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(
        req: Request<{ userId: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.params.userId;
            const dto = req.body as Partial<IUser>;
            const result = await userService.updateById(userId, dto);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(
        req: Request<{ userId: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.params.userId;
            await userService.deleteById(userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
