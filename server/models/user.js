const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: String,
    isActive: Boolean
});

module.exports = mongoose.model("User", userSchema);