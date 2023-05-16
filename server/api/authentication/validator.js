const Joi = require('joi');

const registerValidate = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    aadharNo: Joi.number().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

    confirm: Joi.string().required().valid(Joi.ref('password')),
    country: Joi.string().required(),
    dob: Joi.date().required().max('now'),
    pinCode: Joi.number().required(),
    state: Joi.string().required(),
    blood: Joi.string().required(),
    height: Joi.number().required().positive().integer().min(100).max(250),
    weight: Joi.number().required().min(0).max(180),
    gender: Joi.string().required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.send({ success: false, err: err.message });
  }
};

module.exports = { registerValidate };
