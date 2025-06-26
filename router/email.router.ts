import express, { Router } from 'express';
const app: Router = express.Router();
import multer, { Multer } from 'multer';
import { sendEmailAPI, listsOfSentEmail } from '../controller/email.controller';

const upload: Multer = multer({ dest: 'uploads/' });

app.post('/send', upload.any(), sendEmailAPI);
app.get('/lists', listsOfSentEmail);

export default app;