const departments = require('../../models/department');

exports.getAllDepartments = async (req, res) => {
  try {
    const data = await departments.find();
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
