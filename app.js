/** @format */

// app.js
const express = require("express");
const db = require("./src/config/db");
const configureMiddleware = require("./src/config/middleware");
const { sendEmail } = require("./src/utils/emailService");
const { emailService } = require("./src/controllers/emailController");

const app = express();

configureMiddleware(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await db.connectToDatabase();
});

// emailService("harshapeddireddy19@gmail.com");
module.exports = app;
