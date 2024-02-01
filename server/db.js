const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/AgriAi";

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) { 
    console.error(error);
  }
}

module.exports = connectToMongo;
