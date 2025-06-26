import dotenv from 'dotenv';
dotenv.config();

const { PORT, MONGO_URL, USER_EMAIL, EMAIL_PASS, EMAIL_SHOOT }: NodeJS.ProcessEnv = process.env;

const port: number = Number(PORT);
const mongo_url: string = String(MONGO_URL);
const user_email: string = String(USER_EMAIL);
const email_pass: string = String(EMAIL_PASS);
const email_shoot: number = Number(EMAIL_SHOOT)

export default {
    port,
    mongo_url,
    user_email,
    email_pass,
    email_shoot
}