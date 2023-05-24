const mongoose = require('mongoose');

const vaccine = new mongoose.Schema({
  name: { type: String, lowercase: true, trim: true, required: true },
  disease: { type: String, trim: true, required: true },
  antigen: { type: String, trim: true, required: true },

});

module.exports = mongoose.model('vaccine', vaccine);
