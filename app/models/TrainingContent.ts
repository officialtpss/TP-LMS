import { Document, model, Schema } from 'mongoose';

interface ITrainingContent extends Document {
    name: string;
    description: string;
    resourceURL: string;
}

const trainingContentSchema = new Schema({
    title: {type: String, required: true, trim: true },
    resourceURL: {type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    courseId: {type:Schema.Types.ObjectId ,ref: "courses"},
    created: { type: Date, default: Date.now },
});

const TrainingContent = model<ITrainingContent>('TrainingContent', trainingContentSchema, 'trainingContents');

export { TrainingContent, ITrainingContent };
