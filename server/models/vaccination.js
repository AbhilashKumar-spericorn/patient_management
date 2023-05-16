const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const vaccination = new mongoose.Schema({
  vaccineId: { type: ObjectId, ref: 'vaccine', trim: true, required: true },
  hospitalId: { type: ObjectId, ref: 'hospital', trim: true, required: true },
  loginId: { type: ObjectId, ref: 'login', trim: true, required: true },
  date: { type: Date, trim: true, required: true },
});

module.exports = mongoose.model('vaccination', vaccination);
