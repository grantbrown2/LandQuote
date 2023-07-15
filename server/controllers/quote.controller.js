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