# Shahoot!

Shahoot! is a quiz application inspired by Kahoot. It allows users to create, host, and participate in quizzes in a fun and interactive way.

## Live Demo

You can try the live version of Shahoot! here: <https://shahoot.onrender.com>\
(The loading or login can take up to a minute because of Render's cold boot)

## Features

- Create Quizzes: Users can create custom quizzes with multiple-choice questions.
- Host Quizzes: Start live sessions where players can join and answer questions in real time.
- Join Quizzes: Players can join hosted sessions using a unique code.
- Authentication: JWT-based authentication.
- Email Verification: New users must verify their email address to activate their accounts.

## Environment Variables

Create a .env file in the server directory with the following variables:

| Variable | Description |
| --- | --- |
| CLIENT_URL | The URL of the client application |
| JWT_SECRET | Secret key for signing JWT tokens |
| MAIL_SECRET | Secret key for signing email verification tokens |
| SENDGRID_API_KEY | API key for SendGrid to send verification emails |
| EMAIL_ADDRESS | Sender email address for verification emails |

You can also change the VITE_SERVER_URL environment variable in the .env file in the client directory.

## Technologies Used

- **React**: Frontend
- **Express**: Backend
- **Socket.IO**: Sockets for the live quiz sessions
- **MongoDB**: Database
- **PassportJS**: Authentication
- **SendGrid**: Sending verification emails
