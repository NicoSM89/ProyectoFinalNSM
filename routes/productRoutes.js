const express = require('express');
const { deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/delete', deleteProduct);

module.exports = router;
