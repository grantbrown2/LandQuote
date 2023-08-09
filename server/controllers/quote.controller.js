const fs = require('fs').promises;

const path = require('path');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

const Quote = require('../models/quote.model');
const User = require('../models/user.model');


async function renameFilesWithExtension(filePaths, newExtension) {
    const renamedFilePaths = [];
  
    for (const filePath of filePaths) {
      const fileDir = path.dirname(filePath);
      const oldFileName = path.basename(filePath);
      const newFileName = `${path.parse(oldFileName).name}${newExtension}`;
      const newPath = path.join(fileDir, newFileName);
      
      try {
        await fs.rename(filePath, newPath);
        renamedFilePaths.push(newPath);
      } catch (err) {
        console.error(`Error renaming file: ${filePath}`, err);
      }
    }
  
    return renamedFilePaths;
  }

  module.exports.createQuote = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { address, name, number, notes } = req.body;
    const quoteImages = req.files ? req.files.map(file => file.path) : [];

    // Extract user ID from the token
    const token = req.cookies.usertoken;
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.id;

    // Fetch user's email from the database
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const email = user.email;

    // Rename the uploaded files with the detected file type as extension
    const renamedQuoteImages = await renameFilesWithExtension(quoteImages, '.jpg');

    Quote.create({
        address,
        name,
        user: userId,
        number,
        notes,
        quoteImages: renamedQuoteImages, // Use the renamed image paths with '.jpg' extension
    })
    .then(quote => {
        console.log("Created quote:", quote);
        res.json(quote);
    })
    .catch(err => {
        console.log("Error while creating quote:", err);
        res.status(400).json(err);
    });
};



module.exports.getAllQuotes = (req, res) => {
    Quote.find({})
      .populate('user', 'email')
      .then((quotes) => res.json(quotes))
      .catch((err) => res.json(err));
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
