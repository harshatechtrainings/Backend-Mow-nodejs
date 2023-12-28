const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authController = require("../controllers/authController");
const config = require("config");
const { StatusEnum } = require("../utils/errorCodes");

const isAuthenticated = false;

/** Middleware to verify JWT token */
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const authorizationArray = token.split(" ");

  if (authorizationArray.length == 2 && authorizationArray[0] == "Bearer") {
    await verifyBearerToken(authorizationArray[1]);
    /** isAuthenticated function here is required to validate incase if access token is malformed. */
    await this.isAuthenticated(req, res, next);
  } else if (authorizationArray[0] == "Basic") {
    const userCredentials = atob(authorizationArray[1]).split(":");
    const username = userCredentials[0];
    const password = userCredentials[1];
    const response = await authController.findUserWithPassword(
      username,
      password
    );
    authController.validateResponse(response, res, true);
  }
};

const verifyBearerToken = (token) => {
  if (!token) {
    return res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
  }
  verifyJSWT(token);
};

/** Middleware to check if a user is authenticated */
exports.isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
    }

    // You can add additional checks based on your authentication requirements

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusEnum.INTERNAL_SERVER_ERROR });
  }
};

const verifyJSWT = (token) => {
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err) {
      return res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
    }
    req.userId = decoded.userId;
    next();
  });
};
