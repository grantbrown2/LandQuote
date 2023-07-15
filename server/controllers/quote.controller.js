const Quote = require('../models/quote.model');


module.exports.submit = async (req, res) => { 
try {
    const currentDate = new Date();
    const currentDateTimeString = currentDate.toLocaleString();

    // Retrieve form data
    const address = req.body.address;
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.phonenumber;
    const notes = req.body.notes;

    // Retrieve uploaded pictures
    const pictures = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    console.log("TEST " + pictures)

    // Create a new quote object
    const Quote = new quoteSchema({
      currentDateTimeString,
      address,
      name,
      email,
      number,
      notes,
      pictures,
    });

    // Save the quote to the database
    await Quote.save();
    //do something on client side - todo:tyrone 

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while submitting the quote.');
  }
}




// MY WAY 




const Quote = require('../models/quote.model');


module.exports.createQuote = (req, res) => {
    const {datetime, address, name, email, number, notes} = req.body;
    Quote.create(req.body)
        .then(quote => {
            const newQuote = {
                datetime,
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