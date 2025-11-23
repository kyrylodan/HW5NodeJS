import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { configs } from "./config/configs";
import { userRouter } from "./routes/router";
import { ApiError } from "./errors/api.error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
});

app.use("/users", userRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
});

process.on("uncaughtException", (err) => {
    console.error("uncaughtException", err);
    process.exit(1);
});

const start = async () => {
    await mongoose.connect(configs.MONGO_URI);
    console.log("Mongo connected");

    app.listen(configs.APP_PORT, () => {
        console.log(`Server running at http://${configs.APP_HOST}:${configs.APP_PORT}`);
    });
};

start();
