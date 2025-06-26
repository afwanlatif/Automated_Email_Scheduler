import { Application } from 'express';
import UserRouter from './user.router';
import UploadRouter from './upload.router';
import EmailRouter from './email.router';
import AuthRouter from './auth.router';

export const setupRoutes = (app: Application) => {
    app.use('/email', UserRouter);
    app.use('/upload', UploadRouter);
    app.use('/api/email', EmailRouter);
    app.use('/api/auth', AuthRouter);
}