import nodemailer, { Transporter } from 'nodemailer';
import envConfig from './env.config';

const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: envConfig.user_email,
        pass: envConfig.email_pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;

export const sendOtpEmail = async (to: string, otp: string) => {
    await transporter.sendMail({
        from: envConfig.user_email,
        to,
        subject: 'Your Login OTP',
        text: `Your OTP code is ${otp}.`,
    });
};
