import { Document, model, Schema } from 'mongoose';

interface ICourseSubscription extends Document {
    userId: string;
    courseId: string;
    fromDate: string;
    toId: string;
}

const courseSubscriptionSchema = new Schema({
    userId: {type:Schema.Types.ObjectId ,ref: "users" },
    courseId: {type:Schema.Types.ObjectId ,ref: "courses"},
    fromDate:{type: Date, default: Date.now},
    toDate:{type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
});  

const CourseSubscription = model<ICourseSubscription>('CourseSubscription', courseSubscriptionSchema, 'courseSubscriptions');

export { CourseSubscription, ICourseSubscription };
