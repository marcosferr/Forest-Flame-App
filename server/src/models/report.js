const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  acq_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
