const express = require("express");
const { connectToDB } = require("./utils/db");

const app = express();

// Middleware
app.use(express.json());

// Connect to database before starting server
connectToDB();
// Routes
setRoutes(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
