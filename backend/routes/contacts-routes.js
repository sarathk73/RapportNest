const express = require('express');

const router = express.Router();

const DUMMY_CONTACTS = [
    {
      id: 'p1',
      title: 'Sarath K',
      description: 'Upcoming Associate Engineer !',
      imageUrl: 'https://i.ibb.co/3yK7hXt/Whats-App-Image-2024-03-28-at-12-08-34-PM.jpg',
      phone: '7306162306',
      creator: 'u1'
    }
];

router.get('/:pid', (req, res, next) => {
    const contactId = req.params.pid; // { pid: 'p1' }
    const contact = DUMMY_CONTACTS.find(p => {
      return p.id === contactId;
    });

    if (!contact) {
    const error = new Error('Could not find a contact for the provided id.');
    error.code = 404;
    throw error;
  }

  res.json({contact}); // => { contact } => { contact: contact }
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const contact = DUMMY_CONTACTS.find(p => {
    return p.creator === userId;
  });

  if (!contact) {
    const error = new Error('Could not find a contact for the provided user id.');
    error.code = 404;
    return next(error);
  }

  res.json({ contact });
});

module.exports = router;