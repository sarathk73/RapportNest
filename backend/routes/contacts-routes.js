const express = require('express');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/:pid', contactsControllers.getContactById );

router.get('/user/:uid', contactsControllers.getContactByUserId);

router.post('/', contactsControllers.createContact);

router.patch('/:pid', contactsControllers.updateContact);

router.delete('/:pid', contactsControllers.deleteContact);

module.exports = router;