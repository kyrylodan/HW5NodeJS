import Joi from "joi";


export const createUserValidator = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().optional(),
    role: Joi.string().valid("user", "admin").optional(),
});

export const updateUserValidator = Joi.object({
    name: Joi.string().min(3).optional(),
    age: Joi.number().min(1).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    phone: Joi.string().optional(),
    role: Joi.string().valid("user", "admin").optional(),
}).min(1);
