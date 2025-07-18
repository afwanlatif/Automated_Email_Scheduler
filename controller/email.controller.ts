import { subjects, emailTemplates } from "../constants/text.constant";
import { FileModel } from "../model/file.model";
import { UserModel } from "../model/user.model";
import sendEmail from "../service/email.service";
import { Request, Response } from 'express';
import fs from 'fs';
import { User, FileDoc, Attachment, SendEmailAPIRequest } from '../types';
import { EmailHistoryModel } from "../model/email.history.model";

// Shot According to the cron-job (scheduler) ok 
export const sendDailyEmails = async () => {
    try {
        const users: User[] = await UserModel.find();
        const files: FileDoc[] = await FileModel.find();

        // Takes the files list and only keeps files that actually exist on the computer
        const attachments: Attachment[] = files.filter((file: FileDoc) => fs.existsSync(file.path)).map((file: FileDoc) => ({
            filename: file.filename,
            path: file.path,
            contentType: file.mimetype
        }));

        console.log(`Sending emails with ${attachments.length} attachments`);

        for (const user of users) {
            const subject: string = subjects[0].subjects;
            let text: string = emailTemplates[0].text;
            text = text.replace(/{firstName}/g, user.firstName);

            const result = await sendEmail(
                user.email,
                subject,
                text,
                attachments,
                user.firstName
            );

            if (!result.success) {
                console.error(result.message);
            }
        };
        console.log("Daily emails sent successfully.");
    } catch (error) {
        console.error("Error in sendDailyEmails:", error);
    };
};

// Shots Manually through Postman avoid (cron-job)
export const sendEmailAPI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, email, subject, text }: SendEmailAPIRequest = req.body;
        if (!email || !subject || !text) {
            res.status(400).json({ message: "Email, subject, and text are required fields" });
            return
        }
        // Format email text with personalized greeting
        const formattedText: string = firstName ? `Dear ${firstName},\n\n${text}` : text;

        // Get attachments from database (optional)
        const files: FileDoc[] = await FileModel.find();
        const attachments: Attachment[] = files.filter((file: FileDoc) => fs.existsSync(file.path)).map((file: FileDoc) => ({
            filename: file.filename,
            path: file.path,
            contentType: file.mimetype
        }));

        const result = await sendEmail(email, subject, formattedText, attachments, firstName);

        if (!result.success) {
            res.status(400).json({ message: result.message });
            return
        }

        res.status(200).json({
            message: "Email sent successfully",
            data: {
                firstName: firstName || null,
                email,
                subject,
                text,
            }
        });
    } catch (error) {
        console.error("Error in sendEmailAPI:", error);
        res.status(500).json({ message: "Failed to send email", error });
    }
};

export const listsOfSentEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const emailHistory = await EmailHistoryModel.find();
        res.status(200).json({
            message: 'Sent emails fetched successfully',
            data: emailHistory
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: "Failed to fetch sent emails",
            error: (error as Error).message
        });
    }
}
