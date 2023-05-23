const vaccinations = require('../../models/vaccination');
const vaccines = require('../../models/vaccine');
const doctor = require('../../models/doctor');
const hospital = require('../../models/hospital');
const transaction = require('../../models/transaction');

exports.addVaccination = async (req, res) => {
  try {
    console.log('req.body', req.body);

    let { values, result } = req.body;
    console.log('values', values);

    let hospitalData = await hospital.findOne({
      _id: req.body.values.hospitalId,
    });

    let vaccineList = await vaccines.findOne({
      _id: req.body.values.vaccineName,
    });
    //   //   // insert data to transaction modal
    let transactionDetails = new transaction({
      amount: '0.00',
      status: req.body.result.status,
      appointmentType: 'vaccination',
      transactionHash: req.body.result.transactionHash,
      loginId: req.user.id,
    });
    const trans = await transaction.create(transactionDetails);
    //   //   // insert data to consultation model

    const vaccins = await vaccinations.create({
      vaccineId: vaccineList._id,
      hospitalId: hospitalData._id,
      loginId: req.user.id,
      date: new Date(req.body.values.date).setHours(0, 0, 0, 0),
    });
    console.log(trans, vaccins);
    return res.send({
      success: true,
      message: 'Your Payment is success and booking is confirmed',
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// get all available vaccines
exports.getAllVaccines = async (req, res) => {
  try {
    const data = await vaccines.find();
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

//get user vaccination data
exports.getUserData = async (req, res) => {
  try {
    const data = await vaccinations
      .find({ loginId: req.user.id })
      .populate('vaccineId')
      .populate('hospitalId');
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
exports.getRegisteredVaccinations = async (req, res) => {
  try {
    const data = await vaccinations
    .aggregate([
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccination_details',
        },
      },
      {
        $unwind: {
          path: '$vaccination_details',
          preserveNullAndEmptyArrays: true,
        },
      },
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
