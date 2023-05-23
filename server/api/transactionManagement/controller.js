const transactions = require('../../models/transaction');

exports.getAllTransactions = async (req, res) => {
  try {
    const data = await transactions.aggregate([
      {
        $lookup: {
          from: 'signups',
          localField: 'loginId',
          foreignField: 'loginId',
          as: 'user_details',
        },
      },
      {
        $unwind: {
          path: '$user_details',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    

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
