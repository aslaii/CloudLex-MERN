const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());

// Routes
const testRoutes = require('./routes/test');
app.use('/', testRoutes);
app.get('/', (req, res) => {
    res.send('Server is up and running');
  });
  

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB Connected');
}).catch((err) => {
  console.log('DB Connection Error:', err);
});

// Port
const port = process.env.PORT || 4000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
