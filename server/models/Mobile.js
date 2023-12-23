const mongoose = require('mongoose');

// Create MongoDB Schema and Model for Mobiles
const mobileSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String,
  processor: String,
  memory: String,
  os: String,
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Mobile', mobileSchema);