const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Report = require("../models/report");
const query = require("../utils/fire_classificator");

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Set up report route
router.post("/report", upload.single("image"), async (req, res) => {
  const { latitude, longitude } = req.body;
  const { path } = req.file;

  // Evaluate image using fireclassificator query
  const result = await query(path);
  console.log(result);
  // If result is greater than 0.99, save report
  if (result[0]["score"] > 0.99) {
    const report = new Report({
      latitude,
      longitude,
      img_url: path,
    });
    await report.save();
    res.json({ message: "Report saved successfully" });
  } else {
    // Delete image if result is not greater than 0.99
    fs.unlinkSync(path);
    res.json({ message: "Image not saved" });
  }
});
module.exports = router;
