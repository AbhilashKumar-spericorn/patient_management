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
    const { date, time } = req.body;
    const doctordata = await doctor.findOne({ doctorName: req.body.doctor });
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
      departmentName: req.body.department,
    });
    const hospitaldata = await hospital.findOne({
      hospitalName: req.body.hospital,
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
    const data = await consultation.create({
      date: req.body.date,
      doctorId: doctordata._id,
      hospitalId: hospitaldata._id,
      departmentId: departmentdata._id,
      time: req.body.time,
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
