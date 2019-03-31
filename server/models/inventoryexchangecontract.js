const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryExchangeContractSchema = new Schema({
    valid: Boolean,
    inventoryExchangeId: String,
    senderId: String,
    recipientId: String
});

module.exports = mongoose.model("InventoryExchangeContract", inventoryExchangeContractSchema);