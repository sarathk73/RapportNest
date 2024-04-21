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
    res.json({contact}); // => { contact } => { contact: contact }
  });

module.exports = router;