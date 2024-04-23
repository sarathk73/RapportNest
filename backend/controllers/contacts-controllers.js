const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_CONTACTS = [
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

const getContactsByUserId = (req, res, next) => {
    const userId = req.params.uid;
  
    const contacts = DUMMY_CONTACTS.filter(p => {
      return p.creator === userId;
    });
  
    if (!contacts || contacts.length === 0) {
      return next(
        new HttpError('Could not find a contacts for the provided user id.', 404)
      );
    }
  
    res.json({ contacts });
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

  const updateContact = (req, res, next) => {
    const { title, description, phone} = req.body;
    const contactId = req.params.pid;
  
    const updatedContact = { ...DUMMY_CONTACTS.find(p => p.id === contactId) };
    const contactIndex = DUMMY_CONTACTS.findIndex(p => p.id === contactId);
    updatedContact.title = title;
    updatedContact.description = description;
    updatedContact.phone = phone;
  
    DUMMY_CONTACTS[contactIndex] = updatedContact;
  
    res.status(200).json({contact: updatedContact});
  };

  const deleteContact = (req, res, next) => {
    const contactId = req.params.pid;
    DUMMY_CONTACTS = DUMMY_CONTACTS.filter(p => p.id !== contactId);
    res.status(200).json({ message: 'Deleted contact.' });
  };

exports.getContactById = getContactById;
exports.getContactsByUserId = getContactsByUserId; 
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;