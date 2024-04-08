import { Schema, model, Document } from 'mongoose';

interface ISubscribe extends Document {
    fullname: string;
    email: string;
}

const Subscribe = new Schema<ISubscribe>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const SubscribeModel = model<ISubscribe>('Subscribers', Subscribe);
export default SubscribeModel;
