// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { fullname,username, password,confirmPassword } = req.body;

  try {
    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
    }
    else {
      res.status(401).json({ message: 'Password and confirmPassword doesn`t match' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
   
   const validUser = await this.findUserWithPassword(username, password);

    if (validUser) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // You can customize the expiration time
      });

      res.status(200).json({ message: 'Signin successful', token });

      //setting cookie
      if (res.status == 200) {
        setCookies(res, token)
      }

    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/** Funtion findUserWithPassword returns only boolean value
 * @param username
 * @param password
 */
exports.findUserWithPassword = async (username, password) => {
   const user = await User.findOne({ username });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      return isValidPassword;
    }
    
    return false;

}

const setCookies = (res, token) => {
      // Set the token as a cookie
    res.cookie('accesstoken', token, {
      httpOnly: true,
      // Add other cookie options as needed
    });
}
