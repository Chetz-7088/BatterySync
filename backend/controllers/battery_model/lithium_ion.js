const express = require('express');
const router = express.Router();
const { predictRUL } = require('../../MLmodel/LiIonModel');
const joi = require("joi");
const User = require('../../models/Users');

// Lithium-Ion handler function
const liIon = async (req, res, next) => {
    console.log("hi");
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing." });
        }
        const { dischargeTime, decrement, maxVoltageDischarge, minVoltageCharge, timeAt4_15v, timeConstantCurrent, chargingTime, email } = req.body;

        // Validate incoming data
        const { error: validationError } = validateBatteryData(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError.details[0].message });
        }

        const formatted_email = email.toLowerCase();
        const user = await User.findOne({ email: formatted_email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.batteryType !== "Lithium-Ion") {
            return res.status(400).json({ message: "Battery Modeling is still in process, try using Lithium-Ion battery for now." });
        }

        console.log(dischargeTime, decrement, maxVoltageDischarge, minVoltageCharge, timeAt4_15v, timeConstantCurrent, chargingTime, email);

        // Call Python model API
        const predictedRUL = await predictRUL(dischargeTime, decrement, maxVoltageDischarge, minVoltageCharge, timeAt4_15v, timeConstantCurrent, chargingTime);

        // Ensure predictedRUL is a valid number
        if (predictedRUL === null || isNaN(predictedRUL)) {
            return res.status(500).json({ message: "Error predicting RUL from the model API." });
        }

        // Maintain only last 100 entries in batteryData
        if (user.batteryData.length >= 100) {
            user.batteryData.shift();
        }

        console.log(typeof predictedRUL);

        user.batteryData.push({
            dischargeTime, decrement, maxVoltageDischarge, minVoltageCharge, timeAt4_15v, timeConstantCurrent, chargingTime, rul: predictedRUL,
            timestamp: new Date(),
        });

        // Save user data with updated RUL value
        await user.save();

        res.status(200).json({
            message: "Battery data added successfully",
            user: user,
            batteryData: {
                dischargeTime,
                decrement,
                maxVoltageDischarge,
                minVoltageCharge,
                timeAt4_15v,
                timeConstantCurrent,
                chargingTime,
                rul: predictedRUL
            }
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Validation function
function validateBatteryData(data) {
    const schema = joi.object({
        dischargeTime: joi.number().required(),
        decrement: joi.number().required(),
        maxVoltageDischarge: joi.number().required(),
        minVoltageCharge: joi.number().required(),
        timeAt4_15v: joi.number().required(),
        timeConstantCurrent: joi.number().required(),
        chargingTime: joi.number().required(),
        email: joi.string().email().required()
    });

    return schema.validate(data, { abortEarly: false });
}

module.exports = liIon;
