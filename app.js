// app.js
const express = require('express');
const db = require('./src/config/db');
const configureMiddleware = require('./src/config/middleware');

const app = express();

configureMiddleware(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await db.connectToDatabase();
});

module.exports = app;