const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
