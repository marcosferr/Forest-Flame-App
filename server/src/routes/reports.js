const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Report = require("../models/report");
const query = require("../utils/fire_classificator");
const csv = require("csv-parser");

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
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const img_url = req.file.path;

    // Create new report object with GeoJSON location field
    const report = new Report({
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      img_url,
    });

    await report.save();

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/nearby-reports", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    console.log(latitude, longitude);

    const nearbyReports = await Report.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000,
        },
      },
    });

    res.json(nearbyReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch CSV data from NASA API
    const response = await fetch(
      "https://firms.modaps.eosdis.nasa.gov/api/country/csv/b994abe46ba1c7431918f7c01fb1172d/VIIRS_SNPP_NRT/PRY/1"
    );
    const csvData = await response.text();

    // Parse CSV data into JSON
    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(",");
      const data = {};
      for (let j = 0; j < headers.length; j++) {
        data[headers[j]] = columns[j];
      }
      jsonData.push(data);
    }

    // Combine CSV data with data from Report model
    const reports = await Report.find();
    const combinedData = [...reports, ...jsonData];
    const transformedData = combinedData.map((item) => ({
      acq_time: item.acq_time,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
    res.json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
