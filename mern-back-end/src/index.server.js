const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialdata');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');
const adminOrderRoutes = require('./routes/admin/order.admin');

// environment variable or you can say constants
env.config();

// mongodb connection

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  });

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/initialdata', initialDataRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/user/address', addressRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin/order', adminOrderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
