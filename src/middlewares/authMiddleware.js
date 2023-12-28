const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authController = require("../controllers/authController");
const config = require("config");
const { StatusEnum } = require("../utils/errorCodes");

const isAuthenticated = false;

/** Middleware to verify JWT token */
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token == null || token == undefined || token == "") {
    return res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
  }
  
  const authorizationArray = token.split(" ");

  if (authorizationArray.length == 2 && authorizationArray[0] == "Bearer") {
    const result = await verifyBearerToken(authorizationArray[1],req);

    if (result == StatusEnum.UNAUTHORIZED) {
      return res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
    } else if (result == StatusEnum.SUCCESS) {
      await this.isAuthenticated(req, res, next);
    }
    /** isAuthenticated function here is required to validate incase if access token is malformed. */
  } else if (authorizationArray[0] == "Basic") {
    const userCredentials = atob(authorizationArray[1]).split(":");
    const username = userCredentials[0];
    const password = userCredentials[1];
    const response = await authController.simpleUserauthentication(username, password)
    if (response) {
      next();
    }
    else {
      res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
    }
  }
};

const verifyBearerToken = async (token,req) => {
  if (!token) {
    return StatusEnum.UNAUTHORIZED;
  }

  await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return StatusEnum.UNAUTHORIZED;
    }
    req.userId = decoded.userId;
  });

  return StatusEnum.SUCCESS;
};

/** Middleware to check if a user is authenticated */
exports.isAuthenticated = async (req, res, next) => {
  try {
     console.log(req.userId);
    const user = await User.findById(req.userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: StatusEnum.UNAUTHORIZED });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: StatusEnum.INTERNAL_SERVER_ERROR });
  }
};


//Give me a documentaion for below function along with params



