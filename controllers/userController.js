const userService = require('../services/userService.js');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cleanInactiveUsers = async (req, res) => {
  try {
    const threshold = new Date(Date.now() - 30 * 60 * 1000); // 30 minutos
    const result = await userService.cleanInactiveUsers(threshold);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.modifyUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await userService.modifyUserRole(userId, role);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await userService.deleteUser(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
