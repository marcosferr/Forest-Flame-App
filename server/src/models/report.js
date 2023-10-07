const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
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

reportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
