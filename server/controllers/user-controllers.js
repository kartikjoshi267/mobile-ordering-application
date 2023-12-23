const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `${errors.array()[0].msg}: ${errors.array()[0].path}` });
    }

    const { email, username, password, role } = req.body;

    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'User with the same email already exists' });
    }

    if (await User.findOne({ username })) {
      return res.status(409).json({ error: 'User with the same username already exists' });
    }

    const newUser = new User({ email, username, password, role });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `${errors.array()[0].msg}: ${errors.array()[0].path}` });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
    res.json({ accessToken: accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).select('-password').populate('cart');
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
