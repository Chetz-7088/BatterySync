const User = require('../models/Users');
const bcrypt = require('bcrypt')
const joi = require("joi");
const jwt = require("jsonwebtoken")
require('dotenv').config();

const login = async (req, res, next) => {
    console.log("Welcome to login page");

    try {
        const {
            email,
            password
        } = req.body;


        const {
            error: validationError
        } = validateLogin(req.body);
        if (validationError) {
            const error = new Error(validationError.details[0].message);
            error.statusCode = 400;
            throw error;
        }

        const formatted_email = email.toLowerCase();
        const user = await User.findOne({
            email: formatted_email
        });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 401; // unauthorized access
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const accessToken = jwt.sign({
            email: formatted_email,
            userID: user._id
        },
            process.env.ACCESS_KEY_TOKEN, {
            expiresIn: '7d'
        });

        res.status(201).json({
            message: "Logged In successfully",
            status: true,
            user: user,
            token: accessToken
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = login;

function validateLogin(data) {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string.",
            "string.email": "Email format is invalid.",
            "any.required": "Email is required.",
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