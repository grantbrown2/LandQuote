const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    address: {
        type:String,
        required: [true, "addy is required."]
    },
    name: {
        type:String,
        required: [true, "name is required."]
    },
    email: {
        type:String,
        required: [true, "email is required."]
    },
    number: {
        type:String, 
        required: [true, "numba is required."]

    },
    notes: {
        type: String,
        default: ""
    },
    quoteImages: [String], // This will hold the paths of all uploaded files
}, {timestamps: true});
module.exports = mongoose.model('Quote', quoteSchema);