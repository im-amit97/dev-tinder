const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sarodeamit111:SAkiRIUFzzK6BPTZ@learnnode.v3sky.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
