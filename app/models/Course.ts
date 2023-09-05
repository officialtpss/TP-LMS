import { Document, model, Schema } from "mongoose";

interface ICourse extends Document {
  name: string;
  description: string;
}

const courseSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  appId: { type: Schema.Types.ObjectId, ref: "apps" },
  created: { type: Date, default: Date.now },
});

const Course = model<ICourse>("Course", courseSchema, "courses");

export { Course, ICourse };
