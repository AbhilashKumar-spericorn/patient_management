const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


const transaction = new mongoose.Schema({

  transactionHash: {
    type: String,
    required: false,
    trim: true,
  },
  amount: {
    type: String,
    required: false,
    trim: true,
  },
  from: {
    type: String,
    required: false,
    trim: true,
  },
  to: {
    type: String,
    required: false,
    trim: true,
  },
  status: { 
    type: String,
    required: false,
    trim: true,
},
});

module.exports = mongoose.model('transaction', transaction);