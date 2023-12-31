/** @format */

// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
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
      res.status(200).json({ message: StatusMessage.SUCCESS });
    }
  } catch (error) {
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    /** implement authenticate before fetching the users */
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

exports.findUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: StatusMessage.USER_NOT_FOUND });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

exports.updateUser = async (req, res) => {
  const { username } = req.params;

  try {
    req.body.lastupdated = new Date();
    // Get the schema paths from the Mongoose model
    const modelPaths = Object.keys(User.schema.paths);

    // Check if all keys in the request body are present in the model schema
    const isValidFields = Object.keys(req.body).every((key) => modelPaths.includes(key));

    if (isValidFields) {
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        {
          $set: req.body,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: StatusMessage.USER_NOT_FOUND });
      }

      return res
        .status(StatusCodes.OK)
        .json({ status: ReasonPhrases.OK, message: StatusMessage.SUCCESS, data: { updatedUser } });
    } else {
      return res.status(404).json({ error: "Invalid body" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};
