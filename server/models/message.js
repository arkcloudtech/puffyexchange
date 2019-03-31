const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    imageUrl: String,
    time: String,
    isRead: Boolean,
    messageOwnerId: String
});

module.exports = mongoose.model("Message", messageSchema);