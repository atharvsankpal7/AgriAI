const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/AgriAi";

/**
 * Connects to the MongoDB database using the provided URI.
 * Handles connecting and logging any errors.
 */
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToMongo;
