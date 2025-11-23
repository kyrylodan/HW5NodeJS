import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middlewares";
import { validatorMiddleware } from "../middlewares/validator.middleware";

import {
    createUserValidator,
    updateUserValidator
} from "../validators/user.validator";

import { idValidator } from "../validators/common.validator";

const router = Router();

router.get("/", userController.getList);

router.post(
    "/",
    validatorMiddleware.validateBody(createUserValidator),
    userController.create
);

router.get(
    "/:userId",
    validatorMiddleware.validateParams(idValidator),
    userController.getById
);

router.put(
    "/:userId",
    validatorMiddleware.validateParams(idValidator),
    validatorMiddleware.validateBody(updateUserValidator),
    userController.updateById
);

router.delete(
    "/:userId",
    validatorMiddleware.validateParams(idValidator),
    userController.deleteById
);

export const userRouter = router;
