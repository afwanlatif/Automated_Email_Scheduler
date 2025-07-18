export interface User {
    _id: string;
    email: string;
    firstName: string;
}

export interface FileDoc {
    _id: string;
    filename: string;
    path: string;
    mimetype: string;
}

export interface Attachment {
    filename: string;
    path: string;
    contentType: string;
}

export interface Subject {
    subjects: string;
}

export interface EmailTemplate {
    text: string;
}

export interface EmailResult {
    success: boolean;
    message: string;
    info?: any;
    error?: any;
}

export interface UserData {
    email: string;
    firstName: string;
}

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface BetterAuthResponse {
    token: string | null;
    user: AuthUser;
}

export interface SignUpRequest {
    email: string;
    password: string;
    name: string;
    type: string;
}

export interface SignInRequest {
    email: string;
    password: string;
    otp: string
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export interface OTPRequest {
    email: string;
}

export interface OTPResponse {
    message: string;
    email: string;
}

export interface VerifyOTPRequest {
    email: string;
    otp: string;
}

export interface SessionResponse {
    user?: AuthUser;
    session?: {
        id: string;
        userId: string;
        expiresAt: string;
    };
}

export interface SendEmailAPIRequest  {
    firstName?: string;
    email: string;
    subject: string;
    text: string
}

import { Document } from 'mongoose';

export interface EmailCounter extends Document {
    email: string;
    totalCount: number;
    lastReset: Date;
}