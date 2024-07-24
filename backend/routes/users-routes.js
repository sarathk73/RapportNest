const express = require('express');
const { check } = require('express-validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
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
      if (value.some(phoneNumber => {
        const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'IN'); 
        return !phoneNumberObj || !phoneNumberObj.isValid();
      })) {
        throw new Error('Invalid phone number(s).');
      }
      return true;
    }),
    check('address').not().isEmpty(),
  ],
  usersController.signup
);

router.post('/login', usersController.login);
router.post('/email-verify-login', usersController.emailVerifyLogin);


module.exports = router;
