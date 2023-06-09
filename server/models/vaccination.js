const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const vaccination = new mongoose.Schema({
  vaccineId: { type: ObjectId, ref: 'vaccine', trim: true, required: true },
  hospitalId: { type: ObjectId, ref: 'hospital', trim: true, required: true },
  transactionHash: {
    type: String,
    required: false,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  loginId: { type: ObjectId, ref: 'login', trim: true, required: true },
  date: { type: Date, trim: true, required: true },
  status: {
    type: String,
    enum: [true, false],
    default: true,
  },
});

module.exports = mongoose.model('vaccination', vaccination);
