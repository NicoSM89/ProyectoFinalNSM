const productService = require('../services/productService.js');

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const result = await productService.deleteProduct(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
