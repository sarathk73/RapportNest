const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Contact = require('../models/contact');
const User = require('../models/user');

const DEFAULT_IMAGE_URL = 'uploads/images/no-user.jpg';

const getContactById = async (req, res, next) => {
  const contactId = req.params.pid;

  let contact;
  try {
    contact = await Contact.findById(contactId);
  } catch (err) {
    return next(new HttpError('Something went wrong, could not find a contact.', 500));
  }

  if (!contact) {
    return next(new HttpError('Could not find a contact for the provided id.', 404));
  }

  res.json({ contact: contact.toObject({ getters: true }) });
};

const getContactsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithContacts;
  try {
    userWithContacts = await User.findById(userId).populate('contacts');
  } catch (err) {
    console.error(`Error fetching contacts for user ${userId}: `, err);
    return next(new HttpError('Fetching Contacts failed, please try again later', 500));
  }

  if (!userWithContacts || userWithContacts.contacts.length === 0) {
    return next(new HttpError('Could not find contacts for the provided user id.', 404));
  }

  res.json({ contacts: userWithContacts.contacts.map(contact => contact.toObject({ getters: true })) });
};

const createContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description, phone, tags } = req.body;
  const imagePath = req.file ? req.file.path : DEFAULT_IMAGE_URL;

  console.log('Received Tags:', tags);
  const parsedTags = JSON.parse(tags);

  const createdContact = new Contact({
    title,
    description,
    image: imagePath,
    phone,
    creator: req.userData.userId,
    tags: parsedTags
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(new HttpError('Creating contact failed, please try again.', 500));
  }

  if (!user) {
    return next(new HttpError('Could not find user for provided id.', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdContact.save({ session: sess });
    user.contacts.push(createdContact);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Creating contact failed, please try again.', 500));
  }

  res.status(201).json({ contact: createdContact });
};

const updateContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description, phone, tags } = req.body;
  const contactId = req.params.pid;

  let contact;
  try {
    contact = await Contact.findById(contactId);
  } catch (err) {
    return next(new HttpError('Something went wrong, could not update contact.', 500));
  }

  if (contact.creator.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to edit this contact.', 401));
  }

  contact.title = title;
  contact.description = description;
  contact.phone = phone;
  contact.tags = JSON.parse(tags);

  try {
    await contact.save();
  } catch (err) {
    return next(new HttpError('Something went wrong, could not update contact.', 500));
  }

  res.status(200).json({ contact: contact.toObject({ getters: true }) });
};

const deleteContact = async (req, res, next) => {
  const contactId = req.params.pid;

  let contact;
  try {
    contact = await Contact.findById(contactId).populate('creator');
    if (!contact) {
      return next(new HttpError('Could not find contact for this id.', 404));
    }
  } catch (err) {
    console.error(`Error fetching contact with ID ${contactId}: `, err);
    return next(new HttpError('Something went wrong, could not delete contact.', 500));
  }

  if (contact.creator.id !== req.userData.userId) {
    return next(new HttpError('You are not allowed to delete this contact.', 401));
  }

  const imagePath = contact.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await contact.deleteOne({ session: sess });
    contact.creator.contacts.pull(contact);
    await contact.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.error(`Error deleting contact with ID ${contactId}: `, err);
    return next(new HttpError('Something went wrong, could not delete contact.', 500));
  }

  if (imagePath !== DEFAULT_IMAGE_URL) {
    fs.unlink(imagePath, err => {
      if (err) {
        console.error(`Error deleting image file at path ${imagePath}: `, err);
      } else {
        console.log(`Successfully deleted image file at path ${imagePath}`);
      }
    });
  }

  res.status(200).json({ message: 'Deleted contact.' });
};

const getContactsByUserIdPaginated = async (req, res, next) => {
  const userId = req.params.uid;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  let contacts;
  try {
    contacts = await Contact.find({ creator: userId })
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (err) {
    return next(new HttpError('Fetching contacts failed, please try again later.', 500));
  }

  const totalContacts = await Contact.countDocuments({ creator: userId });

  res.json({
    contacts: contacts.map(contact => contact.toObject({ getters: true })),
    currentPage: page,
    totalPages: Math.ceil(totalContacts / limit)
  });
};

const searchContacts = async (req, res, next) => {
  const { name } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  let contacts;
  try {
    contacts = await Contact.find({
      title: new RegExp(name, 'i')
    })
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (err) {
    return next(new HttpError('Fetching contacts failed, please try again later.', 500));
  }

  const totalContacts = await Contact.countDocuments({
    title: new RegExp(name, 'i')
  });

  res.json({
    contacts: contacts.map(contact => contact.toObject({ getters: true })),
    currentPage: page,
    totalPages: Math.ceil(totalContacts / limit)
  });
};

const getAllTags = async (req, res, next) => {
  try {
    const tags = await Contact.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", count: 1 } }
    ]);
    res.json({ tags });
  } catch (err) {
    return next(new HttpError('Fetching tags failed, please try again later.', 500));
  }
};

const getContactsByTag = async (req, res, next) => {
  const tag = req.params.tag;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  let contacts;
  try {
    contacts = await Contact.find({ tags: tag })
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (err) {
    return next(new HttpError('Fetching contacts failed, please try again later.', 500));
  }

  const totalContacts = await Contact.countDocuments({ tags: tag });

  res.json({
    contacts: contacts.map(contact => contact.toObject({ getters: true })),
    currentPage: page,
    totalPages: Math.ceil(totalContacts / limit)
  });
};

exports.getContactById = getContactById;
exports.getContactsByUserId = getContactsByUserId;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
exports.getContactsByUserIdPaginated = getContactsByUserIdPaginated;
exports.searchContacts = searchContacts;
exports.getAllTags = getAllTags;
exports.getContactsByTag = getContactsByTag;
