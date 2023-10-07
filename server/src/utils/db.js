const mongoose = require("mongoose");

function connectToDB() {
  const { MONGO_URI } = process.env;
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectToDB,
  User,
};
