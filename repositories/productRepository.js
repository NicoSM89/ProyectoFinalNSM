const Product = require('../models/Product.js');

class ProductRepository {
  async deleteProductById(productId) {
    return Product.findByIdAndDelete(productId);
  }

  async getProductById(productId) {
    return Product.findById(productId);
  }
}

module.exports = new ProductRepository();
