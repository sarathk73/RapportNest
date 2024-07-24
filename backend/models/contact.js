const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const contactSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    tags: [{ type: String }] 
});

module.exports = mongoose.model('Contact', contactSchema);