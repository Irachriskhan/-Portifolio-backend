import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    sender: string;
    email: string;
    body: string;
    replyTo?: IMessage['_id'];
}

const ContactSchema = new Schema<IMessage>(
    {
        sender: {
            type: String,
            required: true,
            maxlength: [50, 'Only 50 characters are allowed'],
        },
        email: {
            type: String,
            required: true,
            maxlength: [50, 'Only 50 characters are allowed'],
        },
        body: {
            type: String,
            required: true,
            maxlength: [400, 'Only 200 characters are allowed'],
        },
        replyTo: {
            type: Schema.Types.ObjectId,
            ref: 'Messages',
        },
    },
    {
        timestamps: true,
    },
);

const MessageModel = model<IMessage>('Messages', ContactSchema);
export default MessageModel;
