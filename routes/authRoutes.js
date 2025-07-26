const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, login } = require('../controllers/authController');

// Multer storage for file upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post('/signup', upload.single('fssaiCertificate'), signup);
router.post('/login', login);

module.exports = router;
