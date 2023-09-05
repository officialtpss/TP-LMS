import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    firstName: {
        type: String, required: true, trim: true
    },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, trim: true },
    email: {
        type: String, required: true, unique: true,
        lowercase: true, trim: true
    },
    created: { type: Date, default: Date.now }
});

const User = model<IUser>('User', userSchema, 'users');

export { User, IUser };
