const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
    name: String,
    mobileNumber: Number,
    product: {},
});


module.exports = mongoose.model('MobileModal', MobileSchema);