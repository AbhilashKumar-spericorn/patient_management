const mongoose = require('mongoose');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const vaccinations = require('../../models/vaccination');
const vaccines = require('../../models/vaccine');
const doctor = require('../../models/doctor');
const hospital = require('../../models/hospital');
const transaction = require('../../models/transaction');
const vaccinationCertificate = require('../../models/vaccinationCertificate');

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
      transactionHash: req.body.result.transactionHash,
      loginId: req.user.id,
      status: req.body.result.status,
      time: req.body.values.time,
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
    const data = await vaccinations.aggregate([
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

exports.issueVCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await vaccinations.aggregate([
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
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $unwind: {
          path: '$vaccine_details',
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

exports.VaccinationCertificate = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const data = await vaccinationCertificate.create(req.body);
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
  page.drawText('VACCINE CERTIFICATE', {
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

  page.drawText(`Vaccine Name: ${data.vaccineName}`, {
    x: 50,
    y: page.getHeight() - 180,
    size: 12,
  });

  page.drawText(`Taken Time: ${data.vaccineTakenDatetime}`, {
    x: 50,
    y: page.getHeight() - 220,
    size: 12,
  });

  page.drawText(`antigen Name: ${data.antigen}`, {
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
  fs.writeFileSync(`VACCINATIONCertificate${data.patientName}.pdf`, pdfBytes);
}



// get all certificates
exports.getVaccinationCertificates = async (req, res) => {
  try {
    const data = await vaccinationCertificate.find();
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