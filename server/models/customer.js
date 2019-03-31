const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String,
    phone: String,
    idUrl: String,
    userId: String
});

module.exports = mongoose.model("Customer", customerSchema);