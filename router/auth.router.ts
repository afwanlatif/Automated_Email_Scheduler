import express, { RequestHandler, Router } from 'express';
import { signIn, signUp } from '../controller/auth.controller';
const app: Router = express.Router();

// Auth routes
app.post('/sign-up', signUp as RequestHandler);
app.post('/sign-in', signIn as RequestHandler);


export default app;