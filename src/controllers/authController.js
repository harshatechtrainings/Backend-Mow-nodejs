// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusEnum } = require("../utils/errorCodes");
const config = require("config");
const { logger, setLabel } = require("../Logger/logger");

setLabel("authController");
exports.signup = async (req, res) => {
  const { fullname, username, password, confirmPassword } = req.body;

  try {
    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullname,
        username,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: StatusEnum.SUCCESS });
    } else {
      res.status(401).json({ message: StatusEnum.INVALID_CREDENTIALS });
    }
  } catch (error) {
    res.status(500).json({ error: StatusEnum.INTERNAL_SERVER_ERROR });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  logger.info("Authentiating the user with given information");
  try {
    const response = await this.findUserWithPassword(username, password);

    await validateResponse(response, res, false);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: StatusEnum.INTERNAL_SERVER_ERROR });
  }
};


/** Funtion findUserWithPassword returns only boolean value
 * @param username
 * @param password
 */
exports.findUserWithPassword = async (username, password) => {
  const user = await User.findOne({ username });

  if (user.isLocked()) {
    return user;
  }
  
  if (user.loginAttempts === config.get('security.maxLoginAttempts')) {
     user.resetLoginAttempts();
  }

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    // Reset login attempts on successful login

    if (!isValidPassword) {
      return handleFailedLogin(user);
    }
    user.resetLoginAttempts();
    return user;
  }
  return false;
};

const setCookies = (res, token) => {
  // Set the token as a cookie
  res.cookie("accesstoken", token, {
    httpOnly: true,
    // Add other cookie options as needed
  });
};

const handleFailedLogin = async (user) => {
  console.log("handleLogin");
  // Increment login attempts
  const result = await user.incrementLoginAttempts();
  console.log(result);
  // Check if login attempts exceed the limit
  if (user.isMaxLoginAttemptsExceeded()) {
    return await user.lockAccount();
    // return result.json({ error: 'Account locked. Please try again later.' });
  } else {
    return result;
    // return result.json({ error: 'Invalid credentials. Please try again.' });
  }
};

const validateResponse = (result, res, isAPIRequest) => {
  if (result instanceof User) {
    if (result.loginAttempts === 0) {
      if (isAPIRequest) {
        const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET, {
          expiresIn: config.get("security.tokenexperiation"), // You can customize the expiration time
        });

        setCookies(res, token);
        res.status(200).json({ message: StatusEnum.SUCCESS, token });
      }
      /** isAuthenticated is not required here since user was valideted with pasword in above step */
      res.json({
        message: StatusEnum.SUCCESS,
        username: result.username,
      });
    } else if (
      result.loginAttempts === config.get("security.maxLoginAttempts") ||
      result.loginAttempts > config.get("security.maxLoginAttempts")
    ) {
      res.status(401).json({
        message: StatusEnum.ACCOUNT_LOCKED,
        attempts: result.loginAttempts,
      });
    } else if (result.loginAttempts > 0) {
      res.status(401).json({
        message: StatusEnum.INVALID_CREDENTIALS,
        attempts: result.loginAttempts,
      });
    }
  } else {
    return res.status(401).json({ error: StatusEnum.INVALID_CREDENTIALS });
  }
};