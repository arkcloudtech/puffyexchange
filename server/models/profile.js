const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    imageUrl: String,
    userId: String,
    description: String,
});

module.exports = mongoose.model("Profile", profileSchema);