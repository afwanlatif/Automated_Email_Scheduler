# Automated Email Scheduler

A Node.js application for automating scheduled emails using a customizable scheduler. This project allows users to be managed through a REST API and supports daily scheduled email delivery.

## 🚀 Features

- RESTful API for managing users
- Scheduled email sending using `node-cron`
- Modular structure with services, controllers, and routers
- Configurable database and email settings
- Environment-based configuration

- ## 🔧 Installation

git clone https://github.com/afwanlatif/Automated_Email_Scheduler.git
cd Automated_Email_Scheduler
npm install


⚙️ Configuration

Create a .env file in the root directory and define:

PORT=3000
MONGO_URL=mongodb://localhost:27017/email_scheduler
USER_EMAIL=your_email@example.com
EMAIL_PASS=your_email_password or for better type safety App password of google account if not have then create it 

📩 Running the App

npm run dev
