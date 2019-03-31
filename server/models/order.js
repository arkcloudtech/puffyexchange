const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId: String,
    location: String
});

module.exports = mongoose.model("Order", OrderSchema);