import mongoose from 'mongoose';

const emailCounterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    totalCount: { type: Number, required: true, default: 0 },
    lastReset: { type: Date, default: Date.now }
});

export const EmailCounterModel = mongoose.model('emailcounter', emailCounterSchema);