import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isIdValid(param: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const id = req.params[param];

            if (!isValidObjectId(id)) {
                return next(new ApiError("Invalid ID format", 400));
            }

            next();
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
