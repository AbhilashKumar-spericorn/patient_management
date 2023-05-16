const doctors = require('../../models/doctor');

exports.getAllDoctors = async (req, res) => {
  try {
    const data = await doctors.find();
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
