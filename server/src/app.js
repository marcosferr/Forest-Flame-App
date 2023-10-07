const express = require("express");
const { connectToDB } = require("./utils/db");
const { setRoutes } = require("./routes");
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
