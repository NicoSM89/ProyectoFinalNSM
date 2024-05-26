const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/Product.js');
const User = require('../models/User.js');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Controller', () => {
  it('should delete product', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com', role: 'premium' });
    await user.save();

    const product = new Product({ name: 'Test Product', description: 'Test Description', price: 100, owner: user._id });
    await product.save();

    const response = await request(app)
      .post('/api/products/delete')
      .send({ productId: product._id });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Producto eliminado');

    const deletedProduct = await Product.findById(product._id);
    expect(deletedProduct).toBeNull();
    
    await user.remove();
  });
});
