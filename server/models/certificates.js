const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const certificates = new mongoose.Schema({
  certificateNo: { type: String, trim: true, required: true },

  certificateType: {
    type: String,
    enum: ['consultation', 'vaccination'],
    required: false,
  },
  loginId: { type: ObjectId, ref: 'login', required: false },
});

module.exports = mongoose.model('certificates', certificates);
