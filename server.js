require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const productsRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, sameSite: 'strict' }
}));

app.use('/products', productsRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
