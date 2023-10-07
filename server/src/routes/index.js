const { getIndex } = require("../controllers");
const authRouter = require("./auth");
const reportsRouter = require("./reports");
function setRoutes(app) {
  app.get("/", getIndex);
  app.use("/auth", authRouter);
  app.use("/reports", reportsRouter);
}

module.exports = { setRoutes };
