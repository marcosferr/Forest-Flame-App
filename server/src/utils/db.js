const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectToDB };
