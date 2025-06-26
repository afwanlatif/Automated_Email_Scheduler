import express, { Router } from 'express';
import { addEmail, updateEmail, emailLists, getEmail, deleteEmail } from '../controller/user.controller';

const app: Router = express.Router();

app.post('/add', addEmail);
app.get('/lists', emailLists);
app.get('/get/:id', getEmail);
app.put('/update/:id',updateEmail);
app.delete('/delete/:id',deleteEmail)

export default app;
