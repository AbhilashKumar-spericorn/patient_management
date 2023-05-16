const login = require('../../models/login');
const signup = require('../../models/signup');

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await login.findOne( { email: email } );

    if (!user)
      return res.send({
        success: false,
        message: 'Invalid email or password',
      });

    console.log('user', user);
  

    if (!(await login.verifyPassword(password, user.password, user.salt)))
      return res.send({
        success: false,
        message: 'Invalid email or password',
      });

    const accessToken = login.generateAuthToken(user);
    const refreshToken = login.generateAuthToken(user);

    console.log('accessToken', accessToken)

    const currentUser = await signup.findOne({ loginId: user.id } );
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
