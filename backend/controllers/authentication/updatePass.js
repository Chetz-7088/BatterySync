const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const joi = require("joi");

const updatePass = async (req, res, next) => {
    try {
        const { email, token, password } = req.body;
        const en_password = await bcrypt.hash(password, 10);

        const { error: validationError } = validateData(req.body);
        if (validationError) {
            const error = new Error(validationError.details[0].message);
            error.statusCode = 400;
            throw error;
        }

        if (!email || !token) {
            const error = new Error("Email and token are required.");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 401;
            throw error;
        }

        if (user.otp.token !== token) {
            const error = new Error("Invalid token.");
            error.statusCode = 400;
            throw error;
        }

        user.password = en_password;
        user.otp = {};
        await user.save();

        res.status(200).json({
            message: "Password Updated Successfully.",
            status: true
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = updatePass;

function validateData(data) {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string.",
            "string.email": "Email format is invalid.",
            "any.required": "Email is required.",
        }),
        token: joi.string().required().messages({
            "any.required": "Token is required.",
        }),
        password: joi.string().min(6).required().messages({
            "string.base": "Password must be a string.",
            "string.min": "Password must be at least 6 characters.",
            "any.required": "Password is required.",
        }),
    });

    return schema.validate(data, {
        abortEarly: false
    });
}