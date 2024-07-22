const express = require('express');
const { check } = require('express-validator');

const contactsControllers = require('../controllers/contacts-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
const parsePhoneNumber = require('../middleware/parse-phone-number');

const router = express.Router();

router.get('/search', contactsControllers.searchContacts);

router.get('/:pid', contactsControllers.getContactById);

router.get('/user/:uid', contactsControllers.getContactsByUserId);

router.get('/user/:uid/paginated', contactsControllers.getContactsByUserIdPaginated);



router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  parsePhoneNumber,
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('phone').not().isEmpty()
  ],
  contactsControllers.createContact
);

router.patch(
  '/:pid',
  parsePhoneNumber,
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('phone').not().isEmpty()
  ],
  contactsControllers.updateContact
);

router.delete('/:pid', contactsControllers.deleteContact);

module.exports = router;
