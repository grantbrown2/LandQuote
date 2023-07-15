const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    address: String,
    name: String,
    email: String,
    number: String,
    notes: String,
    pictures: [{ filename: String, path: String }],
}, {timestamps: true});
module.exports = mongoose.model('Quote', quoteSchema);