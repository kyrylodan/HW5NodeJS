import fs from "node:fs/promises";
import path from "node:path";
import { IUser } from "../interfaces/user.interface";

const read = async (): Promise<IUser[]> => {
    try {
        const pathToFile = path.join(process.cwd(), "db.json");
        const data = await fs.readFile(pathToFile, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("Ошибка чтения:", e.message);
        } else {
            console.log("Ошибка чтения:", e);
        }
        return [];
    }
};

const write = async (users: IUser[]): Promise<void> => {
    try {
        const pathToFile = path.join(process.cwd(), "db.json");
        await fs.writeFile(pathToFile, JSON.stringify(users, null, 2));
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("Ошибка записи:", e.message);
        } else {
            console.log("Ошибка записи:", e);
        }
    }
};

export { read, write };
