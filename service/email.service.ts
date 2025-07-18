import transporter from "../config/mailer.config";
import envConfig from "../config/env.config";
import { EmailHistoryModel } from "../model/email.history.model";
import { EmailResult } from '../types';
import { checkEmailLimit, incrementEmailCount } from "../helper/index";

const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    attachments: any[] = [],
    firstName: string | null = null
): Promise<EmailResult> => {
    try {
        // Check if an email with the same content already exists
        const existingEmail = await EmailHistoryModel.findOne({ 
            email: to,
            subject: subject,
            text: text
        });

        // Always check email limit before sending, regardless of content
        const limitExceeded: boolean = await checkEmailLimit(to);
        if (limitExceeded) {
            return { success: false, message: `Email limit exceeded for ${to} (max 2 emails in 3 days)` };
        }

        // Send the email
        const mailOptions = {
            from: envConfig.user_email,
            to: to,
            subject: subject,
            text: text,
            attachments: attachments
        };
        const info = await transporter.sendMail(mailOptions);

        // Increment the total email count for this recipient
        await incrementEmailCount(to);

        // Update or create content-specific email history record
        if (existingEmail) {
            await EmailHistoryModel.findByIdAndUpdate(existingEmail._id, {
                sentAt: new Date() // Just update the sent date
            });
        } else {
            await EmailHistoryModel.create({
                email: to,
                firstName: firstName,
                subject: subject,
                text: text
            });
        }

        return { success: true, message: `Email sent to ${to}`, info };
    } catch (error: unknown) {
        console.error(error);
        return { success: false, message: `Error sending to ${to}`, error: error as Error };
    }
};


export default sendEmail;