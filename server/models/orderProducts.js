const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderProductSchema = new Schema({
    orderId: String,
    productId: String
});

module.exports = mongoose.model("OrderProduct", OrderProductSchema);