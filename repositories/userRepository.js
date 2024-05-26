const User = require('../models/User.js');

class UserRepository {
  async getAllUsers() {
    return User.find({}, 'name email role');
  }

  async getInactiveUsers(threshold) {
    return User.find({ lastLogin: { $lt: threshold } });
  }

  async deleteUserById(userId) {
    return User.findByIdAndDelete(userId);
  }

  async updateUserRole(userId, role) {
    return User.findByIdAndUpdate(userId, { role }, { new: true });
  }
}

module.exports = new UserRepository();
