import mongoose from 'mongoose';

const dbConnection = async (url: string): Promise<void> => {
    try {
        await mongoose.connect(url, {
            readPreference: 'primary',
            retryWrites: true,
            retryReads: true,
        });
        console.log('Connected to the Database!');
    } catch (err) {
        console.error('Error connecting to the Database', err);
    }
};

export default dbConnection;
