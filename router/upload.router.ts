import express, { Router } from 'express'
const app: Router = express.Router();
import {
    uploadFiles,
    getFiles,
    deleteFiles,
    testEmailWithAttachments
} from '../controller/upload.controller'
import multer, { Multer } from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Create uploads directory if it doesn't exist
const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const uploadDir: string = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const baseName = path.parse(file.originalname).name;
        cb(null, baseName + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer upload middleware
const upload: Multer = multer({ storage: storage });

// Define API routes for file operations
app.post('/upload', upload.any(), uploadFiles);
app.get('/list', getFiles);
app.delete('/clear', deleteFiles);
app.post('/test-email', testEmailWithAttachments);

export default app;