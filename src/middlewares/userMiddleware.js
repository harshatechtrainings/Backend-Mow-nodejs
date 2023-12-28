/** @format */

const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const { StatusEnum } = require("../utils/errorCodes");

const authorizeUserToDelete = async (req, res, next) => {
  try {
    await authMiddleware.verifyToken(req, res, next);
  } catch (error) {
    res.status(500).json({ error: StatusEnum.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { authorizeUserToDelete };
