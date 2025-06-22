// create me a new email service using nodemailer
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// function to send email to the user
const sendEmailUser = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // rethrow the error for further handling if needed
    }
}

// function to send email to  the admin that a user has registered
const sendAdminEmail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Admin Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending admin email:', error);
        throw error; // rethrow the error for further handling if needed
    }
}

module.exports = {
    sendEmailUser,
    sendAdminEmail
};