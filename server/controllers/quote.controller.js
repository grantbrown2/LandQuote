const Quote = require('../models/quote.model');


module.exports.createQuote = (req, res) => {
    const {address, name, email, number, notes} = req.body;
    Quote.create(req.body)
        .then(quote => {
            const newQuote = {
                address,
                name,
                email,
                number,
                notes
            };
            quote.quotes.push(newQuote);
            return quote.save();
        })
        .catch(err => res.json(err));
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