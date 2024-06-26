const { v4: uuidv4 } = require('uuid');

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Contact = require('../models/contact');

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


const getContactById = async (req, res, next) => {
  const contactId = req.params.pid; 

  let contact;
  try {
    contact = await Contact.findById(contactId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a contact.',
      500
    );
    return next(error);
  }

  if (!contact) {
    const error = new HttpError(
      'Could not find a contact for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ contact: contact.toObject({ getters: true }) }); 
};


const getContactsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let contacts;
  let userWithContacts;
  try {
    userWithContacts = await User.findById(userId).populate('contacts');
  } catch (err) {
    const error = new HttpError(
      'Fetching Contacts failed, please try again later',
      500
    );
    return next(error);
  }

  if (!userWithContacts || userWithContacts.contacts.length === 0) {
    return next(
      new HttpError('Could not find contacts for the provided user id.', 404)
    );
  }

  res.json({ contacts: userWithContacts.contacts.map(contact => contact.toObject({ getters: true })) });
};

  const createContact = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { title, description, phone, creator } = req.body;
  
    const createdContact = new Contact({
      title,
      description,
      phone,
      image: 'https://i.ibb.co/3yK7hXt/Whats-App-Image-2024-03-28-at-12-08-34-PM.jpg',
      creator
    });
  
    try {
      await createdContact.save();
    } catch (err) {
      const error = new HttpError(
        'Creating contact failed, please try again.',
        500
      );
      return next(error);
    }
    
    res.status(201).json({ contact: createdContact });
  };

  const updateContact = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { title, description,phone} = req.body;
    const contactId = req.params.pid;
  
    let contact;
    try {
      contact = await Contact.findById(contactId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update contact.',
        500
      );
      return next(error);
    }
  
    contact.title = title;
    contact.description = description;
    contact.phone = phone;
  
    try {
      await contact.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update contact.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ contact: contact.toObject({ getters: true }) });
  };
  

  const deleteContact = async (req, res, next) => {
    const contactId = req.params.pid;
  
    let contact;
    try {
      contact = await Contact.findById(contactId).populate('creator');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete contact.',
        500
      );
      return next(error);
    }
  
    if (!contact) {
      const error = new HttpError('Could not find contact for this id.', 404);
      return next(error);
    }
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await contact.remove({ session: sess });
      contact.creator.contacts.pull(contact);
      await contact.creator.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete contact.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted contact.' });
  };
exports.getContactById = getContactById;
exports.getContactsByUserId = getContactsByUserId; 
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;