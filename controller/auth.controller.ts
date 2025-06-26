import { Request, Response } from 'express';
import { auth } from '../authentication/auth';
import { SignInRequest, SignUpRequest } from '../types';

// For Account Creation (For First Time User)
export const signUp = async (req: Request, res: Response) => {
    try {
        const { email }: SignUpRequest = req.body;
        const result = await auth.api.sendVerificationOTP({
            body: {
                email,
                type: "sign-in"
            },
        });
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Verify credentials and send OTP (not complete login yet)
export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, otp }: SignInRequest = req.body;
        // First verify credentials without logging in
        const user = await auth.api.signInEmailOTP({
            body: { email, otp },
        });
        res.json({ message: 'User Logedin Sucess', user });
    } catch (error: any) {
        res.status(400).json({ error: 'Invalid credentials' });
    }
};

