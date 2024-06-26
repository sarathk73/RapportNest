const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactsRoutes = require('./routes/contacts-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/contacts', contactsRoutes); // => /api/contacts..
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});
mongoose
  .connect('mongodb+srv://sarath:9142Sarath@cluster0.gxgwut1.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
});
