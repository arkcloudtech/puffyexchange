const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: String,
    location: String,
    deliveryId: String,
    profioleId: String
});

module.exports = mongoose.model("Order", OrderSchema);