import Joi from "joi";

export const idValidator = Joi.object({
    userId: Joi.string().hex().length(24).required(),
});
