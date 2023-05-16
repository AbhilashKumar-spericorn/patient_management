const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    salt: String,
    token: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

login.statics.generateSalt = async () => {
  return await bcrypt.genSalt();
};

login.statics.hashPassword = async (pass, salt) => {
  return await bcrypt.hash(pass, salt);
};

login.statics.verifyPassword = async (pass, hash, salt) => {
  console.log('pass', pass);
  console.log('hash', hash);
  const hashPassword = await bcrypt.hash(pass, salt);
  // if (hashPassword === hash) return true;
  // else return false;
  return await bcrypt.compare(pass, hash);
};

login.statics.generateAuthToken = (data) => {
  let expiresIn = expireIn(10);
  if (data.rememberMe) {
    expiresIn = expireIn(720);
  }

  return jwt.sign(
    {
      id: data._id,
      email: data.email,
      validity: data.password.concat(data._id).concat(data.email),
    },
    'qwerty',
    { expiresIn }
  );
};

const expireIn = (numDays) => {
  const dateObject = new Date();
  return dateObject.setMinutes(dateObject.getMinutes() + numDays);
};

module.exports = mongoose.model('login', login);
