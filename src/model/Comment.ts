import mongoose, { Schema, model, Types, Document } from 'mongoose';

interface IComment extends Document {
    comment: string;
    postedAt: Date;
    blog: Types.ObjectId;
    user: Types.ObjectId; // Use `Types.ObjectId` in document interface...
}

const CommentSchema = new Schema<IComment>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const CommentModel = model<IComment>('Comment', CommentSchema);
export default CommentModel;
