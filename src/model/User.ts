import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role?: string;
}

const UserModel = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true },
);

mongoose.set('strictQuery', false);

export default mongoose.model<IUser>('User', UserModel);
