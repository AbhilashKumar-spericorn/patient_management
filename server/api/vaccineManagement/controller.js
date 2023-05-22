const vaccinations = require('../../models/vaccination');
const vaccines = require('../../models/vaccine');
const doctor = require('../../models/doctor');
const hospital = require('../../models/hospital');

exports.addVaccination = async (req, res) => {
  try {
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

exports.getAllVaccines = async (req, res) => {
  try {
    const data  = await vaccines.find();
    console.log('data', data)
    res.send({
      data: data,
      success: true,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};
