const contact = require('../../models/contact');
const mail = require('../../modules/mail');

exports.setContact = async (req, res, next) => {
  console.log('req', req.body);
  try {
    req.body.status = 'unread';
    const data = await contact.create(req.body);

    var mailOptions = {
      from: process.env.USER_MAIL,
      to: req.body.email,
      subject: 'your review ',
      text: `Hi ${req.body.name} our representative will contact you shortly `,
    };

    var mailOptions2 = {
      from: process.env.USER_MAIL,
      to: 'mailto:abhilashkumar@spericorn.com',
      subject: 'New Contact Form Submission',
      text: `Hi a new contact form has been submitted by ${req.body.name} with message ${req.body.message} and phone number ${req.body.phoneNumber} `,
    };

    mail.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.send({
          success: false,
          message: e,
        });
      } else {
        console.log('Email sent  ' + info.response);
      }
    });
    mail.sendMail(mailOptions2, function (error, info) {
      if (error) {
        return res.send({
          success: false,
          message: error,
        });
      } else {
        console.log('Email sent to admin: ' + info.response);
      }
    });
    res.send({
      success: true,
      message: 'message posted successfully',
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// get all user messages
exports.getUserMessages = async (req, res, next) => {
  try {
    const data = await contact.find();
    // console.log('vdata', data);
    res.send({
      success: true,
      message: 'successfully fetched',
      data: data,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

// get individual message to read
exports.getMsgToRead = async (req, res, next) => {
  try {
    const id = req.params.id;
    const feedback = await contact.findById(id);
    res.send({
      success: true,
      message: 'marked as read',
      data: feedback,
    });
    // }
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};
