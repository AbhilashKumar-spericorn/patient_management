const jwt = require('jsonwebtoken');
const login = require('../models/login');

module.exports = async (req, res, next) => {
  try {
    if (
      req.originalUrl.startsWith('/auth') ||
      req.originalUrl.startsWith('/contact')
    )
      return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    if (!token) {
      return res.json({
        success: false,
        message: 'Unauthorized Access',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({
        success: false,
        message: 'Invalid token',
      });
    }

    if (decoded.exp < Date.now()) {
      return res.json({
        success: false,
        message: 'Token expired',
      });
    }

    const isUserExists = await login.findById(decoded.id);
    if (!isUserExists) {
      return res.json({
        success: false,
        message: 'Access Denied',
      });
    }
    const access_Token = await login.findOne({ token: token });
    if (!access_Token) {
      return res.json({
        success: false,
        msg: 'Invalid or Expired Token',
      });
    }

    let matchValidity = isUserExists.password
      .concat(isUserExists._id)
      .concat(isUserExists.email);
    if (matchValidity != decoded.validity) {
      return res.json({
        success: false,
        message: 'Access Denied',
      });
    }

    req.user = decoded;
    return next();
  } catch (ex) {
    console.log('error', ex);
    res.json({
      success: false,
      message: 'Invalid Token',
    });
  }
};
