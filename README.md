WhisperVault — Anonymous Secret Sharing

WhisperVault is a small Express + MongoDB app that lets users register, log in (Local + Google OAuth), submit anonymous secrets, and recover accounts using OTP-based email verification. Passwords are securely stored using bcrypt hashing, and all views use a simple EJS UI.

Features

Local + Google OAuth authentication via Passport

Session management + rate-limited login protection

OTP email verification & password reset

Anonymous secret submission

Passwords hashed with bcrypt

Clean, reusable EJS views and basic theming

Main Files

server.js – app entry

passport.js, authRoutes.js – login & registration

passwordResetController.js, resetPasswordRoutes.js – OTP + reset flow

mailController.js / mailer.js – email + OTP sending

userController.js, usersRoutes.js – user pages + secrets

user.js – Mongoose user model

styles.css – UI theme

Setup
```bash  
npm install
node server.js
# or with nodemon
npm run dev
```
Environment

Copy this to a .env file and fill in your credentials:
```bash
GOOGLE_CLIENT_ID="" 
GOOGLE_CLIENT_SECRET="" 
SESSION_SECRET="" 
EMAIL_USER="" 
EMAIL_PASS=""
```
