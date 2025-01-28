const User = require('../models/Users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const joi = require("joi");
require('dotenv').config();
const sendMail = require('../utils/sendMail');
const otpExpiryTime = 10 * 60 * 1000;

const forgetPass = async (req, res, next) => {
    console.log("Change your password!");

    try {
        const { email } = req.body;

        const { error: validationError } = validateLogin(req.body);
        if (validationError) {
            const error = new Error(validationError.details[0].message);
            error.statusCode = 400;
            throw error;
        }

        const formatted_email = email.toLowerCase();
        const user = await User.findOne({ email: formatted_email });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 401; // unauthorized access
            throw error;
        }
        const sendTime = new Date(user.otp.sendTime);
        sendTime.setMinutes(sendTime.getMinutes() + 1);
        const updatedTime = sendTime.getTime();

        if (user.otp.otp && updatedTime > new Date().getTime()) {
            const error =
                new Error(`Multiple OTP requests. Please wait for ${Math.floor((updatedTime - new Date().getTime()) / 1000)} sec or try entering the OTP already sent on your email.`);
            error.statusCode = 429;
            throw error;
        }

        const otp = crypto.randomInt(100000, 1000000);
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);

        const token = crypto.randomBytes(32).toString('hex');

        user.otp = {
            otp: hashedOtp,
            sendTime: new Date().getTime(),
            token: token,
            expiryTime: new Date().getTime() + otpExpiryTime,
        }

        await user.save();

        sendMail(otp, formatted_email);

        res.status(200).json({
            message: "OTP sent successfully",
            status: true,
            token: token,
            resendPermission: (user.otp.sendTime + (60 * 1000)),
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = forgetPass;

function validateLogin(data) {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string.",
            "string.email": "Email format is invalid.",
            "any.required": "Email is required.",
        })
    });

    return schema.validate(data, {
        abortEarly: false
    });
}