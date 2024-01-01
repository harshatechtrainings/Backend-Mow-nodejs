/** @format */

// app.js
const express = require("express");
const db = require("./src/config/db");
const configureMiddleware = require("./src/config/middleware");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const pilotRoutes = require("./src/routes/pilot/pilotRoutes");
const app = express();


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/book", bookRoutes);
app.use("/pilot", pilotRoutes);
configureMiddleware(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await db.connectToDatabase();
});

// emailService("harshapeddireddy19@gmail.com");
module.exports = app;
