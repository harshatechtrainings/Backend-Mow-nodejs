// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(cors());
app.use(cookieParser()); // Use the cookie-parser middleware
app.use(bodyParser.json());

// Use the authentication routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await db.connectToDatabase();
});

module.exports = app;