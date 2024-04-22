const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

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


const getContactById = (req, res, next) => {
    const contactId = req.params.pid; // { pid: 'p1' }
    const contact = DUMMY_CONTACTS.find(p => {
      return p.id === contactId;
    });

    if (!contact) {
    throw new HttpError('Could not find a contact for the provided id.', 404);
    }

    res.json({contact}); // => { contact } => { contact: contact }
}

const getContactByUserId = (req, res, next) => {
    const userId = req.params.uid;
  
    const contact = DUMMY_CONTACTS.find(p => {
      return p.creator === userId;
    });
  
    if (!contact) {
      return next(
        new HttpError('Could not find a contact for the provided user id.', 404)
      );
    }
  
    res.json({ contact });
  }

  const createContact = (req, res, next) => {
    const { title, description, phone, creator } = req.body;
    const createdContact = {
      id: uuidv4(),
      title,
      description,
      phone,
      creator
    };
  
    DUMMY_CONTACTS.push(createdContact); 
  
    res.status(201).json({contact: createdContact});
  };

exports.getContactById = getContactById;
exports.getContactByUserId = getContactByUserId; 
exports.createContact = createContact;