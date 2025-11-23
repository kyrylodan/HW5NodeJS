import { model, Schema } from "mongoose";
import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        phone: { type: String },
        role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER },
        isVerified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const User = model<IUser>("User", userSchema);
