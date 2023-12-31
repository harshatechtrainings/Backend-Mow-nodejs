/** @format */

// middleware.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const csrf = require("csurf");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const bookRoutes = require("../routes/bookRoutes");
const pilotRoutes = require("../routes/pilot/pilotRoutes");
const swaggerUi = require("swagger-ui-express");
// const specs = require("../utils/swaggerOptions");
const swaggerAutogen = require("swagger-autogen")();
const swaggerGen = require("./swaggerGen");
const router = express.Router();
// const swaggerFile = require("../../swagger-output.json");

const configureMiddleware = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  // app.use(csrf({ cookie: true }));
  // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("../../swagger-output.json")));

  // app.use("/auth", authRoutes);
  // app.use("/users", userRoutes);
  // app.use("/book", bookRoutes);
  // app.use("/pilot", pilotRoutes);
  // swaggerGen();
};

module.exports = configureMiddleware;
