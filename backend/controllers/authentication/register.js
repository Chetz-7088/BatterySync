const User = require('../../models/Users');
const bcrypt = require('bcrypt')
const joi = require("joi"); // For details validations

const register = async (req, res, next) => {
    console.log("Welcome to user data submission");

    try {
        const { firstName, lastName, username, email, batteryType, address, city, state, country, phone, password } = req.body;
        const en_password = await bcrypt.hash(password, 10);

        const { error: validationError } = validateUser(req.body);
        if (validationError) {
            const error = new Error(validationError.details[0].message);
            error.statusCode = 400;
            throw error;
        }

        const formatted_email = email.toLowerCase();
        if (await User.findOne({ email: formatted_email })) {
            const error = new Error("This email id already exists.");
            error.statusCode = 400;
            throw error;
        }
        if (await User.findOne({ username: username })) {
            const error = new Error("This username already exists.");
            error.statusCode = 400;
            throw error;
        }

        const formatted_firstName = firstName.toLowerCase();
        const formatted_lastName = lastName.toLowerCase();

        const newUser = new User({
            firstName: formatted_firstName,
            lastName: formatted_lastName,
            username,
            email: formatted_email,
            batteryType,
            address,
            city,
            state,
            country,
            phone,
            password: en_password,
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id,
            status: true,
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = register;

function validateUser(data) {
    const schema = joi.object({
        firstName: joi.string().min(2).max(50).required().messages({
            "string.base": "First name must be a string.",
            "string.min": "First name must be at least 2 characters.",
            "string.max": "First name cannot exceed 50 characters.",
            "any.required": "First name is required.",
        }),
        lastName: joi.string().min(2).max(50).required().messages({
            "string.base": "Last name must be a string.",
            "string.min": "Last name must be at least 2 characters.",
            "string.max": "Last name cannot exceed 50 characters.",
            "any.required": "Last name is required.",
        }),
        username: joi.string().min(3).max(20).required().messages({
            "string.base": "Username must be a string.",
            "string.min": "Username must be at least 3 characters.",
            "string.max": "Username cannot exceed 20 characters.",
            "any.required": "Username is required.",
        }),
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string.",
            "string.email": "Email format is invalid.",
            "any.required": "Email is required.",
        }),
        batteryType: joi.string().valid("Lithium-Ion", "Lead-Acid", "Nickel-Metal Hydride").required().messages({
            "any.required": "Battery type is required.",
            "string.base": "Battery type must be a string.",
            "any.only": "Battery type must be one of the following: Lithium-Ion, Lead-Acid, Nickel-Metal Hydride.",
        }),
        address: joi.string().min(3).max(100).required().messages({
            "string.base": "Address must be a string.",
            "string.min": "Address must be at least 3 characters.",
            "string.max": "Address cannot exceed 100 characters.",
            "any.required": "Address is required.",
        }),
        city: joi.string().min(2).max(50).required().messages({
            "string.base": "City must be a string.",
            "string.min": "City must be at least 2 characters.",
            "string.max": "City cannot exceed 50 characters.",
            "any.required": "City is required.",
        }),
        state: joi.string().min(2).max(50).required().messages({
            "string.base": "State must be a string.",
            "string.min": "State must be at least 2 characters.",
            "string.max": "State cannot exceed 50 characters.",
            "any.required": "State is required.",
        }),
        country: joi.string().min(2).max(50).required().messages({
            "string.base": "Country must be a string.",
            "string.min": "Country must be at least 2 characters.",
            "string.max": "Country cannot exceed 50 characters.",
            "any.required": "Country is required.",
        }),
        phone: joi.string().pattern(/^\d{10}$/).required().messages({
            "string.base": "Phone number must be a string.",
            "string.pattern.base": "Phone number must be exactly 10 digits.",
            "any.required": "Phone number is required.",
        }),
        password: joi.string().min(6).required().messages({
            "string.base": "Password must be a string.",
            "string.min": "Password must be at least 6 characters.",
            "any.required": "Password is required.",
        }),
    });

    return schema.validate(data, { abortEarly: false });
}
