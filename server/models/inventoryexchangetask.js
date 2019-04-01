const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryExchangeTaskSchema = new Schema({
    driverTaskId: String,
    otherDriverId: String
});

module.exports = mongoose.model("InventoryExchangeTask", inventoryExchangeTaskSchema);