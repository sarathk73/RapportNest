const express = require('express');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/:pid', contactsControllers.getContactById );

router.get('/user/:uid', contactsControllers.getContactByUserId);

module.exports = router;