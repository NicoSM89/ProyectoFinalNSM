const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

connectDB();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Rutas para las vistas
app.get('/', (req, res) => {
  res.render('home', { title: 'Inicio' });
});

app.get('/admin', (req, res) => {
  res.render('admin', { title: 'Admin' });
});

app.get('/admin/users', async (req, res) => {
  const userService = require('./services/userService');
  const users = await userService.getAllUsers();
  res.render('userList', { title: 'Lista de Usuarios', users });
});

app.get('/admin/edit-user/:id', async (req, res) => {
  const userService = require('./services/userService');
  const user = await userService.getUserById(req.params.id);
  res.render('editUser', { title: 'Editar Usuario', user });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
