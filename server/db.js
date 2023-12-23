const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mobile_ordering');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}