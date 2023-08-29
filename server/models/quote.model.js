const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    address: {
        type:String,
        required: [true, "Address required!"]
    },
    name: {
        type:String,
        required: [true, "Name is required!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    number: {
        type:String, 
        required: [true, "Phone number is required!"]
    },
    notes: {
        type: String,
        default: ""
    },
    markedRead: {
        type : Boolean ,
        default : false
    },
    quoteImages: {
        type: [String], // This will hold the paths of all uploaded files
        required: [true, "You must choose at least 1 image!"]
    },
}, {timestamps: true});
module.exports = mongoose.model('Quote', quoteSchema);