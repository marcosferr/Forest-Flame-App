const express = require("express");
const { connectToDB } = require("./utils/db");
const { setRoutes } = require("./routes");
const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  // Display QR code to user and wait for scan
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");

  const number = process.env.NUMBER; // Replace with actual phone number
  const message = "Hello, world!"; // Replace with actual message

  client.sendMessage(number, message);
});

client.initialize();

const app = express();
require("dotenv").config();
// Middleware
app.use(express.json());

// Connect to database before starting server
connectToDB();
// Routes
setRoutes(app);

//Server uploads folder
app.use("/uploads", express.static("uploads"));
// Start server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
