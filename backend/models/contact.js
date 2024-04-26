const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const contactSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    creator: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);