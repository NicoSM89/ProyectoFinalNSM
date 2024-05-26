const userRepository = require('../repositories/userRepository.js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class UserService {
  async getAllUsers() {
    return userRepository.getAllUsers();
  }

  async cleanInactiveUsers(threshold) {
    const inactiveUsers = await userRepository.getInactiveUsers(threshold);
    const emails = inactiveUsers.map(user => user.email);

    await userRepository.deleteUserById({ lastLogin: { $lt: threshold } });

    emails.forEach(email => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cuenta eliminada por inactividad',
        text: 'Tu cuenta ha sido eliminada por inactividad.',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error enviando correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
    });

    return { message: 'Usuarios inactivos eliminados' };
  }

  async modifyUserRole(userId, role) {
    return userRepository.updateUserRole(userId, role);
  }

  async deleteUser(userId) {
    return userRepository.deleteUserById(userId);
  }
}

module.exports = new UserService();
