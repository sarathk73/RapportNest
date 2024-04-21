const express = require('express');
const bodyParser = require('body-parser');

const contactsRoutes = require('./routes/contacts-routes');

const app = express();

app.use(contactsRoutes);

app.listen(5000);