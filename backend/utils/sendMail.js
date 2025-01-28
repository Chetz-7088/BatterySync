const nodemailer = require('nodemailer');
require('dotenv').config();

const generateEmailBody = (otp) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
            <p style="font-size: 16px; color: #555;">Hi there,</p>
            <p style="font-size: 16px; color: #555;">You requested to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>
            <div style="font-size: 20px; font-weight: bold; text-align: center; padding: 10px; background-color: #f0f0f0; border-radius: 5px; color: #333;">
                ${otp}
            </div>
            <p style="font-size: 16px; color: #555; text-align: center; margin-top: 20px;">This OTP is valid for 10 minutes. If you didn't request a password reset, please ignore this email.</p>
            <p style="font-size: 14px; color: #999; text-align: center;">Thanks,<br> BatterySync</p>
        </div>
    `;
};

const sendMail = (otp, email) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password OTP for Battery Sync",
            html: generateEmailBody(otp),
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
                throw new Error(error.message);
            } else {
                console.log("Email sent successfully:", info.response);
            }
        });

    } catch (error) {
        console.log("Error:", error);
    }
};

module.exports = sendMail;
