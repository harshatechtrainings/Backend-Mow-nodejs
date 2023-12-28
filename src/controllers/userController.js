// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusEnum } = require("../utils/errorCodes");
const config = require("config");
const { logger, setLabel } = require("../Logger/logger");

setLabel("userController");

exports.deleteUser = async (req, res) => {
  console.log(req);
  const { user } = req.params;
  const { username, password } = req.body;

  console.log(user);

  logger.info(`Deleting the user ${user}`);
  try {
    const response = await this.simpleUserauthentication(username, password);
    if (response) {
      await User.deleteOne({ username: user });
      logger.info(`Deleting the user ${user} is success`);
      res.status(200).json({ message: StatusEnum.SUCCESS});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: StatusEnum.INTERNAL_SERVER_ERROR });
  }
  
}

exports.fetchUsers = async (req, res) => {
  try {
    /** implement authenticate before fetching the users */
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.findUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.simpleUserauthentication = async (username, password) => {
  const user = await User.findOne({ username });

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return true;
    }
  }

  return false;
};
