const mongoose = require('mongoose');
const consultation = require('../../models/consultation');
const doctor = require('../../models/doctor');
const department = require('../../models/department');
const hospital = require('../../models/hospital');
const login = require('../../models/login');
const consultationCertificate = require('../../models/consultationCertificate');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');
const {
  initiateTask,
  startTask,
  stopTask,
} = require('../../modules/cron/index');
const transaction = require('../../models/transaction');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');
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
      transactionHash: req.body.result.transactionHash,
      loginId: loginData._id,
      status: 'pending',
    });
    // console.log('data', data);
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
    // console.log('data', data);
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
    // console.log('data', data);
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

// issue certificate

exports.issueCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
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
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
    // console.log(data);
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

exports.consultationCertificate = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const data = await consultationCertificate.create(req.body);
    res.send({
      success: true,
      message: 'Certificate Generated Successfully',
    });
    generatePDF(req.body);
  } catch (e) {
    console.log('Error', e);
    return res.send({
      success: false,
      msg: e.message,
    });
  }
};

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  try {
    const allConsultations = await consultation.find({
      status: 'pending',
      date: { $lte: new Date() }, // Filter consultations where the date is less than or equal to the current date
    });
    console.log('allConsultations', allConsultations);
    const currentTime = new Date();

    for (const consultations of allConsultations) {
      const endTime = calculateEndTime(consultations.time);

      if (currentTime >= endTime) {
        await consultation.updateOne(
          { _id: consultations._id },
          { status: 'completed' }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

//cron job
function calculateEndTime(startTime) {
  const [hour, minute, meridiem] = startTime
    .match(/^(\d+).(\d+)(\w+)/)
    .slice(1);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const endTime = new Date();
  endTime.setHours(hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}

async function generatePDF(data) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(14);

  // Set the content on the page using the provided data
  page.drawText('CONSULTATION CERTIFICATE', {
    x: 50,
    y: page.getHeight() - 50,
    size: 18,
    underline: true,
  });

  page.drawText(`Certificate Number: ${data.certificateNumber}`, {
    x: 50,
    y: page.getHeight() - 100,
    size: 12,
  });

  page.drawText(`Patient Name: ${data.patientName}`, {
    x: 50,
    y: page.getHeight() - 140,
    size: 12,
  });

  page.drawText(`Doctor Name: ${data.doctorName}`, {
    x: 50,
    y: page.getHeight() - 180,
    size: 12,
  });

  page.drawText(`Consultation Time: ${data.consultationTime}`, {
    x: 50,
    y: page.getHeight() - 220,
    size: 12,
  });

  page.drawText(`Hospital Name: ${data.hospitalName}`, {
    x: 50,
    y: page.getHeight() - 260,
    size: 12,
  });

  page.drawText(`Issuer Name: ${data.issuerName}`, {
    x: 50,
    y: page.getHeight() - 300,
    size: 12,
  });

  page.drawText(`Issuer ID: ${data.issuerId}`, {
    x: 50,
    y: page.getHeight() - 340,
    size: 12,
  });

  page.drawText(`Issued Date and Time: ${data.issuedDateTime}`, {
    x: 50,
    y: page.getHeight() - 380,
    size: 12,
  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`consultationCertificate_${data.patientName}.pdf`, pdfBytes);
}


//get all certificates
exports.getConsultationCertificates = async (req, res) => {
  try {
    const data = await consultationCertificate.find();
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
