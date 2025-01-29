const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        batteryType: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        otp: {
            otp: { type: String },
            sendTime: { type: Number },
            token: { type: String },
            expiryTime: { type: Number },
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


