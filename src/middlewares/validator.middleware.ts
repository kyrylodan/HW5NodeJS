import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error";
import Joi from "joi";

class ValidatorMiddleware {
    public validateBody(schema: Joi.ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.body);

            if (error) {
                return next(new ApiError(error.message, 400));
            }

            next();
        };
    }

    public validateParams(schema: Joi.ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.params);

            if (error) {
                return next(new ApiError(error.message, 400));
            }

            next();
        };
    }



}

export const validatorMiddleware = new ValidatorMiddleware();
