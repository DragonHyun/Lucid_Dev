const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    married: Boolean,
    comment: String,
    age: Number,
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;