const express = require('express');
const bodyParser = require('body-parser');

const contactsRoutes = require('./routes/contacts-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/contacts', contactsRoutes); // => /api/contacts..

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);