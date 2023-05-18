const doctors = require('../../models/doctor');

exports.getAllDoctors = async (req, res) => {
  try {
    const data = await doctors.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: 'departmentId',
          as: 'department_details',
        },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: 'hospitalId',
          as: 'hospital_details',
        },
      },
    ]);
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
