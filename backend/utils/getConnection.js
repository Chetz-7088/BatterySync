require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.Mongo_URI;

const getConnection = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(mongoURI);
        console.log("DB is connected");
    } catch (error) {
        console.log("Failed to connect to DB:", error);
    }

    console.log("bye");
};

module.exports = getConnection;
