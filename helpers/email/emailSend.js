const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');
const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USER } = require('../lib/config');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_HOST,
        pass: EMAIL_PASSWORD,
    },
});

const sendVerificationEmail = async (data) => {
    const mailOptions = {
        from: EMAIL_HOST,
        to: data.receiver,
        subject: data.subject,
        html: emailTemplate(data), // Generate HTML content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw the error after logging it
    }
};

module.exports = sendVerificationEmail;
