import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import envConfig from './config/env.config';
import { connectDB } from './config/db.config';
import { setupRoutes } from './router/base.router';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Routes
setupRoutes(app);

// DataBase Connection
connectDB();

app.listen(envConfig.port, () => {
    console.log(`Server is running on port ${envConfig.port}`);
});


