const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageUserSchema = new Schema({
    userId: String,
    messageUserId: String,
    profileId: String
});

module.exports = mongoose.model("MessageUser", messageUserSchema);