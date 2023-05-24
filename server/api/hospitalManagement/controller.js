const hospitals = require('../../models/hospital');
const signup = require('../../models/signup')
exports.getAllHospitals = async (req, res) => {
  try {
    const data = await hospitals.find();
    res.send({
      success: true,
      data: data,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};


exports.getAllPatients = async (req, res) => {
  try {
    const data = await signup.find({ role: 'Patient' });
    res.send({
      success: true,
      data: data,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};