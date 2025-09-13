const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/order');
const bookRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payment');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/order', orderRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vodafone', paymentRoutes);

app.get('/', (req, res) => res.send('Flower Shop API is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));