const mongoose = require('mongoose');

const vaccine = new mongoose.Schema({
  name: { type: String, lowercase: true, trim: true, required: true },
});

module.exports = mongoose.model('vaccine', vaccine);
