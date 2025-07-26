const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['vendor', 'supplier'], required: true },
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  city: String,
  pincode: String,
  address: String,
  fssaiNumber: String,
  fssaiCertificate: String, // path to uploaded file
});

module.exports = mongoose.model('User', userSchema);
