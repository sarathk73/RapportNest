const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    phoneNumbers: [{ type: String, required: true }],
    address: { type: String, required: true },
    image: { type: String, required: true },
    contacts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Contact'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);