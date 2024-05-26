const productRepository = require('../repositories/productRepository.js');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class ProductService {
  async deleteProduct(productId) {
    const product = await productRepository.deleteProductById(productId);

    if (product) {
      const owner = await User.findById(product.owner);

      if (owner && owner.role === 'premium') {
        const mailOptions = {
          from: process.env.EMAIL,
          to: owner.email,
          subject: 'Producto eliminado',
          text: `Tu producto "${product.name}" ha sido eliminado.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error enviando correo:', error);
          } else {
            console.log('Correo enviado:', info.response);
          }
        });
      }
    }

    return { message: 'Producto eliminado' };
  }
}

module.exports = new ProductService();
