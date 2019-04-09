const { User } = require('../models/user');

/**
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllUsers = async () => {
  const users = await User.find().select('-password');

  return {
    status: 200,
    data: users,
  };
};

/**
 * @param {Object} options
 * @param {String} options.userId The user Id that needs to be deleted
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteUser = async (options) => {
  const user = await User.findByIdAndRemove(options.userId);

  if (!user) {
    return {
      status: 404,
      data: 'The user with the given ID was not found.',
    };
  }

  return {
    status: 200,
    data: 'deleteUser ok!',
  };
};
