const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
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

describe('User Controller', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should clean inactive users', async () => {
    const response = await request(app).delete('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuarios inactivos eliminados');
  });

  it('should modify user role', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com' });
    await user.save();

    const response = await request(app)
      .post('/api/users/modify-role')
      .send({ userId: user._id, role: 'admin' });

    expect(response.statusCode).toBe(200);
    expect(response.body.role).toBe('admin');
    
    await user.remove();
  });

  it('should delete user', async () => {
    const user = new User({ name: 'Test User', email: 'test@example.com' });
    await user.save();

    const response = await request(app)
      .post('/api/users/delete')
      .send({ userId: user._id });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User deleted');
    
    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
