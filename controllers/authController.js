const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const {
      role, name, businessName, phone,
      password, city, pincode, address, fssaiNumber
    } = req.body;

    // Check if phone already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      name,
      businessName,
      phone,
      password: hashedPassword,
      city,
      pincode,
      address: role === 'supplier' ? address : undefined,
      fssaiNumber: role === 'supplier' ? fssaiNumber : undefined,
      fssaiCertificate: req.file ? req.file.path : undefined,
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Signup failed' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Optional: generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret', // Store securely (env variable)
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};
