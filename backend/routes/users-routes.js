const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');
const parsePhoneNumbers = require('../middleware/parse-phone-numbers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  parsePhoneNumbers,  
  [
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('dateOfBirth').not().isEmpty(),
    check('gender').not().isEmpty(),
    check('phoneNumbers').isArray({ min: 1 }).custom((value) => {
      if (value.some(phoneNumber => !/^\d{10}$/.test(phoneNumber))) {
        throw new Error('Invalid phone number(s). Each phone number must be a 10-digit number.');
      }
      return true;
    }),
    check('address').not().isEmpty(),
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
