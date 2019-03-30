const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    summary: String,
    orderId: String,
    deliveryLocation: String,
    dispatcherId: String,
    driverId: String
});

module.exports = mongoose.model("Delivery", deliverySchema);