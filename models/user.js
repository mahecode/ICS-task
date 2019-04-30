const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {
        type: Date,
        default: Date.now
    },
    professionalInfo: {
        NumberOfBooks: {type: Number, required: true},
        language: { type: String, required: true},
        bookSample: String,
        categories: String,
    }
})

module.exports = User = mongoose.model("users", UserSchema);
