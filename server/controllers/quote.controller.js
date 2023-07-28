const fs = require('fs').promises;

const path = require('path');
const fileType = require('file-type-ext'); // Use file-type-ext instead of file-type

const Quote = require('../models/quote.model');


async function renameFilesWithExtension(filePaths, newExtension) {
    const renamedFilePaths = [];
  
    for (const filePath of filePaths) {
      const fileDir = path.dirname(filePath);
      const oldFileName = path.basename(filePath);
      const newFileName = path.join(fileDir, `${path.parse(oldFileName).name}${newExtension}`);
      
      try {
        await fs.rename(filePath, newFileName);
        renamedFilePaths.push(newFileName);
      } catch (err) {
        console.error(`Error renaming file: ${filePath}`, err);
      }
    }
  
    return renamedFilePaths;
  }

  module.exports.createQuote = async (req, res) => {
    console.log("Request body:", req.body); // Debug line
    console.log("Request files:", req.files); // Debug line

    const { address, name, email, number, notes } = req.body;
    const quoteImages = req.files ? req.files.map(file => file.path) : []; // array of paths of the uploaded files

    // Rename the uploaded files with the detected file type as extension
    const renamedQuoteImages = await renameFilesWithExtension(quoteImages, '.jpg');

    // Extract the file extension from the renamed paths and add them to the quoteImages array
    const quoteImageExtensions = renamedQuoteImages.map(filePath => path.extname(filePath));
    const quoteImagesWithExtensions = renamedQuoteImages.map((filePath, index) => filePath + quoteImageExtensions[index]);

    Quote.create({
        address,
        name,
        email,
        number,
        notes,
        quoteImages: quoteImagesWithExtensions, // using the renamed image paths with '.jpg' extension
    })
    .then(quote => {
        console.log("Created quote:", quote); // Debug line
        res.json(quote);
    })
    .catch(err => {
        console.log("Error while creating quote:", err); // Debug line
        res.status(400).json(err);
    });
};
module.exports.getAllQuotes = (req, res) => {
    Quote.find({})
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
