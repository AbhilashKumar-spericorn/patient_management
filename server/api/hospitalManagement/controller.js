const hospitals = require('../../models/hospital');

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
