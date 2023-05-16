const login = require('../../models/login');
const signup = require('../../models/signup');

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

  console.log('first', currentPassword, newPassword, confirmPassword);
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
  console.log(VerifyPassword);
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
