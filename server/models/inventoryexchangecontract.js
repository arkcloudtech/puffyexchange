const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryExchangeContractSchema = new Schema({
    valid: Boolean,
    inventoryExchangeTaskId: String,
    senderId: String,
    recipientId: String,
    signatureA: String,
    signatureB: String
});

module.exports = mongoose.model("InventoryExchangeContract", inventoryExchangeContractSchema);