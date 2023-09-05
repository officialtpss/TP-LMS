import { Document, model, Schema } from 'mongoose';

interface IAdmin extends Document {
    email: string;
    password: string;
}

const adminSchema = new Schema({
    password: { type: String, trim: true },
    email: {
        type: String, required: true, unique: true,
        lowercase: true, trim: true
    },
    created: { type: Date, default: Date.now }
});

const Admin = model<IAdmin>('Admin', adminSchema, 'admins');

export { Admin, IAdmin };
