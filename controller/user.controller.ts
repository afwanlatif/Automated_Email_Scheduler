import { UserModel } from "../model/user.model";
import { Request, Response } from 'express';
import { UserData } from '../types';

// Add a new email recipient
export const addEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: UserData = req.body;
        if (!userData) {
            res.status(400).json({ message: 'missing fields is required' });
            return;
        };
        const userExists: UserData | null = await UserModel.findOne({ email: userData.email });
        if (userExists) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        };
        const newUser = new UserModel(userData);
        await newUser.save();
        res.status(200).json({ message: 'Email added successfully', userData });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    };
};

// Update an existing email recipient
export const updateEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const emailId: string = req.params.id;
        const userData: Partial<UserData> = req.body;
        if (!emailId) {
            res.status(400).json({ message: 'EmailId is required' });
            return;
        };
        if (!userData) {
            res.status(400).json({ message: 'Required fields are missing' });
            return;
        };
        const updatedUser: UserData | null = await UserModel.findByIdAndUpdate(emailId, userData, { new: true });
        if (!updatedUser) {
            res.status(400).json({ message: 'User not found' });
            return;
        };
        res.status(200).json({ message: 'Users Email updated successfully', updatedUser });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    };
};

// Get all email recipients
export const emailLists = async (req: Request, res: Response): Promise<void> => {
    try {
        const emails = await UserModel.find();
        res.status(200).json({ message: 'All Emails fetched Successfully', emails });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    };
}

// Get a single email recipient by ID
export const getEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const emailId: string = req.params.id;
        if (!emailId) {
            res.status(400).json({ message: 'emailId is required' });
            return;
        };
        const email: UserData | null = await UserModel.findById(emailId);
        res.status(200).json({ message: 'Email fetched successfully', email });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    };
};

// Delete an email recipient
export const deleteEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const emailId: string = req.params.id;
        if (!emailId) {
            res.status(400).json({ message: 'EmailId is required' });
            return;
        };
        const userData: UserData | null = await UserModel.findByIdAndDelete(emailId);
        if (!userData) {
            res.status(400).json({ message: 'User not  found' });
            return;
        };
        res.status(200).json({ message: 'Email deleted successfully', userData });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error' });
    };
};