import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import envConfig from "../config/env.config";
import { emailOTP } from "better-auth/plugins";
import { sendOtpEmail } from "../config/mailer.config";

const client = new MongoClient(envConfig.mongo_url);

    const db = client.db();

    export const auth = betterAuth({
        database: mongodbAdapter(db),
        emailAndPassword: {
            enabled: true,
        },
        plugins: [
            emailOTP({
                sendVerificationOTP: async ({ email, otp, type }) => {
                    console.log(`Sending OTP ${otp} to ${email} for ${type}`);
                    await sendOtpEmail(email, otp);
                },
            }),
        ],
    });