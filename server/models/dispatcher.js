const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispatcherSchema = new Schema({
    userId: String
});

module.exports = mongoose.model("Dispatcher", dispatcherSchema);