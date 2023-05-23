const login = require('../../models/login');
const signup = require('../../models/signup');
const transporter = require('../../modules/mail');
const medicaldetails = require('../../models/medicalDetails');

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await login.findOne({ email: email });

    if (!user)
      return res.send({
        success: false,
        message: 'Invalid email or password',
      });

    

    if (!(await login.verifyPassword(password, user.password, user.salt)))
      return res.send({
        success: false,
        message: 'Invalid email or password',
      });

    const accessToken = login.generateAuthToken(user);
    const refreshToken = login.generateAuthToken(user);

    // console.log('accessToken', accessToken);

    const currentUser = await signup.findOne({ loginId: user.id });
    const Cuser = await login.findById(user.id); // assuming `userId` is the ID of the user you want to update

    await Cuser.updateOne({ token: accessToken });

    // const currentDesignation = await designations.findOne({
    //   where: { id: user.designationId },
    // });

    // const permission_data = await permissionSetting.findAll({
    //   where: { designationId: user.designationId },
    //   include: permissions,
    // });
    // const mappingArray = permission_data.map((data) => {
    //   return {
    //     menu: data.permission.menu,
    //     subMenu: data.permission.subMenu,
    //   };
    // });
    return res.send({
      success: true,
      message: 'Login successfully',
      data: {
        user: currentUser.name,
        designation: currentUser.role,
        accessToken,
        refreshToken,
        // permission: mappingArray,
      },
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

exports.Registration = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const userExist = await login.findOne({ email: req.body.email });
    if (userExist) {
      res.send({ success: false, message: 'user already exist' });
    } else {
      const salt = await login.generateSalt();

      req.body.password = await login.hashPassword(req.body.confirm, salt);
      req.body.salt = salt;

      const log = await login.create({
        email: req.body.email,
        password: req.body.password,
        salt: req.body.salt,
      });

      const data = await signup.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        aadharNo: req.body.aadharNo,
        dob: req.body.dob,
        pinCode: req.body.pinCode,
        country: req.body.country,
        state: req.body.state,
        role: 'Patient',
        loginId: log.id,
      });

      const medical = await medicaldetails.create({
        blood: req.body.blood,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        loginId: log.id,
      });

      let mailOptions = {
        to: req.body.email,
        subject: 'Successfully Registered',
        text: `Your username is ${req.body.name} is registered successfully`,
      };

      const info = await transporter.sendMail(mailOptions);

      res.send({
        success: true,
        message: 'success',
      });
    }
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};
