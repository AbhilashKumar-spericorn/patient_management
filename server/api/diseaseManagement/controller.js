const diseases = require('../../models/diseases');
const jwt = require('jsonwebtoken');
const login = require('../../models/login');
const signup = require('../../models/signup')
const medicalDetails = require('../../models/medicalDetails');

// list all diseases
exports.listDiseases = async (req, res) => {
  try {
    const data = await diseases.find();
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

//get med report of user
exports.getReports = async (req, res) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let who = await login.findById(decoded.id);
    const data =  await medicalDetails.aggregate([
      {
        $lookup: {
          from: 'logins',
          localField: 'loginId',
          foreignField: '_id',
          as: 'login_info',
        },
      },
      {
        $unwind: {
          path: '$login_info',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'diseases',
          localField: 'diseaseName',
          foreignField: '_id',
          as: 'd_info',
        },
      },
      {
        $unwind: {
          path: '$d_info',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          loginId: who._id,
        },
      },
      {
        $project: {
          diseases: 1,
         
        },
      },
    ]);
    console.log('data', data)
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
