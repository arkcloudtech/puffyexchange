const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryExchangeContractSchema = new Schema({
    name: String,
    location: String,
    deliveryId: String,
    profioleId: String
});

module.exports = mongoose.model("InventoryExchangeContract", inventoryExchangeContractSchema);