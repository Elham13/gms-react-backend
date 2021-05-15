const mongoose = require('mongoose');

const ContactScema = new mongoose.Schema({
    Name: String,
    MobileNumber: Number,
    Email: String,
    Message: String,
});


module.exports = mongoose.model('ContactModal', ContactScema);