const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const consultation = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  hospitalId: {
    type: ObjectId,
    ref: 'hospital',
    required: true,
    trim: true,
  },
  departmentId: {
    type: ObjectId,
    ref: 'department',
    required: false,
    trim: true,
  },
  doctorId: {
    type: ObjectId,
    ref: 'doctor',
    required: false,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  transactionHash: {
    type: String,
    required: false,
    trim: true,
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('consultation', consultation);
