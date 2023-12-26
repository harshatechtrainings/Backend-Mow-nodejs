
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authController = require('../controllers/authController');

const isAuthenticated = false;

/** Middleware to verify JWT token */
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const authorizationArray = token.split(' ');
 
  if (authorizationArray.length == 2 && authorizationArray[0] == "Bearer") {
    await verifyBearerToken(authorizationArray[1]);
    /** isAuthenticated function here is required to validate incase if access token is malformed. */
    await this.isAuthenticated(req, res, next);
  } else if (authorizationArray[0] == "Basic") {
    const userCredentials = atob(authorizationArray[1]).split(':');
    const username = userCredentials[0];
    const password = userCredentials[1];
    const validUser = await authController.findUserWithPassword(username, password);
    if (validUser) {
      /** isAuthenticated is not required here since user was valideted with pasword in above step */
      next()
    }
    else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  }
  
};

const verifyBearerToken = (token) => {
  if(!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }
  verifyJSWT(token);
}

/** Middleware to check if a user is authenticated */
exports.isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }


    // You can add additional checks based on your authentication requirements

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyJSWT = (token) => {
  
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded)
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token'});
    }
    req.userId = decoded.userId;
    next();
  });

}
