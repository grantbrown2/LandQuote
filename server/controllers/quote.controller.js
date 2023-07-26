const Quote = require('../models/quote.model');

module.exports.createQuote = (req, res) => {
    console.log("Request body:", req.body); // Debug line
    console.log("Request files:", req.files); // Debug line

    const {address, name, email, number, notes} = req.body;
    const quoteImages = req.files ? req.files.map(file => file.path) : []; // array of paths of the uploaded files

    Quote.create({
        address,
        name,
        email,
        number,
        notes,
        quoteImages // adding the image paths to your document
    })
        .then(quote => {
            console.log("Created quote:", quote); // Debug line
            res.json(quote)
        })
        .catch(err => {
            console.log("Error while creating quote:", err); // Debug line
            res.status(400).json(err);
        });
};

module.exports.getAllQuotes = (req, res) => {
    Quote.find({})
        .then(quotes => res.json(quotes))
        .catch(err => res.json(err));
};

module.exports.deleteQuoteById = (req, res) => {
    const id = req.params.id;

    Quote.findByIdAndRemove(id)
        .then(quote => {
            if (!quote) {
                return res.status(404).json({message: "Quote not found"});
            }
            return res.status(200).json({message: "Quote successfully deleted"});
        })
        .catch(err => res.status(500).json(err));
};