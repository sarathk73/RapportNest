const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authLimiter = require('./middleware/rateLimit');
const contactsRoutes = require('./routes/contacts-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/users/login', authLimiter);

app.use('/api/contacts', contactsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (error.message && (error.message.includes('Invalid file type') || error.message.includes('File too large'))) {
    return res.status(400).json({ message: error.message });
  }

  console.error(error); 

  if (req.file) {
    fs.unlink(req.file.path, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gxgwut1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
