import { Schema, model, Types, Document } from 'mongoose';

interface IBlog extends Document {
    title: string;
    photo: string;
    introduction: string;
    description: string;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [200, 'The title is very long'],
        },
        photo: {
            type: String,
        },
        introduction: {
            type: String,
            required: true,
            maxlength: [200, 'The ntro is very long'],
        },
        description: {
            type: String,
            required: true,
            maxlength: [1000, 'Only 200 characters are allowed'],
        },
    },
    {
        timestamps: true,
    },
);

const BlogModel = model<IBlog>('blogs', BlogSchema);
export default BlogModel;
