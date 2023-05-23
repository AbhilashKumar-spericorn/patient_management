const consultation = require('../../models/consultation');
const doctor = require('../../models/doctor');
const department = require('../../models/department');
const hospital = require('../../models/hospital');
const login = require('../../models/login');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');
const {
  initiateTask,
  startTask,
  stopTask,
} = require('../../modules/cron/index');
const transaction = require('../../models/transaction');

// add consultations

exports.addConsultation = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { date, time } = req.body.values;
    const doctordata = await doctor.findOne({
      doctorName: req.body.values.doctor,
    });
    const existingConsultation = await consultation.findOne({
      date,
      time,
      doctorId: doctordata._id,
    });
    console.log('existingConsultation', existingConsultation);
    if (existingConsultation) {
      return res.send({
        success: false,
        message:
          'Consultation already scheduled at the same date and time for this doctor.',
      });
    }
    console.log('doctordata', doctordata);
    const departmentdata = await department.findOne({
      departmentName: req.body.values.department,
    });
    const hospitaldata = await hospital.findOne({
      hospitalName: req.body.values.hospital,
    });
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const trans = await transaction.create({
      amount: '0.00',
      status: req.body.result.status,
      appointmentType: 'consultation',
      transactionHash: req.body.result.transactionHash,
      loginId: loginData._id,
    });

    const data = await consultation.create({
      date: req.body.values.date,
      doctorId: doctordata._id,
      hospitalId: hospitaldata._id,
      departmentId: departmentdata._id,
      time: req.body.values.time,
      loginId: loginData._id,
      Status: 'Occupied',
    });
    console.log('data', data);
    res.send({
      success: true,
      message: 'Consultation with doctor created successfully',
    });
    // await consultation.create(contactDetails);
  } catch (e) {
    console.log('Error', e);
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

//get user consultation data
exports.getUserCData = async (req, res) => {
  try {
    const data = await consultation
      .find({ loginId: req.user.id })
      .populate('hospitalId')
      .populate('departmentId')
      .populate('doctorId');
    console.log('data', data);
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

//get all vaccination data
exports.getRegisteredConsultations = async (req, res) => {
  try {
    const data = await consultation.aggregate([
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
      {
        $unwind: {
          path: '$hospital_details',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
        },
      },
      {
        $unwind: {
          path: '$department_details',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
        },
      },
      {
        $unwind: {
          path: '$doctor_details',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'signups',
          localField: 'loginId',
          foreignField: 'loginId',
          as: 'login_details',
        },
      },
      {
        $unwind: {
          path: '$login_details',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    console.log('data', data);
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
