import { subDays } from "date-fns";
import envConfig from "../config/env.config";
import { EmailCounterModel } from "../model/email.counter.model";
import { EmailCounter } from "../types";

export const checkEmailLimit = async (email: string): Promise<boolean> => {
    const threeDaysAgo: Date = subDays(new Date(), 3);
    
    // Get counter for this email
    const counter: EmailCounter | null = await EmailCounterModel.findOne({ email });
    
    // If counter exists but is older than 3 days, reset it
    if (counter && counter.lastReset < threeDaysAgo) {
        counter.totalCount = 0;
        counter.lastReset = new Date();
        await counter.save();
        return false;
    }
    
    // If counter doesn't exist, it means no emails sent yet
    if (!counter) {
        return false;
    }
    
    // Check if limit is reached
    const emailLimit: number = envConfig.email_shoot;
    return counter.totalCount >= emailLimit;
};

export const incrementEmailCount = async (email: string): Promise<void> => {
    // Find counter for this email
    const counter: EmailCounter | null = await EmailCounterModel.findOne({ email });
    
    if (counter) {
        // Increment existing counter
        counter.totalCount += 1;
        await counter.save();
    } else {
        // Create new counter with count 1
        const newCounter: Partial<EmailCounter> = {
            email,
            totalCount: 1,
            lastReset: new Date()
        };
        await EmailCounterModel.create(newCounter);
    }
};