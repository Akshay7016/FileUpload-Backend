const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }

});

// Post middleware
fileSchema.post("save", async (doc) => {
    try {
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
            to: doc.email,
            subject: "New file uploaded successfully",
            html: `<h2>Dear ${doc.name},</h2> <p>File uploaded, view here: <a href="${doc.fileUrl}">${doc.fileUrl}</a></p>`
        })
    } catch (error) {
        console.log("Something went wrong while sending mail: ", error.message);
    }
})

module.exports = mongoose.model("File", fileSchema);