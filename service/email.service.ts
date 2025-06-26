import transporter from "../config/mailer.config";
import envConfig from "../config/env.config";
import { EmailHistoryModel } from "../model/email.history.model";
import { subDays } from "date-fns";
import { EmailResult } from '../types';

const checkEmailLimit = async (email: string): Promise<Boolean> => {
    const threeDaysAgo: Date = subDays(new Date(), 3);
    const emailCount: number = await EmailHistoryModel.countDocuments({
        email: email,
        sentAt: { $gte: threeDaysAgo }
    });
    return emailCount >= envConfig.email_shoot
};

const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    attachments: any[] = [],
    firstName: string | null = null
): Promise<EmailResult> => {
    try {
        // Check email limit before sending
        const limitExceeded: Boolean = await checkEmailLimit(to);
        if (limitExceeded) {
            return { success: false, message: `Email limit exceeded for ${to} (max 2 emails in 3 days)` };
        }

        // Get current count for this email
        const currentCount: number = await EmailHistoryModel.countDocuments({ email: to }) + 1;

        const mailOptions = {
            from: envConfig.user_email,
            to: to,
            subject: subject,
            text: text,
            attachments: attachments
        };

        const info = await transporter.sendMail(mailOptions);

        // Record email in history with content and count
        await EmailHistoryModel.create({
            email: to,
            firstName: firstName,
            subject: subject,
            text: text,
            count: currentCount
        });

        console.log('Email sent:', info.response);
        return { success: true, message: `Email sent to ${to}`, info };
    } catch (error: unknown) {
        console.error(error);
        return { success: false, message: `Error sending to ${to}`, error: error as Error };
    };
};


export default sendEmail;