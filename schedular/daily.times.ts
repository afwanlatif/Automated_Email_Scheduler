import cron from 'node-cron';
import {sendDailyEmails} from '../controller/email.controller'

const scheduledHour : number = 12;
const scheduledMinute : number = 57;

console.log(`Setting up cron job to run daily at ${scheduledHour}:${scheduledMinute}`);

cron.schedule(`${scheduledMinute} ${scheduledHour} * * *`, () => {
    console.log('Running scheduled daily email job...');
    sendDailyEmails();
});

export const testEmailSending = () => {
    console.log('Testing email sending now...');
    sendDailyEmails();
};

