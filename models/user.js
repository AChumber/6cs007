const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    DOB: { type: Date, required: false },
    registered: { type: Date, default: Date.now }
});

//Create a model based of the schema to create documents to store
const User = mongoose.model('User', userSchema);

module.exports = User;