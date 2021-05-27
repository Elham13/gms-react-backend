const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});


module.exports = mongoose.model('User', UserSchema);