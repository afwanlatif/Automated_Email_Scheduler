import mongoose from 'mongoose';

const emailHistorySchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
});

export const EmailHistoryModel = mongoose.model('emailhistory', emailHistorySchema);
