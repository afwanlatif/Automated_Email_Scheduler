import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true }
});

export const UserModel = mongoose.model('users', userSchema);
