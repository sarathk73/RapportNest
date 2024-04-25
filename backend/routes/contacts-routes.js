const express = require('express');

const { check } = require('express-validator');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/:pid', contactsControllers.getContactById );

router.get('/user/:uid', contactsControllers.getContactsByUserId);

router.post('/',
    [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('phone')
      .not()
      .isEmpty()
    ],
    contactsControllers.createContact
);

router.patch('/:pid',
    [
      check('title')
        .not()
        .isEmpty(),
      check('description').isLength({ min: 5 }),
      check('phone')
      .not()
      .isEmpty()
    ],
    contactsControllers.updateContact
);

router.delete('/:pid', contactsControllers.deleteContact);

module.exports = router;