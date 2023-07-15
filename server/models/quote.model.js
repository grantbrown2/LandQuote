const quoteSchema = new mongoose.Schema({
    datetime: String,
    address: String,
    name: String,
    email: String,
    number: String,
    notes: String,
    pictures: [{ filename: String, path: String }],
});
    
module.exports = mongoose.model('Quote', quoteSchema);