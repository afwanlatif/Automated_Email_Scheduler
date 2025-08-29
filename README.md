#  Automated Email Scheduler & Management System

A comprehensive Node.js application built with TypeScript that provides automated email scheduling, user management, file attachments, and authentication features. The system supports both scheduled email delivery via cron jobs and manual email sending through REST APIs.

## 🚀 Key Features

### Core Functionality
- **Automated Email Scheduling**: Daily email delivery using `node-cron` scheduler
- **Manual Email Sending**: REST API endpoints for immediate email dispatch
- **User Management**: Complete CRUD operations for user data
- **File Upload & Attachments**: Support for email attachments with file management
- **Authentication System**: OTP-based authentication using Better Auth
- **Email History Tracking**: Complete audit trail of sent emails
- **Rate Limiting**: Email frequency control (max 2 emails per user in 3 days)

### Technical Features
- **Express.js Framework**: Fast, unopinionated web framework for Node.js
- **TypeScript**: Full type safety and modern JavaScript features
- **MongoDB Integration**: Robust data persistence with Mongoose
- **Nodemailer**: Professional email sending with SMTP support
- **Multer**: Multipart/form-data handling for file uploads
- **Node-Cron**: Task scheduling and automation
- **Better Auth**: Modern authentication with OTP verification
- **CORS Support**: Cross-origin resource sharing enabled
- **Morgan Logging**: HTTP request logging middleware
- **Date-fns**: Modern date utility library
- **Modular Architecture**: Clean separation of concerns
- **Environment Configuration**: Secure configuration management
- **Error Handling**: Comprehensive error management
- **File Management**: Secure file upload and storage

## 🏗️ Application Architecture

cron-job/
├── authentication/     # Authentication logic and configuration
├── config/            # Database, email, and environment configuration
├── constants/         # Email templates and text constants
├── controller/        # Request handlers and business logic
├── model/            # MongoDB schemas and models
├── router/           # API route definitions
├── schedular/        # Cron job scheduling logic
├── service/          # Core business services
├── types/            # TypeScript type definitions
└── uploads/          # File storage directory
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Gmail account with App Password (for email sending)
- TypeScript knowledge (recommended)

## 🔧 Installation

1. **Clone the repository**

git clone https://github.com/afwanlatif/Automated_Email_Scheduler.git
cd Automated_Email_Scheduler

2. **Install dependencies**

npm install


3. **Environment setup**
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/email_scheduler
USER_EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_SHOOT=2
```

4. **Gmail App Password Setup**
   - Enable 2-Factor Authentication on your Gmail account
   - Generate an App Password: Google Account → Security → App Passwords
   - Use the generated password in `EMAIL_PASS`

## 🚀 Running the Application

### Development Mode

npm run dev


The server will start on `http://localhost:3000`

## 📊 Application Flow

### 1. System Initialization
```
App Startup → Database Connection → Route Setup → Cron Job Activation → Server Listen
```

### 2. Scheduled Email Flow
```
Cron Trigger (Daily 13:31) → Fetch Users → Fetch Files → Generate Attachments → Send Emails → Log History
```

### 3. Manual Email Flow
```
API Request → Validate Input → Check Rate Limit → Prepare Email → Send Email → Save History → Return Response
```

### 4. User Management Flow
```
CRUD Operations → Database Interaction → Response Generation
```

### 5. Authentication Flow
```
OTP Request → Email Verification → OTP Validation → Session Creation
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/signup` | Request OTP for registration | `{"email": "user@example.com"}` |
| POST | `/signin` | Verify OTP and login | `{"email": "user@example.com", "otp": "123456"}` |

### User Management Routes (`/email`)
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/add` | Add new user | `{"email": "user@example.com", "firstName": "John"}` |
| GET | `/lists` | Get all users | - |
| GET | `/get/:id` | Get user by ID | - |
| PUT | `/update/:id` | Update user | `{"email": "new@example.com", "firstName": "Jane"}` |
| DELETE | `/delete/:id` | Delete user | - |

### Email Operations (`/api/email`)
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/send` | Send manual email | `{"email": "user@example.com", "subject": "Test", "text": "Hello", "firstName": "John"}` |
| GET | `/lists` | Get email history | - |

### File Management (`/upload`)
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/upload` | Upload files | Form-data with files |
| GET | `/list` | List uploaded files | - |
| DELETE | `/clear` | Delete all files | - |
| POST | `/test-email` | Test email with attachments | `{"email": "test@example.com"}` |

## ⏰ Scheduler Configuration

The application runs a daily cron job at **13:31** (1:31 PM) that:
1. Fetches all users from the database
2. Retrieves available file attachments
3. Sends personalized emails to each user
4. Logs the email history

**Cron Pattern**: `31 13 * * *` (minute hour day month weekday)

To modify the schedule, edit `/schedular/daily.times.ts`:
```typescript
const scheduledHour: number = 13;    // 24-hour format
const scheduledMinute: number = 31;  // Minutes
```

## 🛡️ Security Features

### Rate Limiting
- Maximum 2 emails per user within 3 days
- Automatic enforcement before sending
- Configurable via `EMAIL_SHOOT` environment variable

### Authentication
- OTP-based verification system
- Email verification required
- Session management with Better Auth

### File Security
- Secure file upload with validation
- Automatic directory creation
- File existence verification before attachment

## 📧 Email Templates

Emails are personalized using templates defined in `/constants/text.constant.ts`:
- Dynamic first name insertion: `{firstName}`
- Customizable subjects and content
- Support for HTML and plain text

## 🔍 Monitoring & Logging

### Console Logging
- Server startup confirmation
- Database connection status
- Email sending results
- Cron job execution logs
- Error tracking and debugging

### Email History
- Complete audit trail of sent emails
- Recipient tracking
- Content logging
- Timestamp recording
- Send count tracking

## 🛠️ Development

### Project Structure
- **Controllers**: Handle HTTP requests and responses
- **Services**: Core business logic and external integrations
- **Models**: Database schema definitions
- **Routes**: API endpoint definitions
- **Config**: DataBase,Environment and service configurations
- **Types**: TypeScript type definitions

### Code Quality
- Full TypeScript implementation
- Modular architecture
- Error handling throughout
- Consistent naming conventions
- Clean separation of concerns

## 🚨 Troubleshooting

### Common Issues

1. **Email not sending**
   - Verify Gmail App Password
   - Check internet connection
   - Confirm environment variables

2. **Database connection failed**
   - Ensure MongoDB is running
   - Verify connection string
   - Check network connectivity

3. **File upload issues**
   - Check uploads directory permissions
   - Verify disk space
   - Confirm file size limits

4. **Cron job not running**
   - Check server timezone
   - Verify cron syntax
   - Monitor console logs

## 📈 Performance Considerations

- **Batch Processing**: Emails are sent sequentially to avoid rate limits
- **File Validation**: Only existing files are attached to emails
- **Database Indexing**: Optimize queries for better performance
- **Memory Management**: Efficient file handling and cleanup

## 👨‍💻 Author

Developed with ❤️ by Afwan Latif Backend Developer (Node.js)

**Note**: This application is designed for educational and development purposes. Ensure compliance with email marketing regulations and privacy laws when using in production.
