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

const configureMiddleware = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  // app.use(csrf({ cookie: true }));

  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/book", bookRoutes);
};

module.exports = configureMiddleware;
