import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL ?? "")
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err: Error) => {
            console.log('Connection Failed', err);
        });
};