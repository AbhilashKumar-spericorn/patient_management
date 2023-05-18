const login = require('../../models/login');
const signup = require('../../models/signup');
const medicalDetails = require('../../models/medicalDetails');
const jwt = require('jsonwebtoken');

//change password

exports.changePassword = async (req, res) => {
  const decrypted = CryptoJS.AES.decrypt(
    req.body.currentPassword,
    'XkhZG4fW2t2W'
  );
  const decrypted2 = CryptoJS.AES.decrypt(req.body.newPassword, 'XkhZG4fW2t2W');
  const decrypted3 = CryptoJS.AES.decrypt(
    req.body.confirmPassword,
    'XkhZG4fW2t2W'
  );
  const currentPassword = decrypted.toString(CryptoJS.enc.Utf8);

  const newPassword = decrypted2.toString(CryptoJS.enc.Utf8);
  const confirmPassword = decrypted3.toString(CryptoJS.enc.Utf8);

  const token = req.header('Authorization')
    ? req.header('Authorization').replace('Bearer ', '')
    : null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let who = await login.findById(decoded.id);

  if (!who) {
    errorMessage(res, 'You dont have the permission to change the password');
  }
  const VerifyPassword = await login.verifyPassword(
    currentPassword,
    who.password,
    who.salt
  );

  if (!VerifyPassword) {
    return errorMessage(res, 'You entered the Wrong Password');
  } else {
    const salt = await login.generateSalt();
    const Password = await login.hashPassword(newPassword, salt);
    await login.update(
      { salt: salt, password: Password },
      { where: { id: who.id } }
    );
    res.send({
      success: true,
      message: 'password changed successfully',
    });
  }
};

//report disease
exports.reportDisease = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let who = await login.findById(decoded.id);
    console.log('who', who);
    const med = await medicalDetails.findOne({ loginId: who._id });
    console.log('med', med);

    const mappedArray = req.body.diseases.map((item) => {
      return {
        diseaseName: item.name,
        startDate: new Date(item.startDate),
        remarks: item.remarks,
      };
    });

    await med.updateOne({ diseases: mappedArray });

    res.send({
      success: true,
      message: 'success',
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// get user profile
exports.viewProfile = async (req, res) => {
  let who = await login.findById(req.user.id);
  const data = await signup.aggregate([
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
        from: 'medicaldetails',
        localField: 'loginId',
        foreignField: 'loginId',
        as: 'medical_info',
      },
    },
    {
      $unwind: {
        path: '$medical_info',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        loginId: who._id,
      },
    },
  ]);

  res.send({
    success: true,
    data: data,
  });
  try {
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// get basic data
exports.getBasicData = async (req, res) => {
  let who = await login.findById(req.user.id);
  const data = await signup
    .findOne({ loginId: who._id })
    .populate('loginId', 'username email') // Replace 'username' and 'email' with the fields you want to populate from the Login model
    .exec();

  res.send({
    success: true,
    data: data,
  });
  try {
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// update basic profile
exports.updateBasicProfile = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const who = await login.findById(req.user.id);
    console.log(who);
    const updatedProfile = await signup.findOneAndUpdate(
      {
        loginId: who._id,
      },
      {
        name: req.body.name,
        aadharNo: req.body.aadharNo,
        phoneNumber: req.body.phoneNumber,
        dob: req.body.dob,
        pinCode: req.body.pinCode,
        country: req.body.country,
        state: req.body.state,
      },
      { new: true } // To return the updated document
    );

    if (!updatedProfile) {
      return res.send({
        success: false,
        message: 'Profile not found',
      });
    }

    res.send({
      success: true,
      message: 'Profile updated',
      profile: updatedProfile,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// get medical data
exports.getMedData = async (req, res) => {
  let who = await login.findById(req.user.id);
  const data = await medicalDetails
    .findOne({ loginId: who._id })
    .populate('loginId', 'username email') // Replace 'username' and 'email' with the fields you want to populate from the Login model
    .exec();

  res.send({
    success: true,
    data: data,
  });
  try {
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// update medical data
exports.updateMedData = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const who = await login.findById(req.user.id);
    console.log(who);
    const updatedProfile = await medicalDetails.findOneAndUpdate(
      {
        loginId: who._id,
      },
      {
        blood: req.body.blood,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
      },
      { new: true } // To return the updated document
    );

    if (!updatedProfile) {
      return res.send({
        success: false,
        message: 'Profile not found',
      });
    }

    res.send({
      success: true,
      message: 'Profile updated',
      profile: updatedProfile,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
