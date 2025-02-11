const User = require('../../models/Users');
const bcrypt = require('bcrypt');

const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp, token } = req.body;

        if (!email || !otp || !token) {
            const error = new Error("Email, OTP, and token are required.");
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

        if (new Date().getTime() > user.otp.expiryTime) {
            const error = new Error("OTP has expired.");
            error.statusCode = 400;
            throw error;
        }

        const otpMatch = await bcrypt.compare(otp.toString(), user.otp.otp);
        if (!otpMatch) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 400;
            throw error;
        }

        user.otp.otp = null;
        await user.save();

        res.status(200).json({
            message: "OTP verified successfully.",
            status: true
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = verifyOtp;
