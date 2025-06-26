import { FileModel } from '../model/file.model';
import { testEmailSending } from '../schedular/daily.times';
import { Request, Response } from 'express';

// Handle file uploads and save to database
export const uploadFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = (req.files as Express.Multer.File[]) || [];

        if (!files.length) {
            res.status(400).json({ success: false, message: 'No files uploaded' });
            return;
        }

        const savedFiles = [];

        for (const file of files) {
            const uploadedFile = new FileModel({
                filename: file.originalname,
                path: file.path,
                mimetype: file.mimetype,
            });
            const savedFile = await uploadedFile.save();
            savedFiles.push(savedFile);
        }

        res.status(200).json({ message: 'Files uploaded successfully', savedFiles });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error uploading files', error: error.message });
    }
};


// Get all uploaded files
export const getFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = await FileModel.find();
        res.status(200).json({
            success: true,
            files: files
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error getting files', error: error.message });
    }
};

// Delete all uploaded files
export const deleteFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        await FileModel.deleteMany({});
        res.status(200).json({ success: true, message: 'All uploaded files cleared' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error clearing files', error: error.message });
    }
};

// Test sending emails with attachments
export const testEmailWithAttachments = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = await FileModel.find();
        if (files.length === 0) {
            res.status(400).json({
                success: false,
                message: 'No files uploaded. Please upload files first.'
            });
            return;
        }

        testEmailSending();

        res.status(200).json({
            success: true,
            message: 'Test emails sent with attachments',
            attachments: files.map(file => ({
                filename: file.filename,
                path: file.path
            }))
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error sending test emails',
            error: error.message
        });
    }
};
