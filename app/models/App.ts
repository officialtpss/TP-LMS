import { Document, model, Schema } from 'mongoose';

interface IApp extends Document {
    name: string;
    description: string;
}

const appSchema = new Schema({
    name: {type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    created: { type: Date, default: Date.now }
});

const App = model<IApp>('App', appSchema, 'apps');

export { App, IApp };
