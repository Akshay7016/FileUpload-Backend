const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMailToUser = async (email, name, fileUrl) => {
    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // send mail
    await transporter.sendMail({
        from: "Test Nodemailer",
        to: email,
        subject: "New file uploaded successfully",
        html: `<h2>Dear ${name},</h2> <p>File uploaded, view here: <a href="${fileUrl}">${fileUrl}</a></p>`
    });
};

module.exports = sendMailToUser;